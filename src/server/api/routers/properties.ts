import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import { propertyValidationSchema } from "@/pageComponents/Properties/molecules/PropertyForm.schema";
import { addressValidationSchema } from "@/pageComponents/Properties/molecules/AddressForm.schema";

export const propertiesRouter = createTRPCRouter({
  getAllProperties: privateProcedure.query(({ ctx }) => {
    // return ctx.db.properties.findAll{
    //   greeting: `Hello ${input.text}`,
    // };
    return {
      greeting: `Hello`,
    };
  }),
  createProperty: privateProcedure
    .input(
      z.object({
        propertyFormValues: propertyValidationSchema(),
        addressFormValues: addressValidationSchema(),
      })
    )
    .mutation(({ ctx, input }) => {
      return {
        id: `123`
      };
    }),
  updateSignedImageURLs: privateProcedure
    .input(
      z.object({
        signedImageURLs: z.array(z.string()),
        propertyId: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return {
        propertyId: input.propertyId,
        signedURLs: input.signedImageURLs,
      };
    }),
});
