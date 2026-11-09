import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const pages = ["index", "about", "service", "appoinment", "contact"];
const read = (p: string) => readFileSync(resolve(process.cwd(), `src/site/${p}.html`), "utf8");

describe("Dr. Husien Salama contact details", () => {
  it("sends every booking form to the clinic WhatsApp 0774 444 4992", () => {
    for (const p of ["appoinment", "contact"]) {
      const html = read(p);
      expect(html).toContain('const phoneNumber = "9647744444992"');
    }
  });

  it("never links to the previous site's phone numbers", () => {
    for (const p of pages) {
      expect(read(p)).not.toContain("972532815272");
    }
  });

  it("links both clinic phone numbers for calling", () => {
    const all = pages.map(read).join("\n");
    expect(all).toContain("tel:+9647744444992");
    expect(all).toContain("tel:+9647844444992");
  });

  it("points every Instagram profile link to @dr.husien.salama", () => {
    const all = pages.map(read).join("\n");
    const profiles = all.match(/https:\/\/www\.instagram\.com\/(?!reel\/)[^"'\s]*/g) ?? [];
    expect(profiles.length).toBeGreaterThan(0);
    for (const url of profiles) expect(url).toBe("https://www.instagram.com/dr.husien.salama/");
  });
});
