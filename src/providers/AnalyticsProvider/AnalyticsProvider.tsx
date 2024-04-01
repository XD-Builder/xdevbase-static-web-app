"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import { env } from "@/env.mjs";

export const AnalyticsProvider = () => {
  return env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ? (
    <GoogleAnalytics gaId={env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID} />
  ) : null;
};

export const UmamiAnalyticsProvider = () => {
  return env.NEXT_PUBLIC_UMAMI_WEBSITE_ID ? (
    <Script
      src={env.NEXT_PUBLIC_UMAMI_URL}
      data-website-id={env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
      strategy="lazyOnload"
    />
  ) : null;
};
