import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

export const getServerQueryClient = cache(
  () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          /* 24 hours */
          staleTime: 1000 * 60 * 60 * 24,
        },
      },
    })
);
