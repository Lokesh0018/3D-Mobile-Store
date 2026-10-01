"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import Logo from "./Logo";
import { footer, store } from "../content";

/**
 * Footer (from patterns/Footer): always dark, like the store after closing. An orange circuit trace
 * draws across as you arrive, then the huge outlined name; link columns and the concept note.
 */
export default function CircuitFooter() {
  const root = useRef<HTMLElement>(null);
  const trace = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const p = trace.current!;
    const len = p.getTotalLength();
    const ctx = gsap.context(() => {
      gsap.fromTo(p, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, ease: "none", scrollTrigger: { trigger: root.current, start: "top 90%", end: "top 25%", scrub: 0.6 } });
      gsap.from(".cf-word", { yPercent: 40, opacity: 0, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: ".cf-word", start: "top 95%", once: true } });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={root} data-record-time="1" data-record-align="bottom" data-record-hold="2" data-record-label="Footer" className="relative overflow-hidden bg-[#0c0f14] pb-28 pt-20 text-white lg:pb-24">
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="absolute inset-x-0 top-0 h-[90px] w-full" fill="none" aria-hidden>
        <path ref={trace} d="M0 30H380L420 70H760L790 40H1080L1120 90H1440" stroke="#ff5a1f" strokeWidth="2" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="container-x relative">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Logo className="h-9 w-9 text-white" dot="#ff5a1f" />
              <span className="font-display text-[18px]">{store.name}</span>
            </div>
            <p className="mt-5 max-w-xs text-[14px] leading-relaxed text-white/60">Every gadget, switched on and ready to try. {store.area}.</p>
            <form className="mt-6 flex max-w-sm border border-white/15">
              <input type="email" placeholder="Email for weekly deals" aria-label="Email" className="min-w-0 flex-1 bg-transparent px-4 py-3 text-[14px] text-white outline-none placeholder:text-white/40" />
              <button type="button" className="bg-[#ff5a1f] px-4 text-[13px] font-bold text-[#0c0f14]">
                Join
              </button>
            </form>
          </div>
          {footer.columns.map((c) => (
            <div key={c.title}>
              <p className="mono text-[12px] tracking-[0.16em] text-white/60 uppercase">{c.title}</p>
              <ul className="mt-5 flex flex-col gap-2.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="link-underline text-[15px] text-white/85 hover:text-white">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="cf-word font-display mt-20 whitespace-nowrap text-center text-[clamp(30px,8.6vw,150px)] leading-none text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,.55)]">
          CIRCUIT SQUARE
        </p>

        <div className="mono mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-[12px] text-white/60 md:flex-row md:justify-between">
          <span>{footer.note}</span>
          <span>© 2026 · {store.hours.replace("Open today · ", "Open daily ")}</span>
        </div>
      </div>
    </footer>
  );
}
