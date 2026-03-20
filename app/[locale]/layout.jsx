import "../globals.css";
import AuthProvider from "@/components/AuthProvider";
import Footer from "@/components/Footer";
import LoginRegisterLogout from "@/components/LoginRegisterLogout";
import Navbar from "@/components/Navbar";
import Menu from "@/components/Menu";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Toaster } from "react-hot-toast";
import { hasLocale } from "next-intl";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";

// Replace hasLocale with a custom implementation
// const isValidLocale = (locales, locale) => locales.includes(locale);

export default async function RootLayout({ children, params }) {
  const { locale } = await params;

  // console.log(routing.locales, locale)
  
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <html lang={locale}>
      <body className="relative bg-gradient-to-r from-red-950 via-yellow-700 to-red-950">
        <div className="fixed -z-10 h-full w-full bg-[url('/images/homebg2.png')] bg-cover bg-top bg-no-repeat" />
        <NextIntlClientProvider >
          <AuthProvider>
            <Navbar />
            <div className="max-md:flex md:hidden">
              <div className="mx-auto w-full max-w-[620px] max-md:max-w-full max-md:px-4 max-xsm:px-2">
                <LoginRegisterLogout />
              </div>
            </div>

            <Menu />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </AuthProvider>
        </NextIntlClientProvider>
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
