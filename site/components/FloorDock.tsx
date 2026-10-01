"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion, ScrollTrigger } from "@/lib/gsap";
import { zones, zoneById, type ZoneId } from "../zones";
import { currentZone, onZoneChange } from "./RoomLights";

/**
 * Floor-directory dock (N7): a dark bar at the bottom, like the signs in a store.
 * "You are in: <room>" + the six stops; the current one lights up in that room's colour with a sliding pill.
 * Appears once you are through the front doors. Phone: current room + "Floor map" sheet.
 */
export default function FloorDock() {
  const [zone, setZone] = useState<ZoneId>("entrance");
  const [open, setOpen] = useState(false);
  const bar = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const pill = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setZone(currentZone());
    return onZoneChange(setZone);
  }, []);

  // Show after the hero (always visible with ?static=1)
  useEffect(() => {
    if (prefersReducedMotion()) return;
    gsap.set(bar.current, { yPercent: 160, opacity: 0 });
    const st = ScrollTrigger.create({
      trigger: "#entrance",
      start: "bottom 120%",
      onEnter: () => gsap.to(bar.current, { yPercent: 0, opacity: 1, duration: 0.7, ease: "power3.out" }),
      onLeaveBack: () => gsap.to(bar.current, { yPercent: 160, opacity: 0, duration: 0.5, ease: "power2.in" }),
    });
    return () => st.kill();
  }, []);

  // Slide the pill to the active stop
  useLayoutEffect(() => {
    const btn = list.current?.querySelector<HTMLElement>(`[data-stop="${zone}"]`);
    if (!btn || !pill.current) return;
    const z = zoneById(zone).vars;
    gsap.to(pill.current, {
      x: btn.offsetLeft,
      width: btn.offsetWidth,
      backgroundColor: z["--glow"],
      duration: prefersReducedMotion() ? 0 : 0.6,
      ease: "power3.inOut",
    });
    list.current!.querySelectorAll<HTMLElement>("[data-stop]").forEach((el) => {
      el.style.color = el.dataset.stop === zone ? z["--glow-text"] : "";
    });
  }, [zone]);

  const z = zoneById(zone);

  return (
    <>
      <div ref={bar} className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4">
        <nav aria-label="Floor directory" className="flex items-center gap-2 rounded-[10px] border border-white/10 bg-[#0c0f14]/92 p-1.5 text-white shadow-[0_20px_50px_-20px_rgba(0,0,0,.6)] backdrop-blur-md">
          <div className="flex min-w-[150px] items-center gap-3 px-3 py-1">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full transition-colors duration-700" style={{ background: z.vars["--glow"], boxShadow: `0 0 14px ${z.vars["--glow"]}` }} />
            <span className="flex flex-col leading-tight">
              <span className="mono text-[12px] tracking-[0.18em] text-white/55 uppercase">You are in</span>
              <span className="text-[13px] font-semibold whitespace-nowrap">{z.room ? `${z.room.replace("Room ", "")} · ${z.short}` : z.short}</span>
            </span>
          </div>
          <div ref={list} className="relative hidden items-center lg:flex">
            <span ref={pill} className="absolute left-0 top-0 h-full rounded-[6px]" style={{ width: 0 }} />
            {zones.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                data-stop={s.id}
                className="mono relative z-[1] px-3.5 py-2.5 text-[12px] whitespace-nowrap text-white/70 transition-colors duration-500 hover:text-white"
              >
                {s.room && <span className="mr-1.5 opacity-60">{s.room.replace("Room ", "")}</span>}
                {s.short}
              </a>
            ))}
          </div>
          <button
            onClick={() => setOpen(true)}
            className="mono rounded-[6px] bg-white/10 px-3.5 py-2.5 text-[12px] whitespace-nowrap lg:hidden"
          >
            Floor map
          </button>
        </nav>
      </div>

      {/* Phone / tablet: full-screen floor map */}
      <div
        className={`fixed inset-0 z-[70] flex flex-col bg-[#0c0f14] px-6 pb-10 pt-6 text-white transition-[opacity,visibility] duration-500 lg:hidden ${open ? "visible opacity-100" : "invisible opacity-0"}`}
      >
        <div className="flex items-center justify-between">
          <span className="mono text-[12px] tracking-[0.18em] text-white/55 uppercase">Floor map · Ground floor</span>
          <button onClick={() => setOpen(false)} className="mono rounded-[6px] bg-white/10 px-3.5 py-2 text-[12px]">
            Close
          </button>
        </div>
        <ul className="mt-auto flex flex-col gap-1">
          {zones.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={() => setOpen(false)}
                className="flex items-center gap-4 border-b border-white/10 py-4"
              >
                <span className="h-3 w-3 rounded-full" style={{ background: s.vars["--glow"] }} />
                <span className="font-display text-[26px]">{s.short}</span>
                {s.id === zone ? (
                  <span className="mono ml-auto whitespace-nowrap text-[12px] text-[#ff5a1f]">You are here</span>
                ) : (
                  s.room && <span className="mono ml-auto whitespace-nowrap text-[12px] text-white/50">{s.room}</span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
