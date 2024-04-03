import type commonMessages from "./en/common";
import type zodMessages from "./en/zod";

/**
 * The Resource type to define the type of all language resources.
 */
export type Resources = {
  common: typeof commonMessages;
  zod: typeof zodMessages;
};
