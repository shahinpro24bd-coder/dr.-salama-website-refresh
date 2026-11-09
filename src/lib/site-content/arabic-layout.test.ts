import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { isolateLtrRuns, renderPage } from "./transform";

const fallback = JSON.parse(
  fs.readFileSync(path.join(__dirname, "fallback.generated.json"), "utf8"),
) as { langs: { en: Record<string, string>; ar: Record<string, string> } };

describe("Arabic right-to-left rendering", () => {
  it("keeps phone numbers and the Instagram handle in their real order", () => {
    expect(isolateLtrRuns("الهاتف: 0774 444 4992")).toBe("الهاتف: \u20660774 444 4992\u2069");
    expect(isolateLtrRuns("تابع @dr.husien.salama")).toBe("تابع \u2066@dr.husien.salama\u2069");
  });

  it("does not wrap the same number twice", () => {
    const once = isolateLtrRuns("0774 444 4992");
    expect(isolateLtrRuns(once)).toBe(once);
  });

  it("serves Arabic pages right-to-left with isolated numbers, English left-to-right untouched", () => {
    const html = "<html><head></head><body><p>0774 444 4992</p></body></html>";
    const ar = renderPage(html, { texts: {}, images: {}, lang: "ar" });
    expect(ar).toContain('dir="rtl"');
    expect(ar).toContain("\u20660774 444 4992\u2069");
    const en = renderPage(html, { texts: {}, images: {}, lang: "en" });
    expect(en).toContain('dir="ltr"');
    expect(en).not.toContain("\u2066");
  });

  it("loads the Arabic layout styles on every page", () => {
    for (const page of ["index", "about", "service", "appoinment", "contact"]) {
      const html = fs.readFileSync(path.join(__dirname, "../../site", `${page}.html`), "utf8");
      expect(html, page).toContain('href="/rtl.css"');
    }
  });
});

describe("Spelling", () => {
  it("uses one English spelling style (no British variants)", () => {
    const all = Object.values(fallback.langs.en).join(" ");
    for (const word of ["practising", "sterilised", "Sterilisation", "coloured", "travelled"]) {
      expect(all, word).not.toContain(word);
    }
  });

  it("keeps Arabic copy in formal Arabic, not dialect", () => {
    const all = Object.values(fallback.langs.ar).join(" ");
    expect(all).not.toMatch(/(^|\s)مو\s/);
    expect(all).not.toContain("مو بس");
    expect(all).not.toContain("بوقته");
    expect(all).not.toContain("قبل و ");
  });
});
