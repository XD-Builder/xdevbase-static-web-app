import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";

export const propertiesRouter = createTRPCRouter({
  getAllProperties: privateProcedure 
    .query(({ ctx }) => {
      // return ctx.db.properties.findAll{
      //   greeting: `Hello ${input.text}`,
      // };
      return {
        greeting: `Hello`,
      }
    }),
});