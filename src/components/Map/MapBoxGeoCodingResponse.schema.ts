import { z } from "zod";

import { ZodReturnType } from "@/utils/types";

// Define a Zod schema to represent the expected response shape
export const mapboxGeocodingResponseSchema = z.object({
  features: z.array(
    z.object({
      id: z.string(),
      properties: z.object({
        // Define the properties you need
        full_address: z.string(),
        context: z.object({
          address: z
            .object({
              name: z.string().optional(),
            })
            .optional(),
          // both can be the city
          neighborhood: z
            .object({
              name: z.string().optional(),
            })
            .optional(),
          place: z
            .object({
              name: z.string().optional(),
            })
            .optional(),
          // County
          district: z
            .object({
              name: z.string().optional(),
            })
            .optional(),
          // State
          region: z
            .object({
              region_code: z.string().optional(),
            })
            .optional(),
          postcode: z
            .object({
              name: z.string().optional(),
            })
            .optional(),
          country: z
            .object({
              name: z.string().optional(),
              country_code: z.string().optional(),
            })
            .optional(),
        }),
      }),
      geometry: z
        .object({
          coordinates: z.array(z.number()),
          type: z.string(),
        })
        .optional(),
    })
  ),
});

export type ForwardMapboxGeoCodingResponseValues = ZodReturnType<
  typeof mapboxGeocodingResponseSchema
>;
