/* From: https://github.com/chrismwilliams/astro-theme-cactus/blob/main/astro.config.ts */
import fs from "fs";

/**
 * Returns a Vite plugin configuration object for handling raw fonts.
 * @param {string[]} ext An array of file extensions to handle.
 * @returns {import('vite').Plugin} The Vite plugin configuration object.
 */

export function rawFonts(ext) {
  return {
    name: "vite-plugin-raw-fonts",
    transform(_, id) {
      if (ext.some((e) => id.endsWith(e))) {
        const buffer = fs.readFileSync(id);
        return {
          code: `export default ${JSON.stringify(buffer)}`,
          map: null,
        };
      }
    },
  };
}
