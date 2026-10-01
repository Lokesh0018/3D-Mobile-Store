"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { zoneById, type ZoneId } from "../zones";

/**
 * A room you walk into. The room photo is pinned behind the whole section, first seen (clear, unwashed)
 * through a tall lit doorway in the wall; scrolling opens the doorway until the photo fills the screen,
 * then the page's light switches to this room (data-zone-start → RoomLights) and the content scrolls over it.
 * Readability comes from soft gradients behind the text blocks (.text-backdrop), not from washing the photo.
 *
 * Record timeline: the section is the "door" stop (door closed, pinned), the marker at DOOR vh is the
 * "open" stop (DOOR_SECONDS later), so the doorway always takes the same time on camera.
 */
const DOOR = 60; // vh of scroll to open the doorway
const DOOR_SECONDS = 1.2;
/** width / height of the room photos (all 2232 × 1536) */
const PHOTO_AR = 2232 / 1536;

export default function Doorway({
  zone,
  photo,
  shade,
  approach = 1.1,
  focus = { x: 0.5, y: 0.5 },
  children,
}: {
  zone: ZoneId;
  photo: string;
  /** optional overlay over the whole photo once inside (e.g. darken the neon room) */
  shade?: string;
  /** record timeline: seconds to walk from the previous stop up to this closed door */
  approach?: number;
  /** what the closed doorway frames (fractions of the photo); it zooms out to the whole room as the door opens */
  focus?: { x: number; y: number };
  children: ReactNode;
}) {
  const z = zoneById(zone);
  const outer = useRef<HTMLElement>(null);
  const clip = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const sign = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);
  const view = useRef<HTMLDivElement>(null);
  const shadeEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const state = { p: 0 };
    const draw = () => {
      if (!clip.current || !frame.current || !sign.current || !view.current) return;
      const W = window.innerWidth;
      const H = window.innerHeight;
      const doorH = H * 0.7;
      const doorW = Math.min(doorH * 0.52, W * 0.66);
      const k = 1 - gsap.parseEase("power2.inOut")(state.p);
      const top = H * 0.2 * k;
      const bottom = H * 0.1 * k;
      const side = ((W - doorW) / 2) * k;
      clip.current!.style.clipPath = `inset(${top}px ${side}px ${bottom}px ${side}px)`;
      Object.assign(frame.current!.style, { top: `${top}px`, bottom: `${bottom}px`, left: `${side}px`, right: `${side}px`, opacity: String(Math.min(1, k * 1.4)) });
      Object.assign(sign.current!.style, { top: `${top}px`, opacity: String(Math.max(0, 1 - state.p * 2.5)) });
      if (shadeEl.current) shadeEl.current.style.opacity = String(state.p);
      // closed: zoomed in on the focus point, centred in the doorway; open: the whole room
      const zoom = focus.x === 0.5 && focus.y === 0.5 ? 0.12 : 0.6;
      const s = 1 + zoom * k;
      // focus is in photo coordinates: find where it lands on screen with object-fit: cover
      const iw = Math.max(W, H * PHOTO_AR);
      const ih = Math.max(H, W / PHOTO_AR);
      const px = (W - iw) / 2 + focus.x * iw;
      const py = (H - ih) / 2 + focus.y * ih;
      const tx = (W / 2 - px) * s * k;
      const ty = (H * 0.55 - py) * s * k;
      view.current!.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${s})`;
    };
    draw();
    const ctx = gsap.context(() => {
      gsap.to(state, {
        p: 1,
        ease: "none",
        onUpdate: draw,
        scrollTrigger: { trigger: outer.current, start: "top top", end: `+=${DOOR}%`, scrub: 0.3, invalidateOnRefresh: true },
      });
      // walking towards the door: the room behind it comes a little closer, then a slow push-in while inside
      gsap.to(img.current, { scale: 1.07, ease: "none", immediateRender: false, scrollTrigger: { trigger: outer.current, start: `top -${DOOR}%`, end: "bottom bottom", scrub: 0.5 } });
    }, outer);
    window.addEventListener("resize", draw);
    return () => {
      window.removeEventListener("resize", draw);
      ctx.revert();
    };
  }, [focus.x, focus.y]);

  return (
    <section ref={outer} id={zone} data-zone={zone} data-record-time={approach} data-record-label={`${z.short}: door`} className="relative bg-bg text-fg">
      {/* backdrop: pinned for the whole room */}
      <div className="sticky top-0 -mb-[100vh] h-screen overflow-hidden">
        <div ref={clip} className="absolute inset-0 overflow-hidden">
          {/* the photo is sized like "cover" but as a real box, so the closed doorway can frame any part of it */}
          <div ref={view} className="absolute inset-0 flex items-center justify-center will-change-transform">
            <img ref={img} src={photo} alt="" className="max-w-none shrink-0" style={{ width: `max(100%, calc(100vh * ${PHOTO_AR}))`, aspectRatio: PHOTO_AR }} />
          </div>
          {shade && <div ref={shadeEl} className="door-shade absolute inset-0" style={{ background: shade }} />}
        </div>
        {/* lit door frame + room sign (hidden with ?static=1) */}
        <div
          ref={frame}
          className="pointer-events-none absolute"
          style={{ border: `2px solid ${z.vars["--glow"]}`, boxShadow: `0 0 40px ${z.vars["--glow"]}, inset 0 0 24px ${z.vars["--glow"]}66`, opacity: 0 }}
        />
        <div ref={sign} className="pointer-events-none absolute inset-x-0 flex -translate-y-[calc(100%+22px)] flex-col items-center gap-2 text-center" style={{ opacity: 0 }}>
          <span className="mono text-[12px] tracking-[0.3em] text-muted uppercase">{z.room}</span>
          <span className="font-display text-[clamp(22px,2.4vw,38px)]">{z.label}</span>
        </div>
      </div>

      <div className="relative z-[1]">
        {/* the walk through the doorway */}
        <div className="door-walk relative h-[150vh]">
          <div data-record-time={DOOR_SECONDS} data-record-label={`${z.short}: open`} className="absolute left-0 h-px w-px" style={{ top: `${DOOR}vh` }} />
          <div data-zone-start={zone} className="absolute left-0 top-[112vh] h-px w-px" />
        </div>
        {children}
      </div>
    </section>
  );
}
