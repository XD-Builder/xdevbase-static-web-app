"use client";

import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import resourcesToBackend from "i18next-resources-to-backend";
import { useRef } from "react";
import { initReactI18next, useTranslation } from "react-i18next";
import { z } from "zod";
import { zodI18nMap } from "zod-i18n-map";

import messagesEn from "@/i18n/locales/en/common";
import zodMessagesEn from "@/i18n/locales/en/zod";
import messages from "@/i18n/locales/zh-CN/common";
import zodMessages from "@/i18n/locales/zh-CN/zod";
import { getOptions, type Language } from "@/i18n/settings";

export const languageCookieExpirationTimeMs = 1000 * 60 * 60 * 24 * 365;

/**
 * Initialize the i18next instance with the resources and the language detector.
 * The resources are loaded from the locales folder and the language detector
 * is set to cookie, querystring, htmlTag and navigator. The cookie is set to
 * expire in 1 year.
 */
void i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`@/i18n/locales/${language}/${namespace}.ts`)
    )
  )
  .init({
    ...getOptions(),
    resources: {
      "zh-CN": {
        zod: zodMessages,
        common: messages,
      },
      en: {
        zod: zodMessagesEn,
        common: messagesEn,
      },
    },
    detection: {
      order: ["cookie", "querystring", "htmlTag", "navigator"],
      caches: ["cookie"],
      cookieOptions: {
        expires: new Date(Date.now() + languageCookieExpirationTimeMs),
      },
    },
  });

z.setErrorMap(zodI18nMap);

/**
 * I18NextProvider is a provider that initializes the i18next instance with the
 * resources and the language detector.
 */
export const I18NextProvider = ({
  children,
  initialLanguage,
}: {
  children: React.ReactNode;
  initialLanguage: Language;
}) => {
  const languacheChangedRef = useRef(false);
  const [, i18Next] = useTranslation();

  if (i18Next.language !== initialLanguage && !languacheChangedRef.current) {
    void i18Next.changeLanguage(initialLanguage);
    languacheChangedRef.current = true;
    z.setErrorMap(zodI18nMap);
  }

  return <>{children}</>;
};
