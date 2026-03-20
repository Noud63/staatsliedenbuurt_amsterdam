"use client"
import React from "react";
import Image from "next/image";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

const LeesDitEerst = () => {

    const t = useTranslations("leesditeerst");

    const locale = useLocale(); // 'nl' or 'en'

  return (
    <div className="mx-4">
      <div className="mx-auto mt-[20px] w-full max-w-[620px] flex-col rounded-lg border-2 p-4">
        <div className="mb-4 flex items-center justify-between border-b pb-4 text-xl font-semibold text-white">
          <span>{t("titel_3")}</span>
          <Link href={`/${locale}`}>
            <AiOutlineCloseCircle size={30} color="#fff" />
          </Link>
        </div>
        <div className="mb-4 text-white">
          <div className="mb-4">
            {t("alinea_1")}
            <br />
          </div>
          {t("alinea_2")}
        </div>
        <div className="px-4 text-white">
          {}
          <ul className="list-disc">
            <li>{t("regel_1")}</li>
            <li>{t("regel_2")}</li>
            <li>{t("regel_3")}</li>
            <li>{t("regel_4")}</li>
          </ul>
        </div>

        <div className="my-12 flex flex-col items-center justify-center text-white">
          <Image
            src={"/icons/respect.png"}
            alt="respect"
            width={60}
            height={60}
            className="h-auto w-auto"
          />
          respect
        </div>
      </div>
    </div>
  );
};

export default LeesDitEerst;
