"use client"
import React, {useState} from 'react'
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Image from 'next/image';

const Tramlijn19 = () => {

    const [open, setOpen] = useState(false);

     const slides = [
       {
         src: `/images/tram_lijn_5.png`,
         title: "GVB Tramlijn 5",
         description: "Route tramlijn 5 met haltes",
       },
     ];

  return (
    <div>
      <div className="mb-4 h-auto max-w-[330px] max-xsm:max-w-full">
        <Image
          src={"/images/tram_lijn_5.png"}
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
}

export default Tramlijn19
