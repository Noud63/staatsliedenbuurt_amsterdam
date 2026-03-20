"use client"  
import React from 'react'
import Image from 'next/image'
import vinger from "../assets/icons/vinger.png"
import Link from 'next/link'
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

const LeesDit = () => {

  const t = useTranslations("leesditeerst")

  const locale = useLocale() // 'nl' or 'en'

  return (
    <div className="mx-4 mt-4 max-xsm:mx-2 max-md:mx-4">
      <div className="mx-auto flex w-full max-w-[620px] rounded-lg border-2 border-white px-4 py-3 ">
        <div className="flex flex-row items-center gap-2 text-lg text-white max-sm:text-base">
          <span className="">{t("titel_1")}</span>
          <Image
            src={vinger}
            width={0}
            height={0}
            sizes="100vh"
            alt="vinger"
            className="h-[15px] w-[35px] max-xsm:hidden"
          />
          <div className="border-b border-white">
            <Link href={`/${locale}/leesditeerst`}>
              <div>{t("titel_2")}</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeesDit
