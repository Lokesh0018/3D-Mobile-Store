// The showroom's "rooms". Each zone is a full set of page colours; RoomLights fades the CSS variables
// on <html> to the zone you are in, so the whole page takes that room's light.

export type ZoneId = "entrance" | "computers" | "phones" | "neon" | "deals" | "visit";

export type Zone = {
  id: ZoneId;
  /** Label in the floor dock */
  label: string;
  short: string;
  /** "Room 01" etc. (rooms only) */
  room?: string;
  vars: {
    "--bg": string;
    "--surface": string;
    "--text": string;
    "--muted": string;
    "--line": string;
    /** the room's light colour (dock pill, door frame, glows) */
    "--glow": string;
    /** readable text on top of --glow */
    "--glow-text": string;
  };
};

const showroom: Zone["vars"] = {
  "--bg": "#f3f4f6",
  "--surface": "#ffffff",
  "--text": "#0c0f14",
  "--muted": "#596070",
  "--line": "#dfe2e8",
  "--glow": "#ff5a1f",
  "--glow-text": "#0c0f14",
};

export const zones: Zone[] = [
  { id: "entrance", label: "Entrance", short: "Entrance", vars: showroom },
  {
    id: "computers",
    label: "Computers",
    short: "Computers",
    room: "Room 01",
    vars: { "--bg": "#e6efff", "--surface": "#f7faff", "--text": "#0a1633", "--muted": "#4a5a7a", "--line": "#c9d8f5", "--glow": "#2f6bff", "--glow-text": "#ffffff" },
  },
  {
    id: "phones",
    label: "Phones & tablets",
    short: "Phones",
    room: "Room 02",
    vars: { "--bg": "#fbf4e8", "--surface": "#fffdf8", "--text": "#1f1710", "--muted": "#6d5d4b", "--line": "#eadcc4", "--glow": "#f0b25a", "--glow-text": "#1f1710" },
  },
  {
    id: "neon",
    label: "Audio, TV & gaming",
    short: "Audio & TV",
    room: "Room 03",
    vars: { "--bg": "#0f0820", "--surface": "#1a1033", "--text": "#f3edff", "--muted": "#a99cc8", "--line": "#34265a", "--glow": "#b56cff", "--glow-text": "#0f0820" },
  },
  { id: "deals", label: "Deals & top picks", short: "Deals", vars: showroom },
  { id: "visit", label: "Visit the store", short: "Visit", vars: showroom },
];

export const zoneById = (id: ZoneId) => zones.find((z) => z.id === id)!;

/** Inline style that gives one element a zone's colours (used for ?static=1 review and fixed-colour bits). */
export const zoneStyle = (id: ZoneId) => zoneById(id).vars as unknown as React.CSSProperties;
