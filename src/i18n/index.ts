import acceptLanguage from "accept-language";
import { createInstance, type Namespace } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { type RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { type ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies, headers } from "next/headers";
import { initReactI18next } from "react-i18next/initReactI18next";

import { fallbackLng, getOptions, type Language, languages } from "./settings";

/**
 * Initializes the i18next instance with the given language, namespace as well as user request
 * and session information to better detect the user's language.
 *
 * @param language default language
 * @param namespace default namespace
 * @returns
 */
const initI18next = async (language: Language, namespace?: Namespace) => {
  // On server side we create a new instance for each render, because during compilation everything seems to be executed in parallel
  const i18nInstance = createInstance();

  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (resourceLanguage: string, resourceNamespace: string) =>
          import(`./locales/${resourceLanguage}/${resourceNamespace}.ts`)
      )
    )
    .init(getOptions(language, namespace));

  return i18nInstance;
};

// A list of server-side accept-language headers.
acceptLanguage.languages(languages as unknown as string[]);
const cookieName = "i18next";

export function getLanguageFromCookie(
  requestCookies: RequestCookies | ReadonlyRequestCookies
) {
  return acceptLanguage.get(
    requestCookies.get(cookieName)?.value
  ) as Language | null;
}

export function getLanguageFromAcceptHeader(requestHeaders: Headers) {
  return acceptLanguage.get(
    requestHeaders.get("Accept-Language")
  ) as Language | null;
}

// Detect language from the cookies, headers or fallback language with
// priority in that order.
export function detectLanguage() {
  const ckies = cookies();
  const hders = headers();
  const languageFromCookie = getLanguageFromCookie(ckies);
  const languageFromAcceptHeader = getLanguageFromAcceptHeader(hders);
  const language =
    languageFromCookie || languageFromAcceptHeader || fallbackLng;
  return language;
}

/**
 * Use the server translation with the given namespace.
 * If no namespace is provided, it will use the default common namespace.
 *
 * @param namespace not required default namespace
 * @returns
 */
export async function useServerTranslation(namespace?: Namespace) {
  const language = detectLanguage();
  const i18nextInstance = await initI18next(language, namespace);

  return {
    t: i18nextInstance.getFixedT(language, namespace),
    i18n: i18nextInstance,
    language: language,
  };
}
