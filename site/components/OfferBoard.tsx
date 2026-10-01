import { offers } from "../content";

const span: Record<string, string> = { lg: "md:col-span-2 md:row-span-2", wide: "md:col-span-2", sm: "" };
const num = (s: string) => Number(s.replace(/[^\d.]/g, ""));
const prefix = (s: string) => (s.startsWith("₹") ? "₹" : "");
const suffix = (s: string) => (s.endsWith("%") ? "%" : "");

/**
 * Today's offers (from patterns/Bento): back on the bright floor. An offer ticker on an orange band,
 * then a sharp bento: EMI (ink), exchange (white + phone), student (orange), setup (white). Numbers count up.
 */
export default function OfferBoard() {
  return (
    <section id="deals" data-zone="deals" className="relative bg-bg text-fg">
      {/* the light switches back to the showroom before this section shows (while the neon room still fills the screen),
          but the dock keeps "Audio & TV" and the ticker stays hidden until the section itself starts */}
      <div data-zone-start="deals" data-dock="neon" className="absolute left-0 top-[-62vh] h-px w-px" />
      <div data-dock-start="deals" className="absolute left-0 top-[-25vh] h-px w-px" />
      <div className="offer-ticker overflow-hidden bg-accent py-3.5 text-accent-fg">
        <div className="ticker-track flex w-max gap-10 whitespace-nowrap" style={{ animationDuration: "40s" }}>
          {[...offers.ticker, ...offers.ticker].map((t, i) => (
            <span key={i} className="mono flex items-center gap-10 text-[13px] font-semibold">
              {t}
              <span aria-hidden>✦</span>
            </span>
          ))}
        </div>
      </div>

      <div className="container-x section-y">
        <div data-reveal className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-5">{offers.eyebrow}</p>
            <h2 className="font-display text-[clamp(34px,4.4vw,72px)]">{offers.heading}</h2>
          </div>
          <p className="mono text-[12px] text-muted">Valid in store today · T&amp;Cs at the counter</p>
        </div>

        <div data-reveal="stagger" data-record-time="1.3" data-record-align="center" data-record-offset="-30" data-record-align-mobile="top" data-record-offset-mobile="-230" data-record-hold="1.1" data-record-label="Offers" className="grid auto-rows-[minmax(190px,auto)] grid-cols-1 md:auto-rows-[clamp(190px,17vw,250px)] gap-3 md:grid-cols-4">
          {offers.tiles.map((t, i) => {
            const look =
              i === 0 ? "bg-[#0c0f14] text-white" : i === 2 ? "bg-accent text-accent-fg" : "border border-line bg-surface text-fg";
            return (
              <a key={t.title} href="#" data-cursor="Claim" className={`group relative flex flex-col justify-between overflow-hidden p-6 md:p-8 ${look} ${span[t.size]} ${i === 0 ? "min-h-[360px] md:min-h-0" : ""}`}>
                {t.image && (
                  <img
                    src={t.image}
                    alt=""
                    className={`pointer-events-none absolute object-contain transition-transform duration-700 ease-out group-hover:-translate-y-2 ${i === 0 ? "right-[-8%] top-[6%] w-[58%] md:right-[-6%] md:top-[7%] md:w-[60%]" : "bottom-[-8%] right-[-8%] h-[92%] w-auto md:bottom-[-18%] md:right-[4%] md:h-[120%]"}`}
                  />
                )}
                <span className={`mono relative self-start rounded-[3px] px-2.5 py-1 text-[12px] font-semibold ${i === 0 ? "bg-accent text-accent-fg" : i === 2 ? "bg-[#0c0f14] text-white" : "bg-fg text-bg"}`}>{t.tag}</span>
                <div className={`relative ${t.image && i > 0 ? "max-w-[62%]" : ""}`}>
                  <p className={`font-display leading-none ${i === 0 ? "text-[clamp(56px,7vw,120px)] text-accent" : "text-[clamp(34px,3.4vw,56px)]"}`}>
                    <span data-count={num(t.big)} data-prefix={prefix(t.big)} data-suffix={suffix(t.big)}>
                      {t.big}
                    </span>
                    <span className="text-[0.32em] tracking-normal">{t.unit}</span>
                  </p>
                  <h3 className="mt-3 text-[17px] font-bold">{t.title}</h3>
                  <p className={`mt-1 max-w-md text-[14px] leading-relaxed ${i === 0 ? "text-white/70" : "opacity-75"}`}>{t.text}</p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
