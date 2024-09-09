import "i18next";

import { type Resources } from "./locales/types";

/**
 * Augment the i18next module to include the custom type options.
 * This will allow us to define the default namespace and resources.
 */
declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: Resources;
  }
}
