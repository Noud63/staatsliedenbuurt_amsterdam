"use client";
import React, { useEffect, useState } from "react";
import getWeatherData from "@/helper/getWeatherData";
import Image from "next/image";

const Weatherreport = () => {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    const getData = async () => {
      const { data } = await getWeatherData();
      setWeather(data);
    };
    getData();
  }, []);

  return (
    <div className="ml-2 flex flex-col">
      <div className="relative flex flex-col items-center max-xsm:items-end">
        <div
          className={
            weather.temp === undefined
              ? "hidden"
              : "flex items-center text-xl text-white"
          }
        >
          {`${weather.temp}\xB0C`}
          {weather.icon && (
            <Image
              src={weather?.icon}
              alt=""
              width={0}
              height={0}
              sizes="100vw"
              className="h-[55px] w-[50px] pt-1 max-xsm:hidden"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Weatherreport;
