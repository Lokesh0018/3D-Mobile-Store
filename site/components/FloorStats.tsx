import { stats } from "../content";

/** Why buy here (from patterns/Stats): big mono-labelled numbers on a hairline grid, counting up. */
export default function FloorStats() {
  return (
    <section data-zone="deals" className="relative bg-bg text-fg">
      <div className="container-x">
        <div data-reveal="stagger" data-record-time="2" data-record-time-mobile="1" data-record-align="center" data-record-hold="2.3" data-record-label="Stats" className="grid grid-cols-2 gap-px border-y border-line bg-line lg:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} className="flex flex-col gap-4 bg-bg px-4 py-10 md:px-8 md:py-14">
              <span className="mono text-[12px] text-muted">0{i + 1}</span>
              <p className="font-display text-[clamp(30px,4.4vw,72px)] leading-none">
                <span data-count={s.n} data-decimals={s.decimals ?? 0} data-suffix={s.suffix}>
                  {s.n.toLocaleString("en-US", { minimumFractionDigits: s.decimals ?? 0 })}
                  {s.suffix}
                </span>
              </p>
              <p className="max-w-[220px] text-[14px] leading-relaxed text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
