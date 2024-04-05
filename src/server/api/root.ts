import { createTRPCRouter } from "@/server/api/trpc";
import { authRouter } from "./router/auth";
import { exampleRouter } from "./router/example";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  example: exampleRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
