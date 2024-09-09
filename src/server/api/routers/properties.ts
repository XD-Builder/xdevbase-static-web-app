import { z } from "zod";

import { addressValidationSchema } from "@/pageComponents/Properties/molecules/AddressForm.schema";
import { propertyValidationSchema } from "@/pageComponents/Properties/molecules/PropertyForm.schema";
import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";

export const propertiesRouter = createTRPCRouter({
  getAllProperties: privateProcedure.query(({ ctx }) => {
    return ctx.db.properties.findMany({
      where: { ownerId: ctx.user.id },
    });
  }),
  createProperty: privateProcedure
    .input(
      z.object({
        propertyFormValues: propertyValidationSchema(),
        addressFormValues: addressValidationSchema(),
      })
    )
    .mutation(({ ctx, input }) => {
      // input.addressFormValues
      const { propertyName: name, propertyDescription: description } =
        input.propertyFormValues;
      const {
        fullAddress,
        addressLine1,
        addressLine2,
        city,
        state,
        zip,
        country,
        longitude,
        latitude,
      } = input.addressFormValues;
      const properties = ctx.db.properties.create({
        data: {
          name,
          description,
          fullAddress,
          addressLine1,
          addressLine2,
          city,
          state,
          zip,
          country,
          longitude,
          latitude,
          ownerId: ctx.user.id,
        },
      });
      return properties;
    }),
  updateSignedImageURLs: privateProcedure
    .input(
      z.object({
        signedImageUrls: z.array(z.string()),
        propertyId: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      const properties = ctx.db.properties.update({
        where: { id: input.propertyId },
        data: { imageUrls: input.signedImageUrls },
      });

      return properties;
    }),
});
