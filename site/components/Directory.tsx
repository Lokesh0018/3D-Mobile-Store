import { directory } from "../content";
import { zoneById } from "../zones";

/** Store directory board: the three rooms light up one by one, each with its light colour and a product. */
export default function Directory() {
  return (
    <section data-zone="entrance" data-record-time="1" data-record-align="center" data-record-hold="1" data-record-label="Directory" className="section-y relative bg-bg text-fg">
      <div className="container-x">
        <div data-reveal className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-5">{directory.eyebrow}</p>
            <h2 className="font-display text-[clamp(34px,4.4vw,72px)]">{directory.heading}</h2>
          </div>
          <p className="max-w-xs text-[15px] leading-relaxed text-muted">Each room has its own light. Walk through a doorway and the whole floor changes colour.</p>
        </div>

        <div data-reveal="stagger" className="border-t border-line">
          {directory.rows.map((r) => {
            const z = zoneById(r.zone).vars;
            return (
              <a
                key={r.no}
                href={`#${r.zone}`}
                data-cursor="Walk in"
                className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-x-5 gap-y-2 overflow-hidden border-b border-line py-7 md:grid-cols-[80px_1fr_200px_220px] md:gap-x-8 md:py-9"
              >
                {/* light spill on hover */}
                <span
                  className="pointer-events-none absolute inset-0 origin-left scale-x-0 transition-transform duration-700 ease-[cubic-bezier(.65,0,.35,1)] group-hover:scale-x-100"
                  style={{ background: `linear-gradient(90deg, ${z["--bg"]}, transparent)` }}
                />
                <span className="mono relative text-[13px] text-muted">{r.no}</span>
                <span className="relative flex flex-col gap-2">
                  <span className="font-display text-[clamp(24px,3vw,48px)]">{r.title}</span>
                  <span className="text-[14px] text-muted">{r.note}</span>
                </span>
                <span className="mono relative col-span-3 flex items-center gap-3 text-[12px] md:col-span-1">
                  <span className="h-3 w-3 shrink-0 rounded-full" style={{ background: z["--glow"], boxShadow: `0 0 16px 2px ${z["--glow"]}` }} />
                  <span className="flex flex-wrap gap-x-2 md:flex-col md:gap-1">
                    <span className="whitespace-nowrap text-fg">{r.light} light</span>
                    <span className="whitespace-nowrap text-muted">{r.count}</span>
                  </span>
                </span>
                <span className="relative col-start-3 row-start-1 flex h-[72px] w-[110px] items-center justify-end md:col-start-4 md:h-[110px] md:w-auto">
                  <img src={r.image} alt="" className="max-h-full max-w-full object-contain transition-transform duration-700 ease-out group-hover:-translate-x-3 group-hover:scale-105" />
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
