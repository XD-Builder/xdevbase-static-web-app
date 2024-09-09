"use client";

import { ThemeProvider } from "next-themes";
import React from "react";

import { type Language } from "@/i18n/settings";

import {
  GoogleAnalyticsProvider,
  UmamiAnalyticsProvider,
  VercelAnalyticsProvider,
} from "./AnalyticsProvider/AnalyticsProvider";
import { I18NextProvider } from "./I18NextProvider/I18NextProvider";

type ProvidersProps = {
  children: React.ReactNode;
  initialLanguage: Language;
};

/**
 * Providers is a provider that wraps the application with the i18next provider,
 * the theme provider, the analytics provider and the umami analytics provider.
 * @param initialLanguage The initial language of the application.
 */
export function Providers({ children, initialLanguage }: ProvidersProps) {
  return (
    <I18NextProvider initialLanguage={initialLanguage}>
      <ThemeProvider attribute="class">{children}</ThemeProvider>
      <GoogleAnalyticsProvider />
      <VercelAnalyticsProvider />
      <UmamiAnalyticsProvider />
    </I18NextProvider>
  );
}
