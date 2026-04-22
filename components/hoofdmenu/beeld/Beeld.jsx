"use client";
import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Image from "next/image";
import { useTranslations } from "next-intl";
import images from "../../../data/beeldToenEnNu.json";
import SectionHeader from "@/components/SectionHeader";

const Beeld = () => {
  const [open, setOpen] = useState(false);
  const [slides, setSlides] = useState([]);

  const t = useTranslations("beeld");

  const sortedImages = [...images].sort((a, b) => a.jaar - b.jaar); // Keep import array immutable -> [...copy_array_first]

  const addSlide = (imageObject) => {
    slides.length = 0;
    slides.push(imageObject);

    console.log(imageObject);
  };

  return (
    <>
      <div className="flex flex-row justify-center border-b-2 pb-8 text-4xl font-semibold tracking-[.04em] max-lg:flex-col max-lg:pb-4 max-lg:text-4xl max-lg:tracking-normal max-md:text-3xl max-xm:text-[22px] gap-2 max-lg:gap-0">
        <div className="flex justify-center">{t("titel")}</div>
        <div className="flex justify-center max-lg:text-[20px] max-xm:text-sm max-lg:font-normal">{t("1900heden")}</div>
      </div>

      {/* <div className="text-lg font-semibold tracking-wide mt-4">
        <div className="flex w-full items-center gap-2 rounded-md bg-yellow-700 border-b border-yellow-800 py-2 pl-4 text-white max-xsm:text-base">
          <span>{t("titel")}</span>
          <span className="max-xsm:hidden">{t("1900heden")}</span>
        </div>
      </div> */}
      <div className="mt-6 grid grid-cols-[repeat(auto-fill,_minmax(260px,_1fr))] gap-2 max-sm:mt-4">
        {sortedImages.map((image, index) => (
          <div
            key={index}
            className="relative h-[260px] border border-white"
            onClick={() => addSlide(image)}
          >
            <div className="relative h-full w-full">
              <Image
                src={image.src}
                alt={image.alt}
                height={100}
                width={300}
                priority="lazy"
                className="h-full w-full cursor-pointer object-cover px-4 pb-12 pt-4"
                onClick={() => setOpen(true)}
              />
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-white px-4 py-2 text-center text-sm font-semibold text-yellow-800">
              {image.info}
            </div>
          </div>
        ))}
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
    </>
  );
};

export default Beeld;
