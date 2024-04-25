import { createTRPCRouter } from "@/server/api/trpc";
import { authRouter } from "./routers/auth";
import { exampleRouter } from "./routers/example";
import { paymentsRouter } from "./routers/payments";
import { mapRouter } from "./routers/map";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  example: exampleRouter,
  payments: paymentsRouter,
  map: mapRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
