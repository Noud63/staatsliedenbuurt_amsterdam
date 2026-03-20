"use client";
import { useState, useEffect } from "react";
import getWeatherData from "@/helper/getWeatherData";
import getSunriseAndSunset from "@/helper/getSunriseAndSunset";
import WeerVandaag from "./WeerVandaag";
import WeerMorgen from "./WeerMorgen";
import { useTranslations } from "next-intl";

const Weather = () => {

const [d, setD] = useState({});
const [d2, setD2] = useState({});
const [sunMoon, setSunMoon] = useState([]);

const t = useTranslations("weer");

useEffect(() => {
  const getData = async () => {
    try {
      const { data, data2 } = await getWeatherData();
      setD(data);
      setD2(data2);
    } catch (error) {
      console.log(error);
    }
  };
  getData();
}, []);

useEffect(() => {
  const getData = async () => {
    const { results } = await getSunriseAndSunset();
    setSunMoon(results);
  };
  getData();
}, []);

// const now = d.date.slice(0, 10);
const today = new Date().toLocaleDateString();

//Tomorrow
let date = new Date();
date.setDate(date.getDate(date) + 1);

// console.log(date.toLocaleDateString("nl-NL", { month: "short" }));

return (
  <div className="mx-auto mt-4 w-full text-white md:max-w-[650px]">
    <div className="mx-4 bg-[url('/images/cloud2.png')] bg-cover bg-center bg-no-repeat max-sm:mx-4 max-xsm:mx-2">
      <div className="flex items-center justify-between rounded-lg bg-white px-4 py-2 text-xl font-semibold text-yellow-900 max-xsm:text-xl">
        <span>{t("vandaag")}</span>
        <span className="flex items-end py-1 text-base font-normal">
          <span className="text-lg font-semibold">{today}</span>
        </span>
      </div>

      <WeerVandaag data1={d} sunMoon={sunMoon} />
    </div>

    <div className="mx-4 mt-8 bg-[url('/images/cloud.png')] bg-center bg-no-repeat max-xsm:mx-2">
      <div className="flex items-center justify-between rounded-lg bg-white px-4 py-2 text-xl font-semibold text-yellow-900 max-xsm:text-xl">
        <span>{t("morgen")}</span>
        <span className="flex items-end py-1 text-base font-normal">
          <span className="text-lg font-semibold">
            {date.toLocaleDateString("nl-NL")}
          </span>
        </span>
      </div>

      <WeerMorgen data2={d2} sunMoon={sunMoon} tomorrow={date} />
    </div>
    <div className="mt-8 flex justify-center text-xs">
      (Data provided by OpenWeathermap.org & SunriseSunset.io)
    </div>
  </div>
);
}

export default Weather;