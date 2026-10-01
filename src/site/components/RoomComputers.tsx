"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { computers } from "../content";
import Doorway from "./Doorway";

const INTERVAL = 2600;

/**
 * Room 01 (from patterns/ProductShowcase): a spotlight plinth that swaps machines by itself while on screen.
 * Left: the room title + a model list whose active row fills like a loading bar.
 */
export default function RoomComputers() {
  const [{ i, prev }, setShow] = useState<{ i: number; prev: number | null }>({ i: 0, prev: null });
  const setI = (next: number | ((c: number) => number)) => setShow((s) => ({ i: typeof next === "function" ? next(s.i) : next, prev: s.i }));
  const ghost = useRef<HTMLImageElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const shot = useRef<HTMLImageElement>(null);
  const info = useRef<HTMLDivElement>(null);
  const it = computers.items[i];

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let visible = false;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.45 });
    io.observe(card.current!);
    const t = setInterval(() => visible && setI((c) => (c + 1) % computers.items.length), INTERVAL);
    return () => {
      clearInterval(t);
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    // calm cross-fade: the old machine drifts left and fades while the new one settles in from the right
    gsap.fromTo(shot.current, { opacity: 0, x: 40, scale: 0.97, filter: "blur(6px)" }, { opacity: 1, x: 0, scale: 1, filter: "blur(0px)", duration: 1.1, ease: "power2.out" });
    if (ghost.current) gsap.fromTo(ghost.current, { opacity: 1, x: 0 }, { opacity: 0, x: -40, duration: 0.7, ease: "power2.in" });
    gsap.fromTo(info.current!.children, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.55, stagger: 0.05, ease: "power2.out" });
  }, [i]);

  return (
    <Doorway zone="computers" photo={computers.photo} approach={1} focus={{ x: 0.74, y: 0.58 }}>
      <div
        data-record-time="0.9"
        data-record-align="center"
        data-record-align-mobile="top"
        data-record-offset-mobile="20"
        data-record-hold="2.8"
        data-record-label="Computers"
        className="container-x grid min-h-screen items-center gap-6 pb-[14vh] pt-[10vh] lg:grid-cols-[1fr_1.2fr] lg:gap-16 lg:pb-[16vh] lg:pt-[8vh]"
      >
        <div data-reveal className="text-backdrop">
          <p className="eyebrow mb-6">
            {computers.room} · {computers.title}
          </p>
          <h2 className="font-display text-[clamp(34px,4.2vw,68px)]">
            {computers.heading.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted lg:mt-6 lg:text-[16px]">{computers.text}</p>
          <ul className="mt-9 hidden border-t border-line lg:block">
            {computers.items.map((m, k) => (
              <li key={m.name}>
                <button onClick={() => setI(k)} className="relative flex w-full items-center justify-between gap-4 overflow-hidden border-b border-line py-3.5 text-left">
                  <span className={`text-[15px] transition-colors duration-500 ${k === i ? "font-semibold text-fg" : "text-muted"}`}>
                    <span className="mono mr-3 text-[12px] opacity-60">0{k + 1}</span>
                    {m.name} <span className="font-normal text-muted">· {m.kind}</span>
                  </span>
                  <span className="mono text-[13px] text-muted">{m.price}</span>
                  {k === i && <span key={`bar${i}`} className="spot-bar absolute bottom-0 left-0 h-[2px] w-full bg-[var(--glow)]" style={{ animationDuration: `${INTERVAL}ms` }} />}
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-7 hidden flex-wrap gap-2 lg:flex">
            {computers.chips.map((c) => (
              <span key={c} className="mono rounded-[3px] border border-line bg-surface/60 px-3 py-1.5 text-[12px]">
                {c}
              </span>
            ))}
          </div>
        </div>

        <div ref={card} data-reveal className="relative border border-line bg-surface/70 p-6 backdrop-blur-md md:p-9">
          <div className="flex items-center justify-between">
            <span className="mono text-[12px] text-muted">
              {String(i + 1).padStart(2, "0")} / {String(computers.items.length).padStart(2, "0")} · {it.kind}
            </span>
            {it.badge && <span className="mono rounded-[3px] bg-[var(--glow)] px-2.5 py-1 text-[12px] font-semibold text-[var(--glow-text)]">{it.badge}</span>}
          </div>
          <div className="relative my-3 flex h-[clamp(190px,28vh,400px)] lg:my-4 lg:h-[clamp(220px,38vh,400px)] items-center justify-center">
            <span className="absolute bottom-[4%] left-1/2 h-[18%] w-[78%] -translate-x-1/2 rounded-[50%] opacity-60 blur-2xl" style={{ background: "var(--glow)" }} />
            {prev !== null && prev !== i && (
              <img ref={ghost} key={`g${prev}-${i}`} src={computers.items[prev].image} alt="" aria-hidden className="absolute max-h-full max-w-[92%] object-contain" />
            )}
            <img ref={shot} key={it.image} src={it.image} alt={it.name} className="relative max-h-full max-w-[92%] object-contain drop-shadow-[0_30px_30px_rgba(10,22,51,.28)]" />
          </div>
          <div ref={info} className="flex flex-col gap-5 border-t border-line pt-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h3 className="font-display text-[clamp(26px,2.4vw,40px)]">{it.name}</h3>
              <ul className="mono mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-muted">
                {it.specs.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col items-start gap-3 md:items-end">
              <span className="tag">
                {it.price} <small>or {it.emi}</small>
              </span>
              <button 
                className="btn btn-solid !py-2.5"
                onClick={(e) => {
                  e.preventDefault();
                  if (shot.current) {
                    import('../cartStore').then(({ cartStore }) => {
                      cartStore.add(shot.current!.src, shot.current!.getBoundingClientRect(), it.name, it.price);
                    });
                  }
                }}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </Doorway>
  );
}
