"use client";
import React, { useState } from "react";
import Image from "next/image";
import SectionHeader from "@/components/SectionHeader";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";
import { createSlides } from "@/components/Slides";
const KunstEnCultuur = () => {
  const [open, setOpen] = useState(false);
  const [slides, setSlides] = useState([]);

  const addSlide = (imageObject) => {
    slides.length = 0;
    slides.push(imageObject);
  };

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
              stadsdeel West. Kunsttraject verzorgt tentoonstellingen in
              etalages in de Staatsliedenbuurt en in de Zeeheldenbuurt.
              Daarnaast organiseert Kunsttraject projecten op het gebied van
              beeldende kunst, voornamelijk in stadsdeel West.
            </li>
            <li className="mt-4">
              <span className="font-semibold text-white">
                Stoep (door kunstenaarscollectief POUBELLE):
                <span className="font-normal text-white">
                  {" "}
                  ’Stoep - De kunst ligt op straat’ is een kunstproject van
                  POUBELLE in de etalages van Kunsttraject.
                </span>
              </span>
              <br />
              POUBELLE is een kunstenaarscollectief (bestaande uit een steeds
              wisselende/groeiende groep kunstenaars uit Nederland en Duitsland)
              dat de schoonheid van restmaterialen, afval en weggegooide spullen
              onderzoekt.
            </li>
          </ul>
        </div>
        <div
          className="mt-4 flex cursor-pointer"
          onClick={() =>
            addSlide({
              src: "/images/kunsttraject/kunsttraject_map.jpg",
              title: "Kunsttraject",
            })
          }
        >
          <Image
            src="/images/kunsttraject/kunsttraject_map.jpg"
            width={400}
            height={445}
            alt="kunsttraject"
            className="h-auto w-[400px] object-cover"
            onClick={() => setOpen(true)}
          />
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
                  The Millen House, Fannius Scholtenstr 89
                </a>
              </li>
              <li>
                <a
                  href="https://www.mo-artgallery.com/"
                  alt="mo-artgallery"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {" "}
                  Mo-Artgallery, Haarlemmerweg 153HS
                </a>
              </li>
            </ul>
          </div>
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
          <div className="text-lg">
            <h3 className="mb-4 mt-4 text-xl font-semibold">
              Kunstwandeling:{" "}
              <span className="font-normal">
                Westerpark en Staatsliedenbuurt
              </span>
            </h3>
            <p className="mb-2 font-semibold">
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
            <div
              className="mt-4 flex cursor-pointer"
              onClick={() =>
                addSlide({
                  src: "/images/kunsttraject/kunstroute_map.jpg",
                  title: "Kunstroute",
                })
              }
            >
              <Image
                src="/images/kunsttraject/kunstroute_map.jpg"
                width={400}
                height={445}
                alt="kunsttroute"
                className="h-auto w-[400px] object-cover"
                onClick={() => setOpen(true)}
              />
            </div>
          </div>
        </div>
      </div>
      {slides.length > 0 && (
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          plugins={[Zoom, Captions]}
          zoom={{
            scrollToZoom: true,
            maxZoomPixelRatio: 5,
          }}
          slides={slides}
          carousel={{ finite: slides.length <= 1 }}
          // render={{
          //   buttonPrev: slides.length <= 1 ? () => null : undefined,
          //   buttonNext: slides.length <= 1 ? () => null : undefined,
          // }}
          styles={{ container: { backgroundColor: "rgba(0, 0, 0, 0.85)" } }}
        />
      )}
    </div>
  );
};

export default KunstEnCultuur;
