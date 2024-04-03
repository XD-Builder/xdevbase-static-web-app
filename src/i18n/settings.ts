import { type Namespace } from "i18next";

export const fallbackLng = "en" as const;
export const languages = [fallbackLng, "zh-CN"] as const;
export const defaultNamespace: Namespace = "common";
export type Language = (typeof languages)[number];

/**
 * Get the i18next options.
 * If no params are passed, it will use the default language and namespace.
 * The default language is "en" and the default namespace is "common".
 * 
 * @param lng language to use
 * @param ns namespace to use
 */
export function getOptions(
  lng: Language = fallbackLng,
  ns: Namespace = defaultNamespace,
) {
  return {
    supportedLngs: languages,
    fallbackLng: languages,
    lng,
    fallbackNS: defaultNamespace,
    defaultNS: defaultNamespace,
    ns,
  };
}
