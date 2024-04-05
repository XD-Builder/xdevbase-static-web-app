import { PrismaClient } from "@prisma/client";
import { env } from "@/env.mjs";

/**
 * Map global object to Prisma client.
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/**
 * If the globalForPrisma.prisma is set, use it. Otherwise, create a new Prisma client.
 * If the NODE_ENV is development, log the queries, errors and warnings.
 */
export const db = 
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

/**
 * If the NODE_ENV is not production, set the Prisma client to the global object.
 */
if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;