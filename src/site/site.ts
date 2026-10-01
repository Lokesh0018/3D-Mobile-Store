import type { SiteMeta, Theme } from "@/lib/site";

// Settings for THIS site: Circuit Square, a (concept) electronics showroom in Hyderabad. Direction: site/DESIGN.md.
// The room colours live in site/zones.ts: RoomLights fades these variables to them as you walk through each doorway.

export const meta: SiteMeta = {
  name: "Circuit Square",
  title: "Circuit Square — Walk in. Every gadget, one floor.",
  description:
    "Hyderabad's brightest electronics showroom: laptops, phones, audio, TVs and gaming, all switched on to try. No-cost EMI, exchange deals and same-day setup.",
  loaderText: "CIRCUIT SQUARE",
  loader: false, // site/components/CircuitLoader.tsx replaces the engine loader
  // ?record=1 uses the section timeline (data-record-* on the sections, docs/RECORDING.md): 40.9 s + the 2.5 s loader.
  // duration is only the fallback for constant-speed mode.
  record: { duration: 41 },
};

export const theme: Theme = {
  bg: "#f3f4f6",
  surface: "#ffffff",
  text: "#0c0f14",
  muted: "#596070",
  accent: "#ff5a1f",
  accentText: "#0c0f14",
  line: "#dfe2e8",
  fontDisplay: "'Unbounded Variable', 'Unbounded', system-ui, sans-serif",
  fontBody: "'Plus Jakarta Sans Variable', 'Plus Jakarta Sans', system-ui, sans-serif",
  radius: 4,
  uppercaseHeadings: false,
  heroText: "#ffffff",
};
