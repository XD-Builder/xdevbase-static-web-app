import { createTRPCRouter } from "@/server/api/trpc";

import { authRouter } from "./routers/auth";
import { exampleRouter } from "./routers/example";
import { mapRouter } from "./routers/map";
import { paymentsRouter } from "./routers/payments";
import { propertiesRouter } from "./routers/properties";

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
  properties: propertiesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
