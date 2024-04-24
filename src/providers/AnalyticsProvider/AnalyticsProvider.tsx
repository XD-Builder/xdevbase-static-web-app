"use client";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import { env } from "@/env.mjs";

/**
 * Uses NEXT_PUBLIC_GOOGLE_ANALYTICS_ID to render the Google Analytics provider.
 * @returns Google Analytics provider
 */
export const GoogleAnalyticsProvider = () => {
  return env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ? (
    <GoogleAnalytics gaId={env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID} />
  ) : null;
};

/**
 * Uses NEXT_PUBLIC_UMAMI_WEBSITE_ID and NEXT_PUBLIC_UMAMI_URL
 * to render the Umami Analytics provider.
 * @returns Umami Analytics provider
 */
export const UmamiAnalyticsProvider = () => {
  return env.NEXT_PUBLIC_UMAMI_WEBSITE_ID ? (
    <Script
      src={env.NEXT_PUBLIC_UMAMI_URL}
      data-website-id={env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
      strategy="lazyOnload"
    />
  ) : null;
};

/**
 * Vercel Analytics
 */
export const VercelAnalyticsProvider = () => <Analytics />;
