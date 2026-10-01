"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { atFromUrl, waitForClock } from "@/lib/atTime";
import { LOGO_PATHS } from "./Logo";

// The engine loader is off (meta.loader = false). This one always takes exactly LOADER_SECONDS:
// "power on": an orange trace draws the chip mark, the solder dot blinks, the name comes up,
// then the two dark halves slide apart like the showroom's glass doors.
// With &at=HH:MM:SS it holds its first frame (preloading every image) and plays at that time.

const DRAW = 1.7;
const OPEN = 0.8;
export const LOADER_SECONDS = DRAW + OPEN; // 2.5

let revealed = false;

/** Run once the doors have opened (immediately with ?static=1). */
export function onReveal(fn: () => void) {
  if (revealed) {
    fn();
    return () => {};
  }
  const h = () => fn();
  window.addEventListener("circuit:reveal", h, { once: true });
  return () => window.removeEventListener("circuit:reveal", h);
}

/** Page content is hidden (site.css) until this runs, so nothing can show before the loader. */
const showPage = () => document.documentElement.classList.add("cs-ready");

function reveal() {
  showPage();
  if (revealed) return;
  revealed = true;
  window.dispatchEvent(new Event("circuit:reveal"));
}

const loadImage = (src: string) =>
  new Promise<void>((done) => {
    const img = new Image();
    img.onload = img.onerror = () => done();
    img.src = src;
  });

async function preloadAll() {
  const urls = [...new Set(Array.from(document.images).map((i) => i.currentSrc || i.src).filter(Boolean))];
  await Promise.all([...urls.map(loadImage), document.fonts.ready]);
}

export default function CircuitLoader({ name }: { name: string }) {
  const root = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).has("static")) document.documentElement.classList.add("is-static");
    if (prefersReducedMotion()) {
      setGone(true);
      reveal();
      return;
    }
    window.scrollTo(0, 0);
    window.__lenis?.stop();

    const target = atFromUrl();
    let ready = !target;
    let cancelClock = () => {};
    if (target) {
      const t0 = performance.now();
      preloadAll().then(() => {
        ready = true;
        console.log(`[record] loader: all images ready in ${((performance.now() - t0) / 1000).toFixed(1)} s`);
      });
    }

    const el = root.current!;
    const ctx = gsap.context(() => {
      const strokes = el.querySelectorAll<SVGPathElement>(".cl-draw");
      strokes.forEach((p) => {
        const len = p.getTotalLength();
        p.style.strokeDasharray = `${len}`;
        p.style.strokeDashoffset = `${len}`;
      });
      const tl = gsap.timeline({ paused: !!target });
      tl.to(".cl-chip", { strokeDashoffset: 0, duration: 0.7, ease: "power2.inOut" }, 0.1)
        .to(".cl-pins", { strokeDashoffset: 0, duration: 0.5, ease: "power1.out" }, 0.45)
        .to(".cl-trace", { strokeDashoffset: 0, duration: 0.55, ease: "power2.out" }, 0.7)
        .fromTo(".cl-dot", { scale: 0, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.3, ease: "back.out(3)" }, 1.2)
        .fromTo(".cl-dot", { opacity: 1 }, { opacity: 0.25, duration: 0.12, yoyo: true, repeat: 3 }, 1.35)
        .fromTo(".cl-letter", { yPercent: 110 }, { yPercent: 0, duration: 0.6, ease: "power3.out", stagger: 0.025 }, 0.75)
        .fromTo(".cl-sub", { opacity: 0 }, { opacity: 1, duration: 0.4 }, 1.1)
        .add(() => {
          if (ready) return;
          tl.pause();
          const wait = () => (ready ? tl.play() : requestAnimationFrame(wait));
          wait();
        }, DRAW - 0.05)
        .add(showPage, DRAW)
        .to(".cl-center", { opacity: 0, scale: 0.96, duration: 0.3, ease: "power2.in" }, DRAW)
        .to(".cl-seam", { opacity: 1, duration: 0.15 }, DRAW)
        .to(".cl-left", { xPercent: -100, duration: OPEN, ease: "power3.inOut" }, DRAW + 0.1)
        .to(".cl-right", { xPercent: 100, duration: OPEN, ease: "power3.inOut" }, DRAW + 0.1)
        .add(() => {
          window.__lenis?.start();
          reveal();
        }, DRAW + 0.35)
        .add(() => setGone(true), LOADER_SECONDS + 0.15);

      if (target) {
        if (Date.now() < target.getTime()) console.log(`[record] loader frozen until ${target.toLocaleTimeString()}`);
        cancelClock = waitForClock(target, () => tl.play(0));
      }
    }, el);

    return () => {
      cancelClock();
      ctx.revert();
    };
  }, []);

  if (gone) return null;

  return (
    <div ref={root} data-loader aria-hidden className="fixed inset-0 z-[100] overflow-hidden">
      <div className="cl-left absolute inset-y-0 left-0 w-1/2 bg-[#0c0f14]" />
      <div className="cl-right absolute inset-y-0 right-0 w-1/2 bg-[#0c0f14]" />
      <div className="cl-seam absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-[#ff5a1f] opacity-0 shadow-[0_0_24px_#ff5a1f]" />
      <div className="cl-center absolute inset-0 flex flex-col items-center justify-center gap-7 text-white">
        <svg viewBox="0 0 32 32" fill="none" className="h-[clamp(72px,11vh,110px)] w-auto overflow-visible">
          <path className="cl-draw cl-chip" d={LOGO_PATHS.chip} stroke="#fff" strokeWidth="1.2" />
          <path className="cl-draw cl-pins" d={LOGO_PATHS.pins} stroke="#fff" strokeWidth="1.2" strokeLinecap="round" />
          <path className="cl-draw cl-trace" d={LOGO_PATHS.trace} stroke="#ff5a1f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <circle className="cl-dot" cx="20" cy="20.5" r="2" fill="#ff5a1f" style={{ transform: "scale(0)" }} />
        </svg>
        <div className="flex flex-col items-center gap-3">
          <div className="font-display flex overflow-hidden text-[clamp(22px,3.2vw,44px)] tracking-[0.04em]">
            {name.split("").map((ch, i) => (
              <span key={i} className="cl-letter inline-block" style={{ transform: "translateY(110%)" }}>
                {ch === " " ? " " : ch}
              </span>
            ))}
          </div>
          <span className="cl-sub mono text-[12px] tracking-[0.3em] text-white/60 uppercase" style={{ opacity: 0 }}>
            Powering on the showroom
          </span>
        </div>
      </div>
    </div>
  );
}
