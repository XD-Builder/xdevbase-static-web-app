"use client";

import { ThemeProvider } from "next-themes";
import {
  AnalyticsProvider,
  UmamiAnalyticsProvider,
} from "./AnalyticsProvider/AnalyticsProvider";
import React from "react";
import { type Language } from "@/i18n/settings";
import { I18NextProvider } from "./I18NextProvider/I18NextProvider";

type ProvidersProps = {
  children: React.ReactNode;
  initialLanguage: Language;
};

export function Providers({ children, initialLanguage }: ProvidersProps) {
  return (
    <I18NextProvider initialLanguage={initialLanguage}>
      <ThemeProvider attribute="class" forcedTheme="light">
        {children}
      </ThemeProvider>
      <AnalyticsProvider />
      <UmamiAnalyticsProvider />
    </I18NextProvider>
  );
}
