import type { CSSProperties } from "react";
import "./globals.css";
import "@/site/fonts";
import "@/site/site.css";
import { theme } from "@/site/site";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("./page"));
const Patterns = lazy(() => import("./patterns/page"));

export default function App() {
  const t = theme;
  const isDark = (hex: string) => {
    const n = parseInt(hex.replace("#", "").slice(0, 6), 16);
    return ((n >> 16) & 255) * 0.299 + ((n >> 8) & 255) * 0.587 + (n & 255) * 0.114 < 140;
  };
  const vars = {
    "--bg": t.bg,
    "--surface": t.surface,
    "--text": t.text,
    "--muted": t.muted,
    "--accent": t.accent,
    "--accent-text": t.accentText,
    "--line": t.line,
    "--hero-text": t.heroText ?? (isDark(t.bg) ? t.text : "#fbf8f3"),
    "--radius": `${t.radius ?? 0}px`,
    "--font-display-family": t.fontDisplay,
    "--font-body-family": t.fontBody,
    "--heading-case": t.uppercaseHeadings ? "uppercase" : "none",
    "--heading-tracking": t.uppercaseHeadings ? "0.04em" : "0.005em",
  } as CSSProperties;

  return (
    <div style={vars}>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/patterns" element={<Patterns />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}
