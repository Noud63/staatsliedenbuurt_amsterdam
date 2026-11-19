import React,{useState} from "react";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Image from "next/image";

const LightBoxComponent = ({images}) => {
  const [open, setOpen] = useState(false);
  const [slides, setSlides] = useState([]);

  const addSlide = (imageObject) => {
    slides.length = 0;
    slides.push(imageObject);

    console.log(imageObject);
  };
  return (
    <>
      {images.map((image, index) => (
        <div
          key={index}
          className="relative  border border-white"
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
    </>
  );
};

export default LightBoxComponent;
