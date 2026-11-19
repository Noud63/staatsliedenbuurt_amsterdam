"use client";
import React from "react";
import { useTranslations } from "next-intl";
import images from "../../../data/beeldToenEnNu.json";
import LightBoxComponent from "@/components/LightBoxComponent";

const Beeld = () => {
  const t = useTranslations("beeld");

  const sortedImages = [...images].sort((a, b) => a.jaar - b.jaar); // Keep import array immutable -> [...copy_array_first]

  return (
    <>
      <div className="flex flex-row justify-center gap-2 border-b-2 pb-8 text-4xl font-bold max-lg:flex-col max-lg:gap-0 max-lg:pb-4 max-lg:text-4xl max-lg:tracking-normal max-md:text-3xl max-xm:text-[22px]">
        <div className="flex justify-center">{t("titel")}</div>
        <div className="flex justify-center max-lg:text-[20px] max-lg:font-normal max-xm:text-sm">
          {t("1900heden")}
        </div>
      </div>
      <div className="mt-6 grid grid-cols-[repeat(auto-fill,_minmax(260px,_1fr))] gap-2 max-sm:mt-4">
        <LightBoxComponent images={sortedImages} />
      </div>
    </>
  );
};

export default Beeld;
