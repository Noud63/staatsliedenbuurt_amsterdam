"use client";
import React, { useState } from "react";
import westergasfabriek from "@/data/westergasfabriek.json";
import Image from "next/image";
import CategorySection from "./CategorySection";
import WestergasMenu from "./WestergasMenu";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const WesterGas = () => {
  const [open, setOpen] = useState(false);
  const categories = Object.fromEntries(
    westergasfabriek.map((item) => [item.category, item]),
  );

  const categoryNames = Object.keys(categories);

  return (
    <div className="mx-auto mt-8 w-full max-w-[1980px] px-4 text-white max-md:mt-4 max-sm:mt-4 max-xsm:px-2">
      <div className="flex justify-center border-b-2 text-2xl font-semibold tracking-wide">
        <div className="px-4 pb-4">Westergas</div>
      </div>
      <WestergasMenu categoryNames={categoryNames} />
      <div className="mx-auto mt-4 w-full max-w-[620px]">
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
      <div className="mx-auto mb-12 mt-2 max-h-[200px] w-full max-w-[620px]">
        <Image
          src="/images/gashouder.jpg"
          alt="Westergas"
          width={620}
          height={200}
          className="h-auto max-h-[200px] w-[620px] cursor-pointer object-cover"
          onClick={() => setOpen(true)}
        />
        <div className="flex">
          <span className="flex-1 py-1 text-[12px]">
            Gashouder in aanbouw 1902
          </span>
          <span className="flex-1 py-1 text-[12px]">Rave party 2025</span>
        </div>
      </div>

      <CategorySection category={categories["Eten & Drinken"]} />
      <CategorySection category={categories["Kijk & Luister"]} />
      <CategorySection category={categories["Dans & Muziek"]} />
      <CategorySection category={categories["Events"]} />
      <CategorySection category={categories["Shop"]} />
      <CategorySection category={categories["Anders"]} />

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
