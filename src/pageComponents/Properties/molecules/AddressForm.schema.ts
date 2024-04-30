import { ZodReturnType } from "@/utils/types";
import { type TFunction } from "i18next";
import { z } from "zod";

/**
 * Address form validation schema
 */
export const addressValidationSchema = (translate: TFunction) =>
  z.object({
    addressLine1: z.string(),
    addressLine2: z.string().optional(),
    city: z.string().min(3).max(50),
    state: z.string().min(2).max(2),
    zip: z
      .string()
      .regex(/^\d{5}(-\d{3})?$/, translate("common.zipCodeValidation")),
    country: z.string(),
  });

export type AddressFormValues = ZodReturnType<typeof addressValidationSchema>;
