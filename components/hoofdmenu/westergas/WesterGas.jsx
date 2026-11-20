"use client";
import React, { useState } from "react";
import westergasfabriek from "@/data/westergasfabriek.json";
import Image from "next/image";
import CategorySection from "./CategorySection";
import WestergasMenu from "./WestergasMenu";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";
import SectionHeader from "@/components/SectionHeader";
import { createSlides } from "@/components/Slides";
import LightBoxComponent from "@/components/LightBoxComponent";

const gashouder = [
  {
    src: "/images/gashouder_1903.jpg",
    alt: "Gashouder 1903",
    info: "Gashouder 1903",
    jaar: 1903,
    title: "Gashouder in 1903",
    description: "Oplevering van de gashouder in 1903",
  },
  {
    src: "/images/gashouder_rave.jpg",
    alt: "Rave party 2021",
    info: "Rave party 2021",
    jaar: 1903,
    title: "Rave party 2021",
    description: "Awakenings Rave party in 2021",
  },
];

const WesterGas = () => {
  const [open, setOpen] = useState(false);
  const [slides, setSlides] = useState([]);

  const categories = Object.fromEntries(
    westergasfabriek.map((item) => [item.category, item]),
  );

  const categoryNames = Object.keys(categories);

  const addSlide = (imageArray) => {
    const slideWithMetadata = imageArray.map((img) => ({
      src: img.src,
      width: img.width,
      height: img.height,
      title: img.title,
      description: img.description,
    }));

    const optimizedSlides = createSlides(slideWithMetadata);
    setSlides(optimizedSlides);
    setOpen(true);
  };

  return (
    <div className="mx-auto mt-8 w-full max-w-[620px] text-white max-xl:px-4 max-md:mt-4 max-sm:mt-4 max-xsm:px-2">
      <SectionHeader title="Westergas" />
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
      <div className="max-sm: mt-6 grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-2 max-sm:mt-4">
        <LightBoxComponent images={gashouder} height="auto" />
      </div>

      <div className="mx-auto flex max-w-[620px] flex-col gap-4 max-lg:max-w-full">
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
        plugins={[Zoom, Captions]}
        zoom={{
          scrollToZoom: true,
          maxZoomPixelRatio: 5,
        }}
        slides={slides}
        carousel={{ finite: slides.length <= 1 }}
        render={{
          buttonPrev: slides.length <= 1 ? () => null : undefined,
          buttonNext: slides.length <= 1 ? () => null : undefined,
        }}
        styles={{
          container: {
            backgroundColor: "rgba(0, 0, 0, 0.85)",
          },
          captionsTitle: {
            color: "#ffac3f",
            fontSize: "20px",
            fontWeight: "400",
          },
          captionsDescription: {
            color: "#ffac3f",
            fontSize: "16px",
            fontWeight: "400",
            textAlign: "center",
          },
        }}
      />
    </div>
  );
};

export default WesterGas;
