"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { phones } from "../content";
import Doorway from "./Doorway";

/**
 * Room 02 (from patterns/HorizontalGallery): a lit display shelf that slides sideways while the room is pinned.
 * Sharp white cards on a warm glowing shelf edge; the trade-in counter closes the row.
 */
export default function RoomPhones() {
  const outer = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const distance = () => Math.max(0, track.current!.scrollWidth - window.innerWidth);
      const setHeight = () => {
        outer.current!.style.height = `${distance() + window.innerHeight * 1.15}px`;
      };
      setHeight();
      gsap.to(track.current, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: { trigger: outer.current, start: "top top", end: "bottom bottom", scrub: 0.6, invalidateOnRefresh: true, onRefreshInit: setHeight },
      });
      gsap.utils.toArray<HTMLElement>(".shelf-shot").forEach((el, k) => {
        gsap.fromTo(el, { y: 30 + k * 8 }, { y: -20, ease: "none", scrollTrigger: { trigger: outer.current, start: "top bottom", end: "bottom top", scrub: true } });
      });
    }, outer);
    return () => ctx.revert();
  }, []);

  return (
    <Doorway zone="phones" photo={phones.photo} approach={0.9}>
      <div ref={outer} className="relative" data-record-time="0.8" data-record-label="Phones: shelf">
        <div data-record-time="2.9" data-record-align="bottom" data-record-hold="0.4" data-record-label="Phones: shelf end" className="absolute bottom-0 left-0 h-px w-px" />
        <div className="shelf-pin sticky top-0 flex h-screen flex-col justify-center gap-[5vh] overflow-hidden pb-[9vh] pt-[9vh]">
          <div data-reveal className="container-x flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="text-backdrop">
              <p className="eyebrow mb-5">
                {phones.room} · {phones.title}
              </p>
              <h2 className="font-display text-[clamp(30px,3.8vw,62px)]">
                {phones.heading.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </h2>
            </div>
            <p className="text-backdrop max-w-sm text-[15px] leading-relaxed text-muted">{phones.text}</p>
          </div>

          <div ref={track} className="shelf-track relative flex w-max items-stretch gap-5 pl-[clamp(20px,5vw,80px)] pr-[8vw]">
            {phones.items.map((p) => (
              <article key={p.name} className="relative flex h-[min(54vh,500px)] w-[min(76vw,330px)] shrink-0 flex-col border border-line bg-surface/90 p-5 backdrop-blur" data-cursor="Try it">
                <div className="flex items-center justify-between">
                  <span className="mono text-[12px] text-muted">{p.kind}</span>
                  {p.badge && <span className="mono rounded-[3px] bg-fg px-2 py-1 text-[12px] text-bg">{p.badge}</span>}
                </div>
                <div className="relative flex min-h-0 flex-1 items-center justify-center py-4">
                  <img src={p.image} alt={p.name} className="shelf-shot max-h-full max-w-[80%] object-contain drop-shadow-[0_24px_24px_rgba(60,40,10,.25)]" />
                </div>
                <div className="flex items-end justify-between gap-3 border-t border-line pt-4">
                  <div>
                    <h3 className="font-display text-[22px]">{p.name}</h3>
                    <p className="mono mt-1.5 text-[12px] text-muted">{p.specs.join(" · ")}</p>
                    {p.colors && (
                      <div className="mt-3 flex gap-1.5">
                        {p.colors.map((c) => (
                          <span key={c} className="h-3.5 w-3.5 rounded-full border border-black/10" style={{ background: c }} />
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="tag shrink-0">{p.price}</span>
                </div>
              </article>
            ))}
            <article className="flex h-[min(54vh,500px)] w-[min(76vw,330px)] shrink-0 flex-col justify-between bg-fg p-7 text-bg">
              <span className="mono text-[12px] opacity-70">Trade-in desk</span>
              <div>
                <p className="font-display text-[clamp(28px,2.6vw,40px)] text-accent">{phones.trade.value}</p>
                <h3 className="font-display mt-4 text-[24px]">{phones.trade.title}</h3>
                <p className="mt-2 text-[14px] opacity-75">{phones.trade.text}</p>
              </div>
              <a href="#deals" className="btn btn-solid self-start !py-2.5">
                Check my phone's value
              </a>
            </article>
            {/* the lit shelf edge */}
            <span className="pointer-events-none absolute -bottom-4 left-0 right-0 h-[3px] bg-[var(--glow)] shadow-[0_0_24px_4px_var(--glow)]" />
          </div>
        </div>
      </div>
    </Doorway>
  );
}
