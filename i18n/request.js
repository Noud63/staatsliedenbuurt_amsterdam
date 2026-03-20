import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

// Replace hasLocale with a custom implementation
const isValidLocale = (locales, locale) => locales.includes(locale);

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const locale = isValidLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
