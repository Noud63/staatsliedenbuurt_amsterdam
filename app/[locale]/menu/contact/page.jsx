import React from "react";

import { useTranslations } from "next-intl";
import SectionHeader from "@/components/SectionHeader";


const ContactPage = () => {
  const t = useTranslations("contact");

  return (
    <div className="mx-auto mt-8 w-full px-4 text-white max-xl:max-w-[850px] max-md:mt-4 max-sm:mt-4 max-sm:px-4 max-xsm:px-2 xl:max-w-[1280px]">
        <SectionHeader title="Cont@ct" />
      <div className="mt-2 w-full rounded-lg border-t-2 px-4 pt-4 text-white max-xsm:px-2">
        <div className="whitespace-pre-line leading-7">
          {t("contact")}
          <br />
          info@staatsliedenbuurtamsterdam.nl
          <br />
        </div>
       
      </div>
       
    </div>
  );
};

export default ContactPage;
