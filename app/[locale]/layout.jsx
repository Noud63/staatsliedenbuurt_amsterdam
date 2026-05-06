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

export async function generateMetadata({ params }) {
  const { locale } = await params;

  const siteUrl =
    process.env.NEXT_PUBLIC_DOMAIN || "http://localhost:3000";

  return {
    metadataBase: new URL(siteUrl),

    title: "Staatsliedenbuurt Amsterdam",
    description: "Alles over de Staatsliedenbuurt Amsterdam",

    alternates: {
      canonical: `/${locale}`,
      languages: {
        nl: "/nl",
        en: "/en",
      },
    },

    openGraph: {
      title: "Staatsliedenbuurt Amsterdam",
      description: "All about the  Staatsliedenbuurt Amsterdam",
      url: `/${locale}`,
      images: [
        {
          url: new URL("/images/og-image.jpg", siteUrl).toString(),
          width: 1200,
          height: 630,
        },
      ],
      type: "website",
    },
  };
}

// Replace hasLocale with a custom implementation
// const isValidLocale = (locales, locale) => locales.includes(locale);

export default async function RootLayout({ children, params }) {
  const { locale } = await params;

  // console.log(routing.locales, locale)
  
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <html lang={locale}>
      <body className="bodybackground relative bg-gradient-to-r from-red-950 via-yellow-700 to-red-950">
        <NextIntlClientProvider locale={locale} messages={messages}>
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
