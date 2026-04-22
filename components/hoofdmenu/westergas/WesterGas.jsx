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
      <div
        className="mx-auto mb-8 mt-4 flex max-h-[200px] w-full max-w-[620px] flex-col max-lg:max-w-full"
        onClick={() =>
          addSlide([
            { src: "/images/gashouder_1903.jpg", title: "Gashouder in 1903", width: 960, height: 640, description: "Oplevering van de gashouder in 1903" },
            { src: "/images/gashouder_rave.jpg", title: "Rave party 2021", width: 960, height: 580, description: "Awakenings Rave party in 2021" },
          ])
        }
      >
        <Image
          src="/images/gashouder.jpg"
          alt="Westergas"
          width={620}
          height={200}
          className="h-auto max-h-[200px] w-[620px] cursor-pointer object-cover max-lg:w-full"
          onClick={() => setOpen(true)}
        />
        <div className="flex">
          <span className="flex-1 py-1 text-[12px]">Gashouder in 1903</span>
          <span className="flex-1 justify-center py-1 pl-1 text-[12px]">
            Rave party 2021
          </span>
        </div>
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
