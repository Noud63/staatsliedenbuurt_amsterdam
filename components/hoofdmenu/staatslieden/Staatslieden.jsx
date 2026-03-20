"use client"
import React from "react";
import straatnamen from "@/data/straatnamen.json";
import Image from "next/image";

import Description from "./Description";

const staatslieden = () => {

  //If you only need the href's keys from the array of objects
  // const hrefs = straatnamen.map((obj) => ({href: obj.href}))
  // console.log("Hrefs:", hrefs)

return (
    <div className="mx-auto mt-8 w-full max-w-[1280px] px-4 text-white max-md:mt-4 max-sm:mt-4 max-sm:px-4">
      <div className="flex justify-center border-b-2 text-2xl font-semibold tracking-wide">
        <div className="px-4 pb-4">De Staatslieden</div>
      </div>

      <div className="mb-6 mt-4">
        De staasliedenbuurt kent 35 straten.
        <br />
        Alle straatnamen zijn vernoemd naar Nederlandse staatslieden uit de 18e
        en 19e eeuw.
        <br />
        Maar wie waren die hoge heren en wat was hun functie?
        <br />
        Hieronder een lijst van alle straatnamen en een korte kennismaking met de
        persoon naar wie de straat genoemd is.
        <br />
        Klik op het google maps icoon voor de locatie op de plattegrond.
      </div>

      <div className="">
        <div className="mt-4 grid auto-rows-[420px] max-xxl:auto-rows-[430px]  max-xxm:auto-rows-[340px] max-xm:auto-rows-[400px]  grid-cols-[repeat(auto-fill,_minmax(290px,_1fr))] gap-2">
          {straatnamen &&
            straatnamen.map((naam) => (
              <div
                key={naam.naam}
                className="relative flex flex-col rounded-md bg-white px-3 pt-1 decoration-yellow-800"
              >
                <div className="mb-3 w-full border-b border-yellow-900 pb-1">
                  <span className="text-lg font-semibold text-yellow-900">
                    {naam.naam[0]}
                  </span>
                </div>

                <div className="w-[67px] h-auto">
                  <Image src={naam.img ? naam.img : "/images/staatslieden/king.jpg"} width={100} height={0} alt=""/>
                </div>

                <Description naam={naam}/>

                <div className="absolute bottom-2 flex mb-1 ">
                  
                  <a href={naam.href} target="_blank">
                    <Image
                      src="/icons/googlemaps.png"
                      width={30}
                      height={0}
                      alt=""
                      className="h-auto w-[28px]"
                    />
                  </a>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default staatslieden;
