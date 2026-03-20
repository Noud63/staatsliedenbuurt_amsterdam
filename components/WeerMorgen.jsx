import React, { useEffect, useState } from "react";
import Image from "next/image";
import convertSunsetAndSunrise from "@/helper/convertSunsetAndSunrise";
import { useTranslations } from "next-intl";

const WeerMorgen = ({ data2, sunMoon, tomorrow }) => {

  // console.log("data2", data2);  

  const now = new Date();
  const options = {
    month: "short",
    day: "numeric",
  };
  const month = now.toLocaleDateString("nl-NL", { month: "short" });

  const nextDay = tomorrow.toLocaleDateString("nl-NL").split("-")[0];
  const nextMonth = tomorrow.toLocaleDateString("nl-NL", { month: "short" });

   const t = useTranslations("weer")
  

  const [data, setData] = useState({});

  useEffect(() => {
    if (sunMoon.length > 0) {
      let sunrise = convertSunsetAndSunrise(sunMoon[1].sunrise);
      let sunset = convertSunsetAndSunrise(sunMoon[1].sunset);

      setData((prevData) => ({ ...prevData, sunrise, sunset }));
    }
  }, [sunMoon]);

  return (
    <div className="mt-4 rounded-lg border-2 p-2 font-semibold">
      <div className="mb-10 mt-8 flex justify-center text-5xl">Amsterdam</div>

      <div className="relative flex flex-col items-center justify-center">
        {data2.icon && (
          <Image
            src={data2?.icon}
            width="100"
            height="80"
            alt="icon"
            className="h-[90px] w-auto drop-shadow-[0_2px_4px_rgba(113,63,18,1)]"
          />
        )}
        <div className="absolute -bottom-2 flex justify-center text-lg text-yellow-800 [text-shadow:_0_7px_4px_rgb(161_98_7_/_70%)]">
          {data2.description}
        </div>
      </div>

      <div className="mt-10 flex flex-row items-center justify-center">
        <span className="bg-gradient-to-b from-yellow-600 to-yellow-800 bg-clip-text text-6xl font-semibold text-transparent [text-shadow:_0_18px_7px_rgb(161_98_7_/_70%)] max-lg:to-yellow-900">
          {" "}
          {Math.round(`${data2.temp}`)}
          {`\xB0C`}
        </span>
      </div>

      <div className="mt-12 grid w-full grid-cols-3 grid-rows-2 bg-white text-yellow-900">
        <div className="flex items-center justify-center py-2 text-white max-lg:bg-[#662909] bg-yellow-800">
          MaxTemp
        </div>
        <div className="cell flex items-center justify-center py-2 text-white max-lg:bg-[#662909] bg-yellow-800">
          MinTemp
        </div>
        <div className="cell flex items-center justify-center text-white max-lg:bg-[#662909] bg-yellow-800">
          Wind
        </div>
        <div className="flex items-center justify-center border-b border-l border-yellow-800">
          {data2.tempMax}
          {`\xB0C`}
        </div>
        <div className="flex items-center justify-center border-b border-l border-yellow-800">
          {data2.tempMin}
          {`\xB0C`}
        </div>
        <div className="flex items-center justify-center border-b border-l border-yellow-800">
          {data2.wind} bft
        </div>
      </div>

      <div className="mb-4 mt-4 grid w-full grid-cols-3 grid-rows-2 bg-white text-yellow-900">
        <div className="flex items-center justify-center py-2 text-white max-lg:bg-[#662909] bg-yellow-800">
           {t('druk')}
        </div>
        <div className="cell flex items-center justify-center text-white max-lg:bg-[#662909] bg-yellow-800">
           {t('zicht')}
        </div>
        <div className="cell flex items-center justify-center text-white max-lg:bg-[#662909] bg-yellow-800">
           {t('vocht')}
        </div>
        <div className="flex items-center justify-center border-b border-l border-yellow-800">
          {data2.pressure} hPa
        </div>
        <div className="flex items-center justify-center border-b border-l border-yellow-800">
          {data2.visibility} m
        </div>
        <div className="flex items-center justify-center border-b border-l border-r border-yellow-800">
          {data2.humidity} %
        </div>
      </div>

      <div className="my-8 flex flex-row justify-between font-semibold">
        <div className="flex w-1/3 flex-col items-center justify-center gap-4">
          <span className="text-lg"> {t('zonop')}</span>
          <Image
            src="/icons/sun.png"
            width={35}
            height={35}
            alt=""
            className="w-auto drop-shadow-[0_2px_4px_rgba(113,63,18,1)]"
          />
          <span>{data.sunrise}  {t('uur')}</span>
        </div>

        <div className="flex h-[135px] w-1/5 flex-col items-center justify-between">
          <span className="flex justify-center text-lg text-white">
            {Number(nextDay) === 1 ? nextMonth : month}
          </span>
          <span className="flex justify-center pb-2 text-6xl text-[#ffcb3b] drop-shadow-[0_2px_4px_rgba(113,63,18,.5)]">
            {nextDay}
          </span>
          <span className="text-white-800 flex justify-center">
            {data2?.date && data2.date.slice(0, 4)}
          </span>
        </div>
        <div className="flex w-1/3 flex-col items-center justify-center gap-4">
          <span className="text-lg"> {t('zononder')}</span>
          <Image
            src="/icons/moon.png"
            width={35}
            height={35}
            alt=""
            className="w-auto drop-shadow-[0_2px_4px_rgba(113,63,18,1)]"
          />
          <span>{data.sunset}  {t('uur')}</span>
        </div>
      </div>
    </div>
  );
};

export default WeerMorgen;
