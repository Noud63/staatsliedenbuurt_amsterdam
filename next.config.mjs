import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();

const allowedHostnames = [
  "lh3.googleusercontent.com",
  "res.cloudinary.com",
  "openweathermap.org",
  "image.buienradar.nl",
  "platform-lookaside.fbsbx.com",
  "avatars.githubusercontent.com",
  "shorturl.at",
  "amsterdamflavours.com",
  "static.wixstatic.com",
  "barcoco.nl",
  "jamhoreca.nl",
  "ik.imagekit.io",
  "djn5iqj8vm44t.cloudfront.net",
  "image.parool.nl",
  "www.dewestkrant.nl",
  "espressofabriek.nl",
  "slowfood.nl",
  "www.ketelhuis.nl",
  "www.fabrique-lumieres.com",
  "framerusercontent.com",
  "image.volkskrant.nl",
  "cdn.sanity.io",
  "cdn.amsterdam-dance-event.nl",
  "media.heerlijk.nl",
  "www.amsterdam.nl",
  "www.comedytrain.nl",
  "mindtrip.ai",
  "www.milkshakefestival.com",
  "esjaw2wge86.exactdn.com"
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: allowedHostnames.map((hostname) => ({
      protocol: "https",
      hostname,
      port: "",
      pathname: "**",
    })),
  },
};

export default withNextIntl(nextConfig);
