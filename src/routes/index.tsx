import { createFileRoute } from "@tanstack/react-router";
import { SITE_LOGO_URL } from "@/lib/site-content/branding";

/** Home page — rendered from the database copy of the original markup. */
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dr. Husien Salama | Dentist in Baghdad — Saving Teeth" },
      { name: "description", content: "Dentist in Al-Mansour, Baghdad: root canal treatment, retreatment, broken instrument removal and lab-made e.max restorations at Clear Dental Care." },
      { property: "og:title", content: "Dr. Husien Salama | Dentist in Baghdad — Saving Teeth" },
      { property: "og:description", content: "Dentist in Al-Mansour, Baghdad: root canal treatment, retreatment, broken instrument removal and lab-made e.max restorations at Clear Dental Care." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "preload",
        as: "image",
        href: SITE_LOGO_URL,
        fetchPriority: "high",
      },
    ],
  }),
  server: {
    handlers: {
      GET: async ({ request }) => {
        const { renderSitePage } = await import("@/lib/site-content/render.server");
        return renderSitePage(request, "index");
      },
    },
  },
});
