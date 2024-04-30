"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { loggerLink, unstable_httpBatchStreamLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import { useState } from "react";

import { type AppRouter } from "@/server/api/root";
import { getUrl, transformer } from "./shared";
import { supabase } from "@/server/supabase/supabaseClient";

/**
 * Create a new TRPC React API used to create clients and provider for
 * trpc client and query client.
 */
export const api = createTRPCReact<AppRouter>({
  overrides: {
    useMutation: {
      /**
       * This function is called whenever a `.useMutation` succeeds
       **/
      async onSuccess(opts) {
        /**
         * @note that order here matters:
         * The order here allows route changes in `onSuccess` without
         * having a flash of content change whilst redirecting.
         **/
        // Calls the `onSuccess` defined in the `useQuery()`-options:
        await opts.originalFn();
        // Invalidate all queries in the react-query cache:
        await opts.queryClient.invalidateQueries();
      },
    },
  },
});

/**
 * Provides query client and trpc client. The wrapped children 
 * will have access to both clients with correct authorization on trpc.
 */
export function TRPCReactProvider(props: {
  children: React.ReactNode;
  headers: Headers;
}) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        /* 24 hours */
        staleTime: 1000 * 60 * 60 * 24,
      },
    },
  }));
  const [trpcClient] = useState(() =>
    api.createClient({
      transformer,
      links: [
        loggerLink({
          enabled: (op) =>
            process.env.NODE_ENV === "development" ||
            (op.direction === "down" && op.result instanceof Error),
        }),
        unstable_httpBatchStreamLink({
          url: getUrl(),
          // set authorization for the trpc request in the headers.
          async headers() {
            const heads = new Map(props.headers);
            const { data } = await supabase().auth.getSession();
            if (data.session) {
              heads.set("authorization", data.session.access_token);
            }
            heads.set("x-trpc-source", "react");
            return Object.fromEntries(heads);
          },
        }),
      ],
    }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        {props.children}
      </api.Provider>
    </QueryClientProvider>
  );
}