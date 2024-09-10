import satori, { type SatoriOptions } from "satori";
import { Resvg } from "@resvg/resvg-js";
import { type CollectionEntry } from "astro:content";
import postOgImage from "./post";
import siteOgImage from "./site";
import { getIconCode, loadEmoji } from "./twemoji";
import { siteConfig } from "@config";

const fetchFonts = async () => {
  // Regular Font
  const fontFileRegular = await fetch(
    `${siteConfig.url}fonts/zcool-kuaile-chinese-simplified-400-normal.woff`,
  );
  const fontRegular: ArrayBuffer = await fontFileRegular.arrayBuffer();

  return { fontRegular };
};

const { fontRegular } = await fetchFonts();

const options: SatoriOptions = {
  width: 1200,
  height: 630,
  embedFont: true,
  fonts: [
    {
      name: "ZCOOL KuaiLe",
      data: fontRegular,
      weight: 400,
      style: "normal",
    },
  ],
  loadAdditionalAsset: async (code: string, segment: string) => {
    if (code === "emoji") {
      // if segment is an emoji
      return (
        `data:image/svg+xml;base64,` +
        btoa(await loadEmoji("twemoji", getIconCode(segment)))
      );
    }

    // if segment is normal text
    return (
      `data:image/svg+xml;base64,` + btoa(await loadEmoji("twemoji", "1f92f"))
    );
  },
};

function svgBufferToPngBuffer(svg: string) {
  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  return pngData.asPng();
}

export async function generateOgImageForPost(post: CollectionEntry<"posts">) {
  const svg = await satori(postOgImage(post), options);
  return svgBufferToPngBuffer(svg);
}

export async function generateOgImageForSite() {
  const svg = await satori(siteOgImage(), options);
  return svgBufferToPngBuffer(svg);
}
