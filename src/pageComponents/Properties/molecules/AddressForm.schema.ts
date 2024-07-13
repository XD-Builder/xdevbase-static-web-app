import { ZodReturnType } from "@/utils/types";
import { type TFunction } from "i18next";
import { z } from "zod";

/**
 * Address form validation schema
 */
export const addressValidationSchema = (translate?: TFunction) =>
  z.object({
    fullAddress: z.string(),
    addressLine1: z.string().min(3),
    addressLine2: z.string().optional(),
    city: z.string().min(3).max(50),
    state: z.string().min(2).max(2),
    zip: z
      .string()
      .regex(/^\d{5}(-\d{3})?$/, translate? translate("common.zipCodeValidation"): "Invalid zip code, Valid: 20171, 20171-333"),
    country: z.string(),
    longitude: z.number()
      .min(-180)
      .max(180).optional(),
    latitude: z.number()  
      .min(-90)
      .max(90).optional()
  });

export type AddressFormValues = ZodReturnType<typeof addressValidationSchema>;
