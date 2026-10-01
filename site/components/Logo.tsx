// Circuit Square mark: a chip with pins and a "C" trace that ends in a solder dot.
export const LOGO_PATHS = {
  chip: "M9 6h14a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3z",
  pins: "M12 6V2M16 6V2M20 6V2M12 26v4M16 26v4M20 26v4M6 12H2M6 16H2M6 20H2M26 12h4M26 16h4M26 20h4",
  trace: "M20.5 11.5H12.5V20.5H18",
};

export default function Logo({ className = "", dot = "var(--accent)" }: { className?: string; dot?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
      <path d={LOGO_PATHS.chip} stroke="currentColor" strokeWidth="2" />
      <path d={LOGO_PATHS.pins} stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d={LOGO_PATHS.trace} stroke={dot} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="20" cy="20.5" r="2.2" fill={dot} />
    </svg>
  );
}

export const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="6" fill="#0c0f14"/><path d="${LOGO_PATHS.chip}" stroke="#fff" stroke-width="2" fill="none"/><path d="${LOGO_PATHS.trace}" stroke="#ff5a1f" stroke-width="2.4" stroke-linecap="round" fill="none"/><circle cx="20" cy="20.5" r="2.2" fill="#ff5a1f"/></svg>`;
