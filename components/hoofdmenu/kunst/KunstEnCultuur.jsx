"use client";
import React from "react";
import SectionHeader from "@/components/SectionHeader";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import { createSlides } from "@/components/Slides";
import LightBoxComponent from "@/components/LightBoxComponent";

const KunstEnCultuur = () => {

  const images = [
    {
      buitenkunst: [
        {
          src: "/images/vendelendewolf.jpg",
          alt: "No, Vendel en DeWolf",
          info: "'No' (1997)",
          jaar: 1997,
          title: "No",
          description: "'No' (1997), Vendel en DeWolf",
        },
        {
          src: "/images/noelharding.jpg",
          alt: "oze lijn, waterbak en arm' (1992), Noel Harding",
          info: "'Roze lijn, waterbak en arm' (1992)",
          jaar: 1992,
          title: "'Roze lijn, waterbak en arm'",
          description: "'Roze lijn, waterbak en arm' (1992), Noel Harding",
        },
        {
          src: "/images/matthijsvandenbosch.jpg",
          alt: "matthijsvandenbosch",
          info: " Mini show (2024)",
          jaar: 2024,
          title: "Matthijs van den Bosch",
          description: "Matthijs van den Bosch, schilderijen (2024)",
        },
        {
          src: "/images/tonzwerver.jpg",
          alt: "Ton Zwerver",
          info: "Ton Zwerver (Stoep)",
          jaar: 2026,
          title: "Ton Zwerver",
          description: "Ton Zwerver, Stoep",
        },
      ],
    },
    {
      kunsttraject: [
        {
          src: "/images/kunsttraject/kunsttraject_map.jpg",
          alt: "Kunsttraject",
          info: "Kunsttraject",
          jaar: 2026,
          title: "Kunsttraject",
          description: "Kunsttraject Staatsliedenbuurt",
        },
        {
          src: "/images/kunsttraject/stoep.jpg",
          alt: "Stoep",
          info: "Stoep",
          jaar: 2026,
          title: "Stoep, de kunst ligt op straat",
          description: "Stoep, de kunst ligt op straat",
        },
      ],
    },
    {
      routes: [
        {
          src: "/images/kunsttraject/kunstroute_map.jpg",
          alt: "Kunstwandeling",
          info: "Kunstwandeling routekaart",
          jaar: 2026,
          title: "Kunstwandeling routekaart",
          description: "Kunstwandeling routekaart",
        },
      ],
    },
  ];

  return (
    <div className="mx-auto mt-8 w-full max-w-[1280px] px-4 text-white max-2xl:max-w-[960px] max-md:mt-4 max-sm:mt-4 max-xsm:px-2">
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
          <ul className="list-inside list-disc text-lg">
            <li className="mt-4">
              <span className="font-semibold text-white">
                Kunsttraject Amsterdam:
              </span>{" "}
              Stichting Kunsttraject is een kunstenaarsinitiatief in Amsterdam,
              stadsdeel West.
              <br />
              Kunsttraject verzorgt tentoonstellingen in etalages in de
              Staatsliedenbuurt en in de Zeeheldenbuurt. Daarnaast organiseert
              Kunsttraject projecten op het gebied van beeldende kunst,
              voornamelijk in stadsdeel West.
            </li>
            <li className="mt-4">
              <span className="font-semibold text-white">Stoep: </span>
              <span className="font-normal text-white">
                {" "}
                ’Stoep - De kunst ligt op straat’ is een kunstproject van
                POUBELLE in de etalages van Kunsttraject.
              </span>
              <br />
              POUBELLE is een kunstenaarscollectief (bestaande uit een steeds
              wisselende/groeiende groep kunstenaars uit Nederland en Duitsland)
              dat de schoonheid van restmaterialen, afval en weggegooide spullen
              onderzoekt.
            </li>
          </ul>
        </div>

        <div className="max-sm: mt-6 grid grid-cols-[repeat(auto-fill,_minmax(260px,_1fr))] gap-2 max-sm:mt-4">
          <LightBoxComponent images={images[1].kunsttraject} height="auto"/>
        </div>

        <div>
          <h2 className="mt-8 flex justify-center rounded-full bg-white py-2 pl-2 text-xl font-semibold text-yellow-900">
            Kunstgaleries
          </h2>
          <div className="mt-4 text-lg">
            In de Staatsliedenbuurt in Amsterdam vind je traditionele,
            afgesloten galeries in mindere mate.
            <br />
            Het zijn er slechts twee:
            <ul className="mt-4 list-inside list-disc">
              <li className="">
                <a
                  href="https://themillenhouse.com/"
                  alt="the millen house"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="border-b font-semibold">
                    The Millen House
                  </span>
                  <br />
                  <span className="ml-6">Fannius Scholtenstr 89</span>
                </a>
                <p className="my-4">
                  The Millen House, founded in 2022 by architect and curator
                  Niek Schoenmakers, is a gallery and project space dedicated to
                  uniting 20th-century and contemporary art, design, and
                  architecture.
                </p>
              </li>
              <li>
                <a
                  href="https://www.mo-artgallery.com/"
                  alt="mo-artgallery"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {" "}
                  <span className="border-b font-semibold">Mo-Artgallery</span>
                  <br />
                  <span className="ml-6">Haarlemmerweg 153HS</span>
                </a>
                <p className="mt-4">
                  Mo-Artgallery is dé kunstbestemming voor gesigneerde en
                  genummerde kunstenaarsedities, hedendaagse kunstedities,
                  hedendaagse kunstfotografie, multiples, kunstedities en
                  gelimiteerde kunstprints.
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <h2 className="mt-8 flex justify-center rounded-full bg-white py-2 pl-2 text-xl font-semibold text-yellow-900">
            Kunst in de Openbare Ruimte
          </h2>
          <p className="mt-4 text-lg">
            Staatsliedenbuurt in Amsterdam-West heeft een rijke traditie op het
            gebied van kunst in de openbare ruimte, met een mix van permanente
            beelden, tijdelijke installaties en creatieve initiatieven in de
            buurt. Er bestaat een te volgen kunstroute door de Staatsliedenbuurt
            langs tal van kunstwerken in de openbare ruimte. Kijk hieronder bij
            Routes & Initiatieven voor meer informatie.
          </p>
          <p className="mt-4">
            <span className="mb-2 inline-block border-b text-xl font-semibold">
              Hier enkele voorbeelden van kunst in de openbare ruimte.
            </span>
            <br />
            "No", gerealiseerd in 1997 door het duo Vendel & de Wolf.
            <br />
            Het werk is te bewonderen aan het Waterspiegelplein (poortgebouw,
            blok 5).
          </p>
          <p className="mt-4">
            "Roze lijn, waterbak en arm", gerealiseerd in 1997 door Noel
            Harding.
            <br />
            Het werk is te bewonderen aan het Nassauplein op het dak van het
            roze flatgebouw.
          </p>
          <p className="mt-4">
            Mini-expositie ‘Scènes uit Marokko’ van Matthijs van den Bosch.
            <br />
            Het werk was te bewonderen in de onderdoorgang aan de van Limburg
            Stirumstraat/J.M. Kemperstraat.
            <br />
            Op deze locatie vinden wisselende mini-exposities plaats.
          </p>
          <p className="mt-4">
            Ton Zwerver realiseerde een werk in samenwerking met KunstTraject.
            <br />
            Dit werk was te zien in een van de etelages van Stichting
            KunstTraject.
          </p>
          <div className="mt-6 grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-2 max-sm:mt-4">
            <LightBoxComponent images={images[0].buitenkunst} />
          </div>
        </div>
        <div>
          <h2 className="mt-8 flex justify-center rounded-full bg-white py-2 pl-2 text-xl font-semibold text-yellow-900">
            Routes & Initiatieven
          </h2>
          <div className="text-lg">
            <h3 className="mb-4 mt-4 text-xl font-semibold">
              Kunstwandeling:{" "}
              <span className="font-normal">
                Westerpark en Staatsliedenbuurt
              </span>
            </h3>
            <p className="mb-4 font-semibold">
              Rondwandeling ca. 2,5 uur langs 28 locaties. Met bijna 35 kleine
              en grote openbare kunstwerken. Naar keuze kan de route worden
              gehalveerd of in tweeën gelopen; zie daarvoor de stippellijn op de
              kaart.
            </p>
            <p>
              De wandeling start op de Haarlemmerweg ter hoogte van de brug bij
              het begin van De Wittenkade, aan de voet van ‘de roze toren’. De
              route gaat via het standbeeld van Domela Nieuwenhuis uit 1931 en
              de ‘Groeistam’ van Michiel Schierbeek uit 1986 het ‘oude’
              Westerpark in. Als integraal onderdeel van renovatie en
              uitbreiding zijn hier eigentijdse kunstwerken geplaatst. Na het
              ‘nieuwe’ Westerpark van de Amerikaanse architect Kathryn
              Gustafson, in 2003 voltooid met een sculptuur van Herman Makkink,
              loopt de route naar het Gedenkteken Gerard Reve van kunstenaar
              Margriet Kemper en fotografe Rineke Dijkstra (2006). Vanuit de
              ‘milieuwijk’ gaat het vervolgens naar de ‘Abri & Peperbus’ van
              Frank Halmans (1996) en andere kunstwerken uit de tijd van de
              stadsvernieuwing in de Staatsliedenbuurt. Zoals ook de ‘Knoop’ van
              Jan van der Vaart uit 1980. En met een slinger door de buurt komt
              de wandeling terug op het beginpunt bij de Haarlemmerweg en het
              Nassauplein.
            </p>
            <p className="mb-4 mt-4">
              Hier vindt je de plattegrond met alle kunstwerken op de route:
              <a
                href="https://stadsdeelwest.kunstwacht.nl/css/frontend/stadsdeelwest/route2.pdf"
                rel="noopener noreferrer"
                alt=""
                className="underline"
              >
                <span className="pl-2">kunstroute.pdf</span>
              </a>
            </p>
            <div className="mt-6 grid grid-cols-[repeat(auto-fill,_minmax(260px,_1fr))] gap-2 max-sm:mt-4">
              <LightBoxComponent images={images[2].routes} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KunstEnCultuur;
