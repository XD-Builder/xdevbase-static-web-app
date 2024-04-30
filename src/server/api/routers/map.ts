import { z } from "zod";

import { createTRPCRouter, privateRateLimitedMapProcedure } from "@/server/api/trpc";
import { mapboxGeocodingResponseSchema } from "@/components/Map/MapBoxGeoCodingResponse.schema";

export const mapRouter = createTRPCRouter({
  geoCode: privateRateLimitedMapProcedure
    .input(z.object({ query: z.string() }))
    .query(async ({ input }) => {
      const response = await fetch(
        `https://api.mapbox.com/search/geocode/v6/forward?q=${input.query}&proximity=ip&types=address&access_token=${process.env.MAPBOX_ACCESS_TOKEN}`,
        {
          next: { revalidate: 600 }, // Cache the response for 10 minutes
        }
      );

      const data = await response.json();
      let geocodingResponse;
      // Validate and parse the response data
      try {
        geocodingResponse = mapboxGeocodingResponseSchema.parse(data);
      } catch (error) {
        console.error("Invalid response from geocoding service", error);
      }

      return geocodingResponse;
    }),
});