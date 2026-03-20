import React from "react";
import TitleBar from "@/components/TitleBar";
import { useTranslations } from "next-intl";

const ContactPage = () => {
  const t = useTranslations("contact");

  return (
    <div className="mx-auto mt-4 w-full max-w-[660px] px-4 max-md:max-w-full">
      <TitleBar title="Contact" titleWidth={"pl-2 font-bold"} />
      <div className="mt-4 w-full rounded-lg border-2 p-4 text-white">
        <div>
          {t("contact")}
          <br />
          E-Mail : info@staatslieden.nl
          <br />
        </div>
       
      </div>
       
    </div>
  );
};

export default ContactPage;
