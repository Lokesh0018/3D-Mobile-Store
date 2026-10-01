import { visit } from "../content";

/** Visit the store: the showroom floor (the doors video's last frame) + hours, area and what's on the floor. */
export default function VisitStore() {
  return (
    <section id="visit" data-zone="visit" className="section-y relative bg-bg text-fg">
      <div data-zone-start="visit" className="absolute left-0 top-[12vh] h-px w-px" />
      <div data-record-time="1.1" data-record-align="center" data-record-hold="1" data-record-label="Visit" className="container-x grid items-center gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
        <div data-reveal className="relative aspect-[16/10] overflow-hidden">
          <img src={visit.image} alt="Inside the Circuit Square showroom" data-zoom className="h-full w-full object-cover" />
          <span className="mono absolute left-4 top-4 rounded-[3px] bg-white/90 px-2.5 py-1.5 text-[12px] text-[#0c0f14]">Ground floor · 3 rooms</span>
          <div className="absolute bottom-4 left-4 flex gap-1.5">
            {["#2f6bff", "#f0b25a", "#b56cff"].map((c) => (
              <span key={c} className="h-2.5 w-8" style={{ background: c, boxShadow: `0 0 12px ${c}` }} />
            ))}
          </div>
        </div>
        <div data-reveal>
          <p className="eyebrow mb-5">{visit.eyebrow}</p>
          <h2 className="font-display text-[clamp(32px,3.8vw,60px)]">
            {visit.heading.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </h2>
          <dl className="mt-9 border-t border-line">
            {visit.details.map((d) => (
              <div key={d.k} className="grid grid-cols-[110px_1fr] gap-4 border-b border-line py-4">
                <dt className="mono text-[12px] text-muted">{d.k}</dt>
                <dd className="text-[15px] font-semibold">{d.v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={visit.buttons[0].href} className="btn btn-solid">
              {visit.buttons[0].label}
            </a>
            <a href={visit.buttons[1].href} className="btn btn-outline">
              {visit.buttons[1].label} →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
