import { describe, expect, it } from "vitest";
import indexHtml from "../../site/index.html?raw";
import reelsScript from "../../../public/js/reels.js?raw";

// Reels from Dr. Husien Salama's Instagram (@dr.husien.salama).
const REELS = ["DfaCG4eHHc1", "De9m5n-CTLt", "DfPgMMREtMS", "DfSdzD6IeUV", "DYnCnTSI8Ca", "DZiCENssEYe"];

describe("home Reel gallery", () => {
  it("ships all six Reels as click-to-load posters linking to Instagram", () => {
    for (const reel of REELS) {
      expect(indexHtml).toContain(`data-reel-play="${reel}"`);
      expect(indexHtml).toContain(`https://www.instagram.com/reel/${reel}/`);
    }
    expect(indexHtml.match(/data-reel-play=/g)).toHaveLength(6);
  });

  it("plays every Reel directly from its own video file", () => {
    for (const reel of REELS) {
      const button = indexHtml.match(new RegExp(`<button[^>]+data-reel-play="${reel}"[^>]*>`))?.[0];
      expect(button).toContain(`data-reel-src=`);
      expect(button).toContain(`.mp4`);
    }
    expect(indexHtml.match(/data-reel-src=/g)).toHaveLength(6);
    expect(indexHtml).not.toMatch(/<iframe[^>]+instagram\.com/i);
    expect(reelsScript).toContain('document.createElement("video")');
    expect(indexHtml).toContain('src="js/reels.js"');
  });
});
