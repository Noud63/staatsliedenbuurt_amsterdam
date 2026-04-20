"use client";
import React, { useState } from "react";
import westergasfabriek from "@/data/westergasfabriek.json";
import Image from "next/image";
import CategorySection from "./CategorySection";
import WestergasMenu from "./WestergasMenu";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import SectionHeader from "@/components/SectionHeader";

const WesterGas = () => {
  const [open, setOpen] = useState(false);
  const categories = Object.fromEntries(
    westergasfabriek.map((item) => [item.category, item]),
  );

  const categoryNames = Object.keys(categories);

  return (
    <div className="mx-auto mt-8 w-full max-w-[1980px] px-4 text-white max-md:mt-4 max-sm:mt-4 max-xsm:px-2">
      <SectionHeader title="W e s t e r g a s" />
      <WestergasMenu categoryNames={categoryNames} />
      
      <div className="mx-auto mt-4 w-full max-w-[620px] max-lg:max-w-full">
        Voor de meeste bewoners van de Staatsliedenbuurt is de Westergasfabriek
        wel bekend terrein, en weten velen inmiddels hun favoriete plekjes wel
        te vinden.
        <br />
        Voor diegenen die er nog niet zo bekend mee zijn, Westergas is het
        Cultuurpark van Amsterdam. Dag en nacht open voor iedereen die zin heeft
        in nieuwe energie. Op het terrein van de voormalige Westergasfabriek,
        waar ooit het gas werd geproduceerd dat de lichten van Amsterdam liet
        branden, krijgt energie vandaag een nieuwe betekenis.
        <br />
      </div>
      <div className="mx-auto mb-8 mt-4 flex flex-col max-h-[200px] w-full max-w-[620px] max-lg:max-w-full">
        <Image
          src="/images/gashouder.jpg"
          alt="Westergas"
          width={620}
          height={200}
          className="h-auto max-h-[200px] w-[620px] cursor-pointer object-cover max-lg:w-full"
          onClick={() => setOpen(true)}
        />
        <div className="flex">
          <span className="flex-1 py-1 text-[12px]">
            Gashouder in aanbouw 1902
          </span>
          <span className="flex-1 py-1 text-[12px]">Rave party 2025</span>
        </div>
      </div>
      <div className="flex flex-col gap-4 max-w-[620px] mx-auto max-lg:max-w-full">
        <CategorySection category={categories["Eten & Drinken"]} />
        <CategorySection category={categories["Kijk & Luister"]} />
        <CategorySection category={categories["Dans & Muziek"]} />
        <CategorySection category={categories["Events"]} />
        <CategorySection category={categories["Shop"]} />
        <CategorySection category={categories["Anders"]} />
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[{ src: "/images/gashouder.jpg" }]}
        styles={{
          container: {
            "--yarl__color_backdrop": "rgba(0, 0, 0, 0.8)",
          },
        }}
      />
    </div>
  );
};

export default WesterGas;
