const images = [
  {
    src: "/images/gashouder_1903.jpg",
    width: 960,
    height: 640,
    title: "Gashouder in 1903"
  },
  {
    src: "/images/gashouder_rave.jpg",
    width: 960,
    height: 580,
    title: "Rave party 2021"
  },
];

const imageSizes = [16, 32, 48, 64, 96, 128, 256, 384];
const deviceSizes = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];

function nextImageUrl(src, size) {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${size}&q=75`;
}

const slides = images.map(({ src, width, height, title }) => ({
  width,
  height,
  title: title,
  src: nextImageUrl(src, width),
  srcSet: [...imageSizes, ...deviceSizes]
    .filter((size) => size <= width)
    .map((size) => ({
      src: nextImageUrl(src, size),
      width: size,
      height: Math.round((height / width) * size)
    })),
}));

export default slides;
       