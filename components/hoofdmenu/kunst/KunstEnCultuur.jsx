import React from "react";
import TitleBar from "@/components/TitleBar";
import SectionHeader from "@/components/SectionHeader";

const KunstEnCultuur = () => {
  return (
    <div className="mx-auto mt-8 w-full max-w-[1280px] px-4 text-white max-md:mt-4 max-sm:mt-4 max-xsm:px-2 max-2xl:max-w-[960px]">
      <SectionHeader title="Kunst & Cultuur" />
      <div className="mt-2 border-t-2">
        <div className="mx-auto mt-4 flex w-full max-w-[1280px] flex-col gap-2 text-lg max-xsm:text-base">
          <p>
            Kunst en cultuur zijn de ziel van een samenleving. Ze weerspiegelen
            onze waarden, tradities en creativiteit. Van schilderijen en
            beeldhouwwerken tot muziek, theater en literatuur, kunst en cultuur
            bieden ons een venster naar andere tijden, plaatsen en
            perspectieven.
          </p>
          <p>
            De Staatsliedenbuurt heeft een eigenzinnig en levendig kunstklimaat.
            Verspreid door de buurt vind je kunstwerken in de openbare ruimte,
            bijzondere initiatieven, ateliers en plekken waar kunstenaars hun
            werk presenteren. Kunst is hier niet alleen te vinden achter de
            muren van een galerie, maar maakt ook deel uit van het dagelijkse
            straatbeeld.
          </p>
          <p>
            De buurt kent bovendien een lange geschiedenis als werkplek voor
            kunstenaars. Een belangrijke rol daarin speelt het ateliergebouw aan
            de Tweede Nassaustraat 8, waar sinds 1969 kunstenaars gevestigd
            zijn. Vanuit deze kunstenaarsgemeenschap ontstonden initiatieven om
            beeldende kunst toegankelijker te maken voor een breder publiek. Een
            daarvan is Stichting Kunsttraject, opgericht in 1988. Met
            tentoonstellingen in etalages, kunstroutes en uiteenlopende
            kunstprojecten brengt Kunsttraject kunst letterlijk naar de straten
            van de buurt.{" "}
          </p>
          <p>
            Van schilderkunst en fotografie tot sculpturen, muurschilderingen en
            andere vormen van beeldende kunst: de Staatsliedenbuurt biedt een
            gevarieerd beeld van hedendaagse kunst en artistieke expressie. Soms
            zichtbaar en herkenbaar, soms onverwacht verscholen op een gevel, in
            een straat of achter een etalageruit.
          </p>
          <p>
            Deze combinatie van een actieve kunstenaarsgemeenschap,
            kunstinitiatieven en kunst in de openbare ruimte geeft de
            Staatsliedenbuurt een eigen culturele identiteit. Een identiteit die
            voortdurend in beweging is en waarin kunst een verbindende rol
            speelt tussen kunstenaars, bewoners en hun leefomgeving.
          </p>
        </div>
        <div>
          <h2 className="mt-8 flex justify-center rounded-full bg-white py-2 pl-2 text-xl font-semibold text-yellow-900">
            Kunsttraject & Etalages
          </h2>
          <ul className="list-inside list-disc">
            <li className="mt-4">
              <span className="font-semibold text-white">
                Kunsttraject Amsterdam:
              </span>{" "}
              In verschillende straten van de buurt vind je glazen etalages die
              fungeren als expositieruimte.
            </li>
            <li className="mt-4">
              <span className="font-semibold text-white">
                Stoep (door kunstenaarscollectief POUBELLE):
              </span>{" "}
              In verschillende straten van de buurt vind je glazen etalages die
              fungeren als expositieruimte.
            </li>
          </ul>
        </div>
        <div>
          <h2 className="mt-8 flex justify-center rounded-full bg-white py-2 pl-2 text-xl font-semibold text-yellow-900">
            Kunstgaleries
          </h2>
        </div>
        <div>
          <h2 className="mt-8 flex justify-center rounded-full bg-white py-2 pl-2 text-xl font-semibold text-yellow-900">
            Kunst in de Openbare Ruimte
          </h2>
        </div>
        <div>
          <h2 className="mt-8 flex justify-center rounded-full bg-white py-2 pl-2 text-xl font-semibold text-yellow-900">
            Routes en Initiatieven
          </h2>
        </div>
      </div>
    </div>
  );
};

export default KunstEnCultuur;
