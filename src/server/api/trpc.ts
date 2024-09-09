import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

import { db } from "@/server/db";
import { getUserAsAdmin } from "@/server/supabase/supabaseClient";
import { mapRatelimiter } from "@/utils/rateLimiter";

/**
 * 1. DEFINITION
 *
 * This is the actual context you will use in your router. It will be used to process every request
 * that goes through your tRPC endpoint.
 *
 * @see https://trpc.io/docs/context
 */
export const createTRPCContext = async (opts: { headers: Headers }) => {
  const headers = opts.headers;
  const authToken = headers.get("authorization");

  const { user } = authToken ? await getUserAsAdmin(authToken) : { user: null };

  return {
    ...opts,
    db,
    user,
  };
};

/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer. We also parse
 * ZodErrors so that you get typesafety on the frontend if your procedure fails due to validation
 * errors on the backend.
 */
const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these a lot in the
 * "/src/server/api/routers" directory.
 */

/**
 * This is how you create new routers and sub-routers in your tRPC API.
 *
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It does not
 * guarantee that a user querying is authorized, but you can still access user session data if they
 * are logged in.
 */
export const publicProcedure = t.procedure;

const enforceUserIsAuthed = t.middleware(async ({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });
  }

  return next({
    ctx: {
      user: ctx.user,
    },
  });
});

/**
 * Private (authenticated) procedure
 */
export const privateProcedure = t.procedure.use(enforceUserIsAuthed);

export const enforceIsAuthedIsRateLimited = t.middleware(
  async ({ ctx, next }) => {
    if (!ctx.user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
      });
    }

    let key = `${ctx.user.id}-map-request`;
    const phoneOrEmail = ctx.user.phone || ctx.user.email;

    if (phoneOrEmail) {
      key = `${key}-${phoneOrEmail}`;
    }
    const { success } = await mapRatelimiter.limit(key);
    if (!success) {
      throw new TRPCError({
        code: "TOO_MANY_REQUESTS",
      });
    }

    return next({
      ctx: {
        user: ctx.user,
      },
    });
  }
);

export const privateRateLimitedMapProcedure = privateProcedure.use(
  enforceIsAuthedIsRateLimited
);
