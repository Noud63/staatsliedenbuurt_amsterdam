import React from 'react'
import { InwonersAantallen } from "../InwonersChart";
import { Inkomensverschillen } from "../InkomensChart";
import { EenpersoonsHuishoudens } from "../EenpersoonshuishoudensChart";
import { Leeftijdscategorieen } from "../LeeftijdscategorieenChart";
import { GemiddeldeHuurPrijs } from "../GemiddeldeHuurPrijsChart";
import { Woonoppervlak } from '../WoonoppervlakChart';
import { useTranslations } from "next-intl";

const AllCharts = () => {

  const t = useTranslations("demografie");

  return (
    <>
      <div className="flex justify-center border-b-2 text-2xl font-semibold tracking-wide">
        <span className="px-4 pb-4">{t("titel")}</span>
      </div>
      <div className="whitespace-pre-line border-b-2 py-6 pl-4">
        {t.raw("desc")}
      </div>
      <div className="grid grid-cols-3 gap-4 max-xl:grid-cols-2 max-md:grid-cols-1">
        <div className="flex flex-col justify-between">
          <div>
            <div className="mt-8 rounded-md bg-yellow-700 py-2 pl-4 text-lg font-semibold text-white shadow">
              <span className="font-semibold">
                Inwonersaantallen 2014 - 2024
              </span>
            </div>

            <div className="text-md mt-4 px-4">
              De afgelopen 10 jaar is het inwonersaantal in de Staatsliedenbuurt
              met 250 gestegen.
            </div>
          </div>
          <InwonersAantallen />
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <div className="mt-8 rounded-md bg-yellow-700 py-2 pl-4 text-lg font-semibold text-white shadow">
              <span className="font-semibold">
                Gemiddeld besteedbaar inkomen
              </span>
            </div>
            <div className="text-md mt-4 px-4">
              Het gemiddelde besteedbare inkomen is de afgelopen 20 jaar bijna
              verdubbeld.
              <br />
              Een significante stijging van maar liefst 99%.
            </div>
          </div>
          <Inkomensverschillen />
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <div className="mt-8 rounded-md bg-yellow-700 py-2 pl-4 text-lg font-semibold text-white shadow">
              <span className="font-semibold">Eenpersoonshuishoudens</span>
            </div>
            <div className="text-md mt-4 px-4">
              De toe en afname van het aantal eenpersoonshuishoudens.
              <br />
              Aantallen zijn weergegeven in procenten van het totaal aantal
              huishoudens.
            </div>
          </div>
          <EenpersoonsHuishoudens />
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <div className="mt-8 rounded-md bg-yellow-700 py-2 pl-4 text-lg font-semibold text-white shadow">
              <span className="font-semibold">Leeftijdscategorieën</span>
            </div>
            <div className="text-md mt-4 px-4">
              Leeftijdscategorieën ingedeeld van 0-18 jaar, 18-64 jaar, 65-79
              jaar en 80 jaar en ouder. Weergegeven in absolute aantallen op de
              totale bevolking van de wijk.
            </div>
          </div>
          <Leeftijdscategorieen />
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <div className="mt-8 rounded-md bg-yellow-700 py-2 pl-4 text-lg font-semibold text-white shadow">
              <span className="font-semibold">Gemiddelde huurprijs</span>
            </div>
            <div className="text-md mt-4 px-4">
              De gemiddelde huurprijs van een woning in de Staatsliedenbuurt
              <br />
              De gemiddelde huurprijs is de afgelopen 10 jaar met ca. €350
              gestegen.
            </div>
          </div>
          <GemiddeldeHuurPrijs />
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <div className="mt-8 rounded-md bg-yellow-700 py-2 pl-4 text-lg font-semibold text-white shadow">
              <span className="font-semibold">Verdeling woonoppervlak</span>
            </div>
            <div className="text-md mt-4 px-4">
              Aantal woningen per woonoppervlak van 0-40 m², 40-60 m², 60-80 m²
              en 100+ m².
            </div>
          </div>
          <Woonoppervlak />
        </div>
      </div>
    </>
  );
}

export default AllCharts
