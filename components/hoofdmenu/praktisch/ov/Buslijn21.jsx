"use client";
import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Image from "next/image";

const Buslijn21 = () => {
  const [open, setOpen] = useState(false);

  const slides = [
    {
      src: `/images/lijn21.png`,
      title: "GVB Buslijn 21",
      description: "Route buslijn 21 met haltes",
    },
  ];

  return (
    <div>
      <div className="mb-4 h-auto max-w-[330px] max-xsm:max-w-full">
        <Image
          src={"/images/lijn21.png"}
          width={330}
          height={0}
          alt=""
          className="h-full w-full cursor-pointer border-4 object-cover"
          onClick={() => setOpen(true)}
        />
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
            backgroundColor: "rgb(66, 32, 6, 0.8)",
          },
        }}
      />
    </div>
  );
};

export default Buslijn21;
