"use client";

import { useEffect } from "react";
import { gsap, prefersReducedMotion, ScrollTrigger } from "@/lib/gsap";
import { zoneById, zones, type ZoneId } from "../zones";
import { onReveal } from "./CircuitLoader";

// THE SIGNATURE: the whole page takes the light of the room you are in.
// Every element with data-zone-start="<zone>" is a point on the floor; when it crosses the middle of the
// screen, the colour variables on <html> fade to that zone and a "room:change" event tells the dock.

let current: ZoneId = "entrance";
let dock: ZoneId = "entrance";
export const currentZone = () => dock;

/** The dock follows "room:change"; it can lag behind the colours (the light switches early, the label when the section starts). */
export function onZoneChange(fn: (id: ZoneId) => void) {
  const h = (e: Event) => fn((e as CustomEvent<ZoneId>).detail);
  window.addEventListener("room:change", h);
  return () => window.removeEventListener("room:change", h);
}

function setZone(id: ZoneId, instant = false) {
  if (id === current && !instant) return;
  current = id;
  const vars = zoneById(id).vars;
  gsap.to(document.documentElement, { ...vars, duration: instant ? 0 : 1.3, ease: "power2.inOut", overwrite: "auto" });
}

function setDock(id: ZoneId, instant = false) {
  if (id === dock && !instant) return;
  dock = id;
  document.documentElement.dataset.dock = id; // e.g. the offer ticker only shows from the Deals section on (site.css)
  window.dispatchEvent(new CustomEvent("room:change", { detail: id }));
}

export default function RoomLights() {
  useEffect(() => {
    // ?static=1: no scroll switching; every zone block simply wears its own colours (layout review)
    if (prefersReducedMotion()) {
      document.querySelectorAll<HTMLElement>("[data-zone]").forEach((el) => {
        const vars = zoneById(el.dataset.zone as ZoneId).vars;
        Object.entries(vars).forEach(([k, v]) => el.style.setProperty(k, v));
      });
      return;
    }

    setZone("entrance", true);
    setDock("entrance", true);
    // Points on the floor, in page order: data-zone-start="<zone>" switches the light (and the dock, unless
    // data-dock says otherwise); data-dock-start="<zone>" only moves the dock.
    const points = Array.from(document.querySelectorAll<HTMLElement>("[data-zone-start], [data-dock-start]"));
    const states: { light: ZoneId; dock: ZoneId }[] = [];
    points.forEach((el, i) => {
      const prev = states[i - 1] ?? { light: "entrance", dock: "entrance" };
      const light = (el.dataset.zoneStart as ZoneId) ?? prev.light;
      const d = (el.dataset.dockStart ?? el.dataset.dock ?? el.dataset.zoneStart) as ZoneId;
      states.push({ light, dock: d });
    });
    const apply = (st: { light: ZoneId; dock: ZoneId }) => {
      setZone(st.light);
      setDock(st.dock);
    };
    const triggers = points.map((el, i) =>
      ScrollTrigger.create({
        trigger: el,
        start: "top 55%",
        onEnter: () => apply(states[i]),
        onLeaveBack: () => apply(states[i - 1] ?? { light: "entrance", dock: "entrance" }),
      }),
    );
    // Pinned sections (the phone shelf) set their height in their own effects, and fonts/images shift the
    // layout: measure every trigger again once the doors have opened and the fonts are in.
    const refresh = () => ScrollTrigger.refresh();
    const off = onReveal(refresh);
    document.fonts.ready.then(refresh);
    window.addEventListener("load", refresh);
    return () => {
      off();
      window.removeEventListener("load", refresh);
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return null;
}

export { zones };
