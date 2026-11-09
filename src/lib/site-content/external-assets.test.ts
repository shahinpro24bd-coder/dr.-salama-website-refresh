import { describe, expect, it } from "vitest";
import indexHtml from "../../site/index.html?raw";
import fallback from "./fallback.generated.json?raw";

const PUBLIC_ASSET_HOST = "https://id-preview--f35a7838-7647-49c8-b99b-c0f08d8b3387.lovable.app";

function expectPublicAssetUrls(source: string, expectedCount: number) {
  const urls = source.match(/https:\/\/id-preview--f35a7838-7647-49c8-b99b-c0f08d8b3387\.lovable\.app\/__l5e\/assets-v1\/[a-f0-9-]+\/[A-Za-z0-9._-]+/g) || [];
  expect(urls).toHaveLength(expectedCount);
  expect(urls.every((url) => url.startsWith(`${PUBLIC_ASSET_HOST}/__l5e/assets-v1/`))).toBe(true);
  expect(source).not.toContain('"/__l5e/assets-v1/');
}

describe("externally deployed media", () => {
  it("uses public absolute URLs for every Reel thumbnail and video", () => {
    // 6 posters + 6 videos in the page, 6 poster image slots in the snapshot.
    expectPublicAssetUrls(indexHtml, 12);
    expectPublicAssetUrls(fallback, 6);
  });
});
