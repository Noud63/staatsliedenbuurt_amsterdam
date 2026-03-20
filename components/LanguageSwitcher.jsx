"use client";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

const TranslateButton = () => {
  const locale = useLocale(); // 'nl' or 'en'
  const router = useRouter();
  const pathname = usePathname(); // Current path

  
  // Handle language change
  const handleToggle = () => {
    const newLocale = locale === "nl" ? "en" : "nl";
    // Extract the base path (removes '/nl' or '/en' from the beginning of the URL)
    const newPathname = pathname.replace(/^\/(nl|en)/, `/${newLocale}`);

    // Navigate to the new path with the updated locale in the URL
    router.replace(newPathname, { locale: newLocale });
  };

  return (
    <button
      onClick={handleToggle}
      className={`${
        locale === "nl"
          ? "bg-[url('/icons/english_flag.png')]"
          : "bg-[url('/icons/dutch_flag.png')]"
      } h-[18px] w-[30px] bg-cover bg-center bg-no-repeat ml-8 max-md:ml-0`}
    />
  );
};

export default TranslateButton;

// const router = useRouter();
// const pathname = usePathname();
// const currentLocale = useLocale();

// const handleLocaleChange = (newLocale) => {
//   // Strip the current locale from the path
//   const segments = pathname.split("/");
//   segments[1] = newLocale; // replace the locale segment
//   const newPath = segments.join("/");

//   router.push(newPath);
// };