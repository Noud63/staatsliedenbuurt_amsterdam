"use client";
import React from "react";
import menuItems from "../data/menuItems.json";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useLocale } from "next-intl";


const Menu = () => {
  let pathname = usePathname();
  const currentLocale = useLocale();

  if (pathname.length > 3) {
    pathname = pathname.slice(3, pathname.length);
  } else if (pathname.length <= 3) {
    pathname = "/";
  }

  // Ensure that the items use the correct locale prefix in the href
  const getLocalizedHref = (href) => {
    // Prepend the current locale (either /nl or /en)
    return `/${currentLocale}${href}`;
  };

  return (
    <div className="mx-auto mt-8 w-full max-w-[1980px] px-4 max-md:hidden">
      <div className="grid grid-cols-3 gap-2 max-sm:hidden xl:grid-cols-6">
        {menuItems &&
          menuItems.map((item, index) => (
            <div key={index}>
              <Link href={getLocalizedHref(item?.href || "/not-found")}>
                <div
                  className={`flex h-12 w-full cursor-pointer items-center justify-center rounded-lg border-2 text-white 
                    transition-all delay-100 duration-200 ease-in-out hover:text-xl font-semibold hover:tracking-wider max-sm:h-10 ${pathname === item?.href ? "menuitem" : ""}`}
                   >
                  {currentLocale === "nl" ? item.title[0] : item.title[1]}
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Menu;
