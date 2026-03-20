import React, { useEffect, useState } from "react";
import Financien from "./Financien";
import Huisvesting from "./Huisvesting";
import Gezondheid from "./Gezondheid";
import Administratie from "./Administratie";
import Werk from "./Werk";
import Ontmoeten from "./Ontmoeten";
import Zorg from "./Zorg";
import Veiligheid from "./Veiligheid";
import { ArrowUp, ArrowRight } from "lucide-react";

const BuurtTeam = () => {
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

  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScrollVisibility = () => {
      if (window.scrollY > 1000) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScrollVisibility);
    return () => window.removeEventListener("scroll", handleScrollVisibility);
  }, []);

  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="my-4 text-lg text-white max-xsm:text-base">
      <section className=" w-full max-xsm:ml-0">
        <div className="mx-4 max-xsm:mx-0">
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

        <div className="mt-4 mx-4 max-xsm:mx-0">
          U vindt ons in Huis van de Buurt Koperen Knoop.
          <br />
          Onze buurtteammedewerkers helpen u graag.
          <br />
          Mail of bel ons voor een afspraak.
          <br />
          <div className="mt-4">
            Adres : Van Limburg Stirumstraat 119 , 1051 BA
            <br />
            E-mail : aanmelden@​buurtteamamsterdamwest​.nl
            <br />
            Tel : 020 618 49 52
          </div>
        </div>

        <div className="mt-6">
          <div className="w-full rounded-md border-b border-yellow-800 bg-yellow-700 px-4 py-2 text-lg shadow-lg">
            Het buurtteam kan u bijstaan op het gebied van :
          </div>
          <br />
          <ul className="mx-8 w-full max-w-[200px] cursor-pointer list-disc space-y-2 text-yellow-900">
            {items.map((item) => (
              <li
                key={item.id}
                onClick={() => handleScroll(item.id)}
                className="w-[200px] rounded-md bg-white py-1 text-white decoration-yellow-800 hover:underline"
              >
                <div className="flex flex-row items-center justify-between px-2">
                  
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
        <button
          onClick={scrollToTop}
          className="singlepost fixed bottom-6 right-6 rounded-full border-2 bg-gradient-to-l from-red-950 to-yellow-700 p-2 text-white shadow-lg transition-all duration-300 max-md:p-1"
          aria-label="Scroll to top"
        >
          <ArrowUp size={30} />
        </button>
      )}
    </div>
  );
};

export default BuurtTeam;
