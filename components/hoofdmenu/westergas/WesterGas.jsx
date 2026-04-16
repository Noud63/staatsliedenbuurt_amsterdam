import React from "react";
import westergasfabriek from "@/data/westergasfabriek.json";

import CategorySection from "./CategorySection";
import WestergasMenu from "./WestergasMenu";

const WesterGas = () => {
  const categories = Object.fromEntries(
    westergasfabriek.map((item) => [item.category, item]),
  );

  const categoryNames = Object.keys(categories);

  return (
    <div className="mt-8 px-4 w-full max-w-[1980px] text-white max-md:mt-4 max-sm:mt-4 max-xsm:px-2 mx-auto">
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

      <CategorySection category={categories["Eten & Drinken"]} />
      <CategorySection category={categories["Kijk & Luister"]} />
      <CategorySection category={categories["Dans & Muziek"]} />
      <CategorySection category={categories["Events"]} />
      <CategorySection category={categories["Shop"]} />
      <CategorySection category={categories["Anders"]} />
    </div>
  );
};

export default WesterGas;
