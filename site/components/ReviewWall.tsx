import { reviews } from "../content";

type Review = (typeof reviews.items)[number];

const Card = ({ r }: { r: Review }) => (
  <figure className="flex w-[min(80vw,380px)] shrink-0 flex-col justify-between gap-6 border border-line bg-surface p-6">
    <div>
      <p className="text-[15px] tracking-[0.2em] text-accent" aria-label="5 out of 5">
        ★★★★★
      </p>
      <blockquote className="mt-4 text-[16px] leading-relaxed">“{r.text}”</blockquote>
    </div>
    <figcaption className="flex items-end justify-between gap-4 border-t border-line pt-4">
      <span>
        <span className="block text-[14px] font-bold">{r.name}</span>
        <span className="text-[13px] text-muted">{r.who}</span>
      </span>
      <span className="mono text-right text-[12px] text-muted">
        Bought
        <br />
        <span className="text-fg">{r.bought}</span>
      </span>
    </figcaption>
  </figure>
);

/** Reviews (from patterns/Testimonials): two rows of receipt-like cards sliding in opposite directions. */
export default function ReviewWall() {
  const a = reviews.items.slice(0, 3);
  const b = reviews.items.slice(3);
  return (
    <section data-zone="deals" data-record-time="1" data-record-align="center" data-record-label="Reviews" className="section-y relative overflow-hidden bg-bg text-fg">
      <div data-reveal className="container-x mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow mb-5">{reviews.eyebrow}</p>
          <h2 className="font-display text-[clamp(32px,4vw,64px)]">{reviews.heading}</h2>
        </div>
        <p className="mono text-[13px] text-muted">
          <span className="font-display text-[28px] text-fg">4.8</span> / 5 · 6,000+ reviews
        </p>
      </div>
      <div className="flex flex-col gap-3">
        {[a, b].map((row, k) => (
          <div key={k} className="overflow-hidden">
            <div className={`review-track flex w-max gap-3 ${k ? "reverse" : ""}`}>
              {[...row, ...row, ...row, ...row].map((r, i) => (
                <Card key={i} r={r} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
