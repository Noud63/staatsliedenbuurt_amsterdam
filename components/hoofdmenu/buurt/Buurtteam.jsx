import React, { useEffect, useState } from "react";
import Financien from "./Financien";
import Huisvesting from "./Huisvesting";
import Gezondheid from "./Gezondheid";
import Administratie from "./Administratie";
import Werk from "./Werk";
import Ontmoeten from "./Ontmoeten";
import Zorg from "./Zorg";
import Veiligheid from "./Veiligheid";
import { ArrowRight } from "lucide-react";
import ScrollButton from "@/components/ScrollButton";
import { useScrollVisibility } from "@/hooks/useScrollVisibility";

const BuurtTeam = () => {
  
  const { showScrollButton, scrollToTop, handleScroll } = useScrollVisibility(1000, "buurtteam-menu"); //Set scrollY threshold to 1000px

  const items = [
    { label: "Financiën", id: "financien" },
    { label: "Huisvesting", id: "huisvesting" },
    { label: "Gezondheid", id: "gezondheid" },
    { label: "Administratie", id: "administratie" },
    { label: "Ontmoeten", id: "ontmoeten" },
    { label: "Zorg", id: "zorg" },
    { label: "Werk", id: "werk" },
    { label: "Veiligheid", id: "veiligheid" },
  ];


  return (
    <div className="mt-2 text-lg text-white max-xsm:text-base">
      <section className="w-full max-xsm:ml-0">
        <div className="px-4 border-t-2 pt-4">
          Het buurtteam is een plek in de buurt waar u naartoe kunt met uw
          vragen.
          <br />
          Bijvoorbeeld als u moeite heeft om rond te komen, meer sociale
          contacten wilt, of zo lang mogelijk zelfstandig thuis wil blijven
          wonen.
          <br />
          Allerlei vragen waar het buurtteam u gratis bij kan helpen. Samen
          kijken we wat u nodig heeft, zodat u zelf weer verder kunt.
          <br />
          De werkwijze hangt af van uw vragen en uw persoonlijke situatie. We
          kijken wat u zelf kan doen en hoe uw directe omgeving kan helpen.
          <br />
          Het buurtteam kijkt samen met u wat er aan de hand is en wat er nodig
          is.
        </div>

        <div className="mt-4 px-4 max-xsm:mx-0">
          U vindt ons in Huis van de Buurt Koperen Knoop.
          <br />
          Onze buurtteammedewerkers helpen u graag.
          <br />
          Mail of bel ons voor een afspraak.
          <br />
          <div className="mt-4">
            Adres : Van Limburg Stirumstraat 119
            <br />
            Email : aanmelden@​buurtteamamsterdamwest​.nl
            <br />
            Tel : 020 618 49 52
          </div>
        </div>

        <div className="mt-6" id="buurtteam-menu">
          <div className="w-full rounded-full border-b border-yellow-800 bg-yellow-700 px-4 py-2 text-lg shadow-lg">
            Het buurtteam helpt u met:
          </div>
          <br />
          <ul className="mx-8 w-full max-w-[200px] cursor-pointer list-disc space-y-2 text-yellow-900">
            {items.map((item) => (
              <li
                key={item.id}
                onClick={() => handleScroll(item.id)}
                className="w-[200px] rounded-full bg-white  text-white decoration-yellow-800"
              >
                <div className="flex flex-row items-center justify-between px-4 pb-1">
                  
                  <div className=" text-base font-semibold text-yellow-950">
                    {item.label}
                  </div>
                  <ArrowRight size={15} color={"#713f12"} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Financien />

      <Huisvesting />

      <Gezondheid />

      <Administratie />

      <Ontmoeten />

      <Zorg />

      <Werk />

      <Veiligheid />

      {/* Scroll to Top Button */}
      {showScrollButton && (
        <ScrollButton scrollToTop={scrollToTop} />
      )}
    </div>
  );
};

export default BuurtTeam;
