"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { picks } from "../content";

const INTERVAL = 2400;
const FIRST = 4400;

/**
 * Top picks (from patterns/ProductGrid): sharp shelf-tag cards. The filter tabs step through the
 * categories by themselves while on screen; cards outside the category dim (no layout jump).
 * Phone: a sideways swipe row.
 */
export default function TopPicks() {
  const [f, setF] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const filter = picks.filters[f];

  useEffect(() => {
    if (prefersReducedMotion()) return;
    // Show all 8 first: the filters only start stepping FIRST ms after the grid comes on screen
    let t: ReturnType<typeof setInterval> | undefined;
    let wait: ReturnType<typeof setTimeout> | undefined;
    const io = new IntersectionObserver(
      ([e]) => {
        clearTimeout(wait);
        clearInterval(t);
        if (!e.isIntersecting) return;
        setF(0);
        wait = setTimeout(() => {
          setF(1);
          t = setInterval(() => setF((c) => (c + 1) % picks.filters.length), INTERVAL);
        }, FIRST);
      },
      { threshold: 0.35 },
    );
    io.observe(ref.current!);
    // ?record=1 on a phone: during the hold, glide the row so all 8 cards pass the camera
    const el = ref.current!;
    const onHold = (e: Event) => {
      if (window.innerWidth >= 768) return;
      const secs = (e as CustomEvent<{ duration: number }>).detail.duration;
      gsap.fromTo(el, { scrollLeft: 0 }, { scrollLeft: el.scrollWidth - el.clientWidth, duration: secs * 0.8, delay: secs * 0.15, ease: "sine.inOut" });
    };
    el.addEventListener("record:hold", onHold);
    return () => {
      clearInterval(t);
      clearTimeout(wait);
      io.disconnect();
      el.removeEventListener("record:hold", onHold);
    };
  }, []);

  return (
    <section data-zone="deals" className="section-y relative bg-bg !pt-4 text-fg">
      <div className="container-x">
        <div data-reveal className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow mb-5">{picks.eyebrow}</p>
            <h2 className="font-display text-[clamp(32px,4vw,64px)]">{picks.heading}</h2>
          </div>
          <div className="flex flex-wrap gap-1.5" role="tablist">
            {picks.filters.map((name, k) => (
              <button
                key={name}
                role="tab"
                aria-selected={k === f}
                onClick={() => setF(k)}
                className={`mono rounded-[3px] border px-3.5 py-2 text-[12px] transition-colors duration-500 ${k === f ? "border-fg bg-fg text-bg" : "border-line text-muted hover:text-fg"}`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        <div
          ref={ref}
          data-reveal="stagger"
          data-record-time="1.1"
          data-record-align="center"
          data-record-offset="-24"
          data-record-hold="2.6"
          data-record-hold-mobile="3.6"
          data-record-label="Top picks"
          className="-mx-[clamp(20px,5vw,80px)] flex gap-3 overflow-x-auto px-[clamp(20px,5vw,80px)] pb-2 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 lg:grid-cols-4"
        >
          {picks.items.map((p) => {
            const on = filter === "All" || p.cat === filter;
            return (
              <a
                key={p.name}
                href="#"
                data-cursor="Add"
                className="group relative flex w-[72vw] max-w-[300px] shrink-0 flex-col border border-line bg-surface p-4 md:p-3.5 transition-[opacity,filter,transform] duration-700 md:w-auto md:max-w-none"
                style={{ opacity: on ? 1 : 0.28, filter: on ? "none" : "grayscale(1)", transform: on ? "none" : "scale(0.98)" }}
              >
                <div className="relative aspect-[4/3] bg-bg md:aspect-[16/10]">
                  <img src={p.image} alt={p.name} className="absolute inset-0 h-full w-full object-contain p-5 transition-transform duration-700 ease-out group-hover:scale-[1.06]" />
                  {p.badge && <span className="mono absolute left-2.5 top-2.5 rounded-[3px] bg-accent px-2 py-1 text-[12px] font-semibold text-accent-fg">{p.badge}</span>}
                </div>
                <p className="mono mt-3 text-[12px] text-muted">{p.cat}</p>
                <h3 className="mt-1 text-[16px] font-bold">{p.name}</h3>
                <div className="mt-3 flex items-end justify-between gap-2">
                  <div className="flex flex-col gap-1.5">
                    <span className="tag self-start">
                      {p.price} {p.old && <small className="line-through">{p.old}</small>}
                    </span>
                    <span className="mono text-[12px] text-muted">{p.emi}</span>
                  </div>
                  <span className="grid h-9 w-9 place-items-center rounded-[3px] bg-fg text-bg transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-fg" aria-label="Add to cart">
                    +
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
