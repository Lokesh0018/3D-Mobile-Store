"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { neon } from "../content";
import Doorway from "./Doorway";

const STEP = 1300; // ms each tile stays lit

/**
 * Room 03 "Neon bento" (custom; idea from bento grids with a border beam + card spotlight, built here with CSS):
 * dark glass tiles over the darkened neon room. The TV is the big tile; the tiles light up one after another
 * by themselves while on screen (beam round the edge + a spotlight sweeping over it). Hover lights one by hand.
 * Laptop: TV spans two rows on the left, 2×2 on the right. Phone: TV on top, then 2×2.
 */
export default function RoomNeon() {
  const [lit, setLit] = useState(0);
  const grid = useRef<HTMLDivElement>(null);
  const hovering = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let visible = false;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.35 });
    io.observe(grid.current!);
    const t = setInterval(() => visible && !hovering.current && setLit((a) => (a + 1) % neon.items.length), STEP);
    return () => {
      clearInterval(t);
      io.disconnect();
    };
  }, []);

  // the spotlight sweeps across the tile that just lit up
  useEffect(() => {
    if (prefersReducedMotion() || hovering.current) return;
    const tile = grid.current?.children[lit] as HTMLElement | undefined;
    if (tile) gsap.fromTo(tile, { "--mx": "10%", "--my": "15%" }, { "--mx": "85%", "--my": "75%", duration: STEP / 1000 + 0.6, ease: "sine.inOut" });
  }, [lit]);

  const follow = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <Doorway zone="neon" photo={neon.photo} approach={0.9} shade="linear-gradient(180deg, rgba(12,6,26,.72), rgba(12,6,26,.5) 45%, rgba(12,6,26,.78))">
      <div className="container-x flex min-h-screen flex-col justify-center gap-8 pb-[14vh] pt-[10vh] text-[#f3edff]">
        <div data-reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-4 !text-[#c9bde6]">
              {neon.room} · {neon.title}
            </p>
            <h2 className="font-display text-[clamp(44px,6vw,104px)] [text-shadow:0_0_40px_rgba(181,108,255,.55)]">{neon.heading[0]}</h2>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-[#c9bde6]">{neon.text}</p>
        </div>

        <div
          ref={grid}
          data-reveal="stagger"
          data-record-time="0.9"
          data-record-offset="-250"
          data-record-offset-mobile="-60"
          data-record-hold="3.3"
          data-record-label="Neon bento"
          className="grid grid-cols-2 gap-3 lg:h-[min(58vh,540px)] lg:grid-cols-[1.35fr_1fr_1fr] lg:grid-rows-2"
          onMouseLeave={() => (hovering.current = false)}
        >
          {neon.items.map((it, k) => {
            const big = k === 0;
            return (
              <article
                key={it.name}
                onMouseEnter={() => {
                  hovering.current = true;
                  setLit(k);
                }}
                onMouseMove={follow}
                data-cursor="Try it"
                className={`beam relative overflow-hidden rounded-[6px] border border-white/10 bg-[#140a2a]/55 backdrop-blur-md ${lit === k ? "is-on" : ""} ${big ? "col-span-2 h-[270px] md:h-[340px] lg:col-span-1 lg:row-span-2 lg:h-auto" : "h-[200px] md:h-[230px] lg:h-auto"}`}
              >
                <span className="spotlight pointer-events-none absolute inset-0 z-[1]" />
                {big && <span className="absolute left-1/2 top-[42%] h-[48%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[#b56cff]/45 blur-3xl" />}
                <img
                  src={it.image}
                  alt={it.name}
                  className={`absolute z-[2] object-contain drop-shadow-[0_18px_30px_rgba(0,0,0,.55)] transition-transform duration-700 ease-out ${
                    big ? "left-1/2 top-[40%] w-[86%] -translate-x-1/2 -translate-y-1/2" : "bottom-[10%] right-[6%] h-[58%] w-auto max-w-[52%]"
                  } ${lit === k ? (big ? "scale-[1.03]" : "-translate-y-1.5") : ""}`}
                />
                <div className={`absolute z-[2] flex flex-col ${big ? "bottom-6 left-6 right-6 md:bottom-8 md:left-8" : "left-4 top-4 bottom-4 max-w-[55%] md:left-5 md:top-5"}`}>
                  <p className="mono text-[12px] text-[#c9bde6]">{it.kind}</p>
                  <h3 className={`font-display mt-1.5 ${big ? "text-[clamp(28px,2.8vw,46px)]" : "text-[clamp(18px,1.5vw,24px)]"}`}>{it.name}</h3>
                  <p className={`mono mt-1.5 text-[12px] leading-snug text-[#f3edff]/75 ${big ? "" : "hidden md:block"}`}>{it.specs[0]}</p>
                  <span className={`tag !bg-white !text-[#0f0820] ${big ? "mt-4 self-start" : "mt-auto self-start"}`}>
                    {it.price} {big && it.emi && <small>or {it.emi}</small>}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </Doorway>
  );
}
