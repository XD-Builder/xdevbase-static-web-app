import { ZodReturnType } from "@/utils/types";
import { type TFunction } from "i18next";
import { z } from "zod";

/**
 * Address form validation schema
 */
export const propertyValidationSchema = (translate?: TFunction) =>
  z.object({
    propertyName: z.string().max(100),
    propertyDescription: z.string().min(10).max(40000, translate ? translate("propertiesPage.propertyDescriptionLengthExceeded") : "Property description length exceeded 40,000 bytes"),
  });

export type PropertyFormValues = ZodReturnType<typeof propertyValidationSchema>;
