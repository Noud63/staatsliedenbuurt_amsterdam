"use client";
import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import SectionHeader from "@/components/SectionHeader";

const Contact = () => {
  const t = useTranslations("contact");
  return (
    <div className="mx-auto mt-8 w-full px-4 text-white max-md:mt-4 max-sm:mt-4 max-sm:px-4 max-xsm:px-2 xl:max-w-[1280px]">
      <SectionHeader title="Cont@ct" />
      <div className="mt-2 w-full rounded-lg border-b-2 border-t-2 px-4 py-8 text-white max-xsm:px-2">
        <div className="whitespace-pre-line leading-7">
          {t("contact")}
          <br />
          info@staatsliedenbuurtamsterdam.nl
          <br />
        </div>
      </div>
      <div className="flex w-full justify-center">
        <div className="mt-12 flex h-[50px] w-[50px] items-center justify-center rounded-full border-2 border-[#fff] pb-1 pl-[2px]">
          <Image
            src={"/images/logo.png"}
            alt="logo"
            width={100}
            height={0}
            className="h-[24px] w-[24px] rotate-6 object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
