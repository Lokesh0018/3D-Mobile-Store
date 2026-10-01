import CircuitLoader from "./components/CircuitLoader";
import RoomLights from "./components/RoomLights";
import TopBar from "./components/TopBar";
import FloorDock from "./components/FloorDock";
import DoorsHero from "./components/DoorsHero";
import Directory from "./components/Directory";
import RoomComputers from "./components/RoomComputers";
import RoomPhones from "./components/RoomPhones";
import RoomNeon from "./components/RoomNeon";
import OfferBoard from "./components/OfferBoard";
import TopPicks from "./components/TopPicks";
import FloorStats from "./components/FloorStats";
import ReviewWall from "./components/ReviewWall";
import VisitStore from "./components/VisitStore";
import CircuitFooter from "./components/CircuitFooter";
import { faviconSvg } from "./components/Logo";
import { meta } from "./site";

const ICON = `data:image/svg+xml,${encodeURIComponent(faviconSvg)}`;

/** Circuit Square: a guided walk through a bright showroom, room by room. Plan + reasons: site/DESIGN.md. */
export default function Page() {
  return (
    <>
      {/* never restore the old scroll position on reload · cover the page as it unloads, so a reload never shows the
          old page (e.g. the footer after a recording) before the loader · ?record=1: hide the mouse arrow from the first frame */}
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.classList.add("cs-site");history.scrollRestoration="manual";addEventListener("pagehide",function(){var c=document.createElement("div");c.style.cssText="position:fixed;inset:0;z-index:2147483647;background:#0c0f14";document.body.appendChild(c);document.documentElement.classList.remove("cs-ready")});addEventListener("pageshow",function(e){if(e.persisted)location.reload()});if(/[?&]record/.test(location.search)){var s=document.createElement("style");s.textContent="*,*::before,*::after{cursor:none!important}html{scrollbar-width:none}html::-webkit-scrollbar{display:none}";document.head.appendChild(s)}`,
        }}
      />
      <link rel="icon" type="image/svg+xml" href={ICON} />
      <CircuitLoader name={meta.loaderText ?? meta.name} />
      <RoomLights />
      <TopBar />
      <FloorDock />
      <main className="relative z-[1] overflow-x-clip">
        <DoorsHero />
        <Directory />
        <RoomComputers />
        <RoomPhones />
        <RoomNeon />
        <OfferBoard />
        <TopPicks />
        <FloorStats />
        <ReviewWall />
        <VisitStore />
      </main>
      <CircuitFooter />
    </>
  );
}
