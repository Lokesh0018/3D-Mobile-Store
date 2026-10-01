"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useFramePlayer } from "@/components/engine/useFramePlayer";
import { hero } from "../content";
import { onReveal } from "./CircuitLoader";

// Frame size of /frames/circuit-doors and where the blank glowing sign sits in its first frame (px).
const FRAME = { w: 1920, h: 1080 };
const SIGN = { x: 456, y: 128, w: 1008, h: 152 };

/**
 * H2 fly-through (from patterns/FrameHero): the glass doors slide open and the camera glides into the
 * showroom as you scroll. The store name is placed on the video's blank sign, then fades as we walk in.
 * Captions sit on white "store sign" plates so they read on the dark forecourt and the bright floor alike.
 */
export default function DoorsHero() {
  const outer = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const sign = useRef<HTMLDivElement>(null);
  const intro = useRef<HTMLDivElement>(null);
  const shade = useRef<HTMLDivElement>(null);
  const hint = useRef<HTMLDivElement>(null);
  const player = useFramePlayer(hero.frames, canvas);
  const length = 4.2;

  // Keep the name glued to the sign (same maths as the canvas "cover" fit)
  useEffect(() => {
    const place = () => {
      const el = sign.current;
      const box = canvas.current?.getBoundingClientRect();
      if (!el || !box) return;
      const s = Math.max(box.width / FRAME.w, box.height / FRAME.h);
      const ox = (box.width - FRAME.w * s) / 2;
      const oy = (box.height - FRAME.h * s) / 2;
      const left = Math.max(0, ox + SIGN.x * s);
      const right = Math.min(box.width, ox + (SIGN.x + SIGN.w) * s);
      el.style.left = `${left}px`;
      el.style.width = `${right - left}px`;
      el.style.top = `${oy + SIGN.y * s}px`;
      el.style.height = `${SIGN.h * s}px`;
      el.style.fontSize = `${Math.min(SIGN.h * s * 0.36, ((right - left) * 0.86) / 11.5)}px`;
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) {
      player.current.seek(0);
      return;
    }
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: outer.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          onUpdate: (self) => player.current.seek(self.progress),
        },
      });
      tl.to({}, { duration: 1 });
      tl.to(sign.current, { opacity: 0, scale: 1.08, duration: 0.07, ease: "none" }, 0.02);
      tl.to(intro.current, { opacity: 0, y: -50, duration: 0.1, ease: "none" }, 0.03);
      tl.to(shade.current, { opacity: 0, duration: 0.12, ease: "none" }, 0.04);
      tl.to(hint.current, { opacity: 0, duration: 0.04 }, 0.01);
      hero.captions.forEach((c, i) => {
        const el = outer.current!.querySelector(`[data-caption="${i}"]`);
        const d = 0.2;
        tl.fromTo(el, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: d * 0.3, ease: "power2.out" }, c.at);
        if (i < hero.captions.length - 1) tl.to(el, { opacity: 0, y: -30, duration: d * 0.25, ease: "power2.in" }, c.at + d * 0.75);
      });
    }, outer);

    const off = onReveal(() => {
      gsap.from(intro.current!.querySelectorAll(".hero-line > span"), { yPercent: 110, duration: 1.1, ease: "power4.out", stagger: 0.1 });
      gsap.from(intro.current!.querySelectorAll("[data-hero-fade]"), { opacity: 0, y: 24, duration: 0.9, delay: 0.35, stagger: 0.1, ease: "power3.out" });
      gsap.from(sign.current!.querySelectorAll("span"), { opacity: 0, duration: 1.2, delay: 0.2, stagger: 0.04, ease: "power1.out" });
    });

    return () => {
      off();
      ctx.revert();
    };
  }, [player]);

  return (
    <section ref={outer} id="entrance" data-zone="entrance" data-record-time="0" data-record-hold="0.8" data-record-label="Hero" className="relative" style={{ height: `${length * 100}vh` }}>
      <div data-record-time="4.2" data-record-align="bottom" data-record-label="Hero: inside" className="absolute bottom-0 left-0 h-px w-px" />
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0c0f14] text-white">
        {/* Poster image that acts as a loading state before the canvas draws frames */}
        <img src="/frames/circuit-doors/frame_0001.webp" alt="Circuit Square Entrance" className="absolute inset-0 h-full w-full object-cover blur-sm" />
        <canvas ref={canvas} className="absolute inset-0 h-full w-full" />

        {/* the store name on the video's blank sign */}
        <div ref={sign} className="font-display pointer-events-none absolute flex items-center justify-center overflow-hidden whitespace-nowrap text-[#1a1d24]/85" style={{ letterSpacing: "0.08em" }}>
          {hero.sign.split("").map((ch, i) => (
            <span key={i}>{ch === " " ? " " : ch}</span>
          ))}
        </div>

        <div ref={shade} className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgba(8,10,14,.82)_0%,rgba(8,10,14,.35)_38%,transparent_60%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[16vh] bg-[linear-gradient(0deg,var(--bg),transparent)]" />

        {/* Intro */}
        <div ref={intro} className="container-x absolute inset-x-0 bottom-[max(9vh,96px)] md:bottom-[max(9vh,56px)]">
          <p data-hero-fade className="eyebrow mb-5 !text-white/75">
            {hero.eyebrow}
          </p>
          <h1 className="font-display text-[clamp(52px,8.4vw,150px)]">
            {hero.title.map((line, i) => (
              <span key={i} className="hero-line block overflow-hidden pb-[0.08em]">
                <span className="block">{line}</span>
              </span>
            ))}
          </h1>
          <div className="mt-6 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p data-hero-fade className="max-w-md text-[clamp(15px,1.15vw,18px)] leading-relaxed text-white/85">
                {hero.subtitle}
              </p>
              <div data-hero-fade className="mt-7 flex flex-wrap gap-3">
                <a href={hero.buttons[0].href} className="btn btn-solid">
                  {hero.buttons[0].label} <span aria-hidden>↓</span>
                </a>
                <a href={hero.buttons[1].href} className="btn btn-outline !text-white">
                  {hero.buttons[1].label}
                </a>
              </div>
            </div>
            <ul data-hero-fade className="mono hidden gap-6 text-[12px] text-white/70 md:flex">
              {hero.facts.map((f) => (
                <li key={f} className="border-l border-white/25 pl-3">
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Captions on white sign plates */}
        {hero.captions.map((c, i) => (
          <div key={i} data-caption={i} className="container-x absolute inset-x-0 bottom-[max(12vh,80px)] opacity-0">
            <div className="max-w-[min(520px,100%)] border-l-4 border-[#ff5a1f] bg-white/95 p-6 text-[#0c0f14] shadow-[0_30px_60px_-30px_rgba(0,0,0,.5)] backdrop-blur md:p-8">
              <p className="mono text-[12px] text-[#596070]">
                {String(i + 1).padStart(2, "0")} / {String(hero.captions.length).padStart(2, "0")}
              </p>
              <h2 className="font-display mt-3 text-[clamp(28px,3.2vw,52px)]">{c.title}</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-[#3c4250]">{c.text}</p>
            </div>
          </div>
        ))}

        <div ref={hint} className="absolute bottom-6 right-[clamp(20px,5vw,80px)] hidden items-center gap-3 md:flex">
          <span className="mono text-[12px] tracking-[0.3em] text-white/60 uppercase">Scroll to walk in</span>
          <span className="block h-8 w-px animate-pulse bg-[#ff5a1f]" />
        </div>
      </div>
    </section>
  );
}
