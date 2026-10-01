import Logo from "./Logo";
import { store } from "../content";

/** Slim top bar: mark + name · open-now line · Visit store. Its colours follow the room you are in. */
export default function TopBar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-surface/85 text-fg backdrop-blur-md">
      <div className="container-x flex h-14 items-center justify-between gap-6">
        <a href="#entrance" className="flex items-center gap-2.5" aria-label={store.name}>
          <Logo className="h-7 w-7" />
          <span className="font-display text-[15px] tracking-[-0.01em]">{store.name}</span>
        </a>
        <p className="mono hidden items-center gap-3 text-[12px] text-muted md:flex">
          <span className="live-dot" />
          <span>{store.hours}</span>
          <span className="opacity-40">/</span>
          <span>{store.area}</span>
        </p>
        <a href="#visit" className="btn btn-solid !py-2.5 !text-[12px]" data-cursor="Visit">
          Visit store
        </a>
      </div>
    </header>
  );
}
