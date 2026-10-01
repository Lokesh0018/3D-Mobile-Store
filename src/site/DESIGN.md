# Design direction: Circuit Square (Day 4)

**Brief:** Circuit Square, a premium electronics showroom in Hyderabad (laptops, phones, audio, TVs, gaming). Audience: students, young professionals and families buying gadgets. Mood: modern, bright, exciting. Storyboard: walk through the showroom room by room. All devices unbranded: no real logos, no real brand names. Assets: none yet.

**The idea in one line:** *a guided walk through a bright showroom.* The glass doors slide open, you step onto a clean white floor, and every doorway you pass through **changes the light of the whole page**: cool blue for Computers, warm white for Phones, purple neon for Audio, TV & Gaming. A floor-directory dock at the bottom of the screen always says which room you are in, like the signs in a real store.

## Choices (codes from docs/DESIGN-MENU.md)

| | Choice | Why |
|---|---|---|
| Look | **L5 Clean white minimal**, "showroom floor" version: light grey floor, white plinths, products floating with soft shadows, thin hairlines, small mono labels like shelf tags | Bright and modern; lets each room's light colour take over the page |
| Palette | **Showroom white + room lights** (new). Base: bg `#f3f4f6` · surface `#ffffff` · text `#0c0f14` · muted `#596070` · accent **signal orange `#ff5a1f`** with dark text `#0c0f14` on it. **Room lights** (the page flips to these on purpose, see Signature): Computers `#e6efff` + glow `#2f6bff` · Phones `#fbf4e8` + glow `#f0b25a` · Audio/TV/Gaming dark `#0f0820` + neon `#b56cff` | One accent (orange: buttons, prices, "you are here") that stays the same in every room, so the brand survives the colour changes |
| Type pair | **T10 Unbounded + Plus Jakarta Sans**, plus **JetBrains Mono** only for small labels (room numbers, prices on shelf tags, specs) | Unbounded is wide, bold and techy but friendly (exciting, not cold); the mono labels feel like price tags and circuit boards |
| Nav | **N7 Bottom floating dock**, "floor directory" version: a slim top bar (CS logo · "Open today 11 am–10 pm" · "Visit store") + after the hero a dark dock at the bottom: `Entrance · 01 Computers · 02 Phones · 03 Audio & TV · Offers · Visit`. The current room lights up in its own colour with a moving pill, and a label reads "You are in: Computers" | The brief asks the nav to show the room; a store directory is exactly that |
| Hero | **H2 Fly-through**: scroll video, the camera faces glass doors, they slide open, and it glides into the bright showroom. Captions change as you move: "Walk in." → "Every gadget. One floor." → "Three rooms. Let's go." | It is the storyboard's opening shot, and no recent site used a fly-through |
| Section shape | **Doorways** (custom, on top of **S7 full-colour bands**): each room starts with a doorway frame (a tall rectangle with a thin lit edge) in the middle of the page; as you scroll it grows until it fills the screen. **Through the doorway you see that room's photo** (`room-computers`, `room-phones`, `room-neon`), and once it fills the screen the photo stays behind the room as its **backdrop** (slow push-in, a soft tint of the room light on top so products and text stay readable). The products sit on top of it | Makes "walking through a doorway" something you see, not just read |
| Cards | **C1 Sharp + hairline, "shelf tag" version**: square-cornered white cards, product cut-out on a light plinth, a mono price tag in the corner ("₹74,990 · or ₹6,249/mo"), a small spec line | Clean retail look; the price tag makes every card feel shoppable |
| Signature moment | **Room light shift** (new, custom `RoomLights`): as you pass each doorway the *whole page* (background, text, card colours, glow) fades to that room's light, and the dock updates "You are in: …". Driven by scroll, so it plays by itself in `?record=1`. Supporting: **1.** the doorway reveal above, **2.** each room's products **swap by themselves** (spotlight in Computers, a sliding shelf in Phones, expanding bays in Audio & TV) | The storyboard's own idea; it turns scrolling into walking |
| Loader | **I4 Line drawn**, "power on": a thin orange circuit trace draws the CS mark, the dot at the end blinks, then the lights "switch on" from the centre (white fills the screen) and the doors appear. Fixed ~2.5 s, supports `&at=` | Shows the brand as a circuit before the doors open |

**Motion feel: bright and confident.** Clean slides and fades (`power3.out`), no bounce. The only "flash" is the soft switch-on of each room's light. One thing moves at a time per section.

## Section plan (11)

| # | Section | Kind | Starts from | How it's restyled |
|---|---|---|---|---|
| 1 | **Nav** | — | custom → `FloorDock` | Top: slim white bar, CS logo, opening hours, orange "Visit store". Bottom (after hero): dark rounded dock with the 6 stops, moving pill in the room colour, "You are in" label. Phone: dock shows only the current room + a "Floor map" button that opens a full-screen list |
| 2 | **Hero: "Walk in."** | cinematic | FrameHero → `DoorsHero` | Doors video scrubs as you scroll; 3 captions in Unbounded, left side; mono line bottom-left "Hyderabad · 10,000 sq ft · 1,200+ gadgets on display"; the last frame is the white floor, which flows into #3 |
| 3 | **Floor directory** | cinematic + shop | custom → `Directory` | A big store directory board: 3 rows "01 Computers / 02 Phones & tablets / 03 Audio, TV & gaming", each with a light-colour chip, item count and a small product cut-out that slides in. Rows reveal one by one like a sign lighting up |
| 4 | **Room 01 · Computers** (cool blue) | cinematic + shop | ProductShowcase → `RoomComputers` | Doorway opens onto the **computers room photo** (cool blue backdrop). Left: "Room 01 · Computers", big "Built to work. Fast to play."; right: a spotlight that **swaps by itself** between 4 laptops/desktops (Aero 14 ultrabook, Studio 16 creator, Vortex 15 gaming, Canvas 24 all-in-one) with specs and price tag. Small chips below: For students · For creators · For gamers |
| 5 | **Room 02 · Phones & tablets** (warm white) | cinematic + shop | HorizontalGallery → `RoomPhones` | Doorway opens onto the **phones room photo** (warm white backdrop). Pinned sideways **shelf** of phones and tablets on white plinths, moving left as you scroll; each has a colour-dot row and price tag. Heading "Pocket-sized. Picture perfect." |
| 6 | **Room 03 · Audio, TV & gaming** (purple neon) | cinematic + shop | custom → `RoomNeon` ("Neon bento") | Doorway opens onto the darkened **neon room photo**. Bento of dark glass tiles: big TV tile (2 rows, purple glow) + headphones, speaker, console, earbuds (name, one spec, ₹ price). Tiles light up in turn by themselves: a neon beam runs round the edge + a spotlight sweeps over it. Heading "Turn it up." Phone: TV on top, then 2×2 |
| 7 | **Today's offers** | shop | Bento → `OfferBoard` | Light returns to showroom white. Sharp bento with an offer ticker on top: big tile "No-cost EMI from ₹1,999/mo", "Exchange your old phone · up to ₹25,000 off", "Student deal · extra 10% with college ID", "Same-day delivery + free setup in Hyderabad". Numbers count up |
| 8 | **Top picks** | shop | ProductGrid → `TopPicks` | 8 shelf-tag cards (4 × 2; phone: sideways swipe), filter tabs All · Laptops · Phones · Audio · TV & gaming that **cycle by themselves**, "Add to cart" hover, ₹ prices + EMI line |
| 9 | **Why buy here** | cinematic | Stats → `FloorStats` | Big mono numbers on hairline grid: "1,200+ gadgets to try" · "45-min home setup" · "7-day easy exchange" · "4.8★ from 6,000+ buyers", count up |
| 10 | **Reviews** | shop | Testimonials → `ReviewWall` | White cards with star ratings, first name + who they are ("Aditi · B.Tech student", "Rahul · first-job laptop", "The Reddy family · 65" TV"), what they bought, two rows sliding in opposite directions |
| 11 | **Visit the store** | shop | custom → `VisitStore` | Wide showroom photo with the three room lights visible; right: opening hours, "Hitech City, Hyderabad", "Free parking · Demo zones · Trade-in desk", buttons "Book a demo" / "Get directions" (no real address or phone) |
| 12 | **Footer** | — | Footer → `CircuitFooter` | Dark footer, a thin orange circuit trace that draws across as you arrive, huge "CIRCUIT SQUARE" in Unbounded outline, link columns, "Concept website by Triozen Tech. Devices shown are unbranded concepts; prices are samples." |

Unchanged patterns imported: 0 (everything copied + restyled).

## Record timeline (section timeline, docs/RECORDING.md)

Final: **39.9 s after the 2.5 s loader** (~42.4 s in all), the same seconds on laptop and phone. Round 3 trimmed the hero walk (4.2 s), directory/room/offer/visit holds and a few moves; top picks (2.6 s, all 8 cards) and stats (2.3 s, counts finish) keep their holds.

| Stop | Move (s) | Hold (s) | What plays |
|---|---|---|---|
| Hero | 0 | 0.8 | sign + "Walk in." |
| Hero: inside | 4.2 | | doors open, 3 captions |
| Directory | 1 | 1 | rows light up |
| Each room: door → open | 1 / 0.9 / 0.9 → 1.2 | | the room photo is clear inside the doorway, the doorway opens in 1.2 s, the light switches |
| Computers | 0.9 | 2.8 | spotlight swaps a machine |
| Phones: shelf → end | 0.8 → 2.9 | 0.4 | shelf slides to the trade-in card |
| Neon bento | 0.9 | 3.3 | tiles light up in turn (beam + spotlight) |
| Offers | 1.3 | 1.1 | page is already white; numbers count up |
| Top picks | 1.1 | 2.6 | all 8 cards on screen (phone: the row glides through all 8), filters start after 3.4 s |
| Stats | 1 | 2.3 | counts finish: 1,200+ · 45 min · 7 days · 4.8★ |
| Reviews · Visit · Footer | 1 · 1.1 · 1 | 0 · 1 · 1 | |

**Round 2 changes:** room photos are no longer washed (soft colour pools behind text only, `.text-backdrop`); the neon room is darkened by a fixed overlay. Room 03 is now a **Neon bento** (TV big tile + 4 tiles, dark glass, border beam + spotlight lighting up in turn). The light switches back to the showroom ~60vh before the offers. Phone: Room 01 hides the model list and chips so heading + spotlight fit one screen. The page stays hidden until the loader's doors open, and a dark cover goes up as the page unloads, so a reload never flashes the old page.

## Uniqueness check

8 of 8 different from the last 3 sites, see the sites log.

## Assets needed

Nothing exists yet. Tool: **Google Flow**, images with **Nano Banana Pro**. **Every device must be unbranded**: add `unbranded, no logos, no brand names, no text` to every prompt, and check each result for fruit / letter logos on laptop lids and phone backs (regenerate if one appears).

**Style words for every photo** (one mood): `bright modern electronics showroom, clean white and light grey surfaces, soft even studio light, glossy polished floor, crisp and airy, photorealistic, unbranded, no logos, no brand names, no text`

### A. Hero video (the most important asset)

Template G (store fly-through), start + end frame, 16:9, 8 s:

- **Start image:** `Front view of a modern electronics showroom entrance at early evening, tall frameless glass sliding doors, closed, the bright white interior glowing behind the glass with hints of blue, warm white and purple light zones, a clean light-grey paved forecourt, a blank illuminated sign above the doors with no readable text, symmetrical, camera at eye height, calm space on the left, photorealistic, no people, no logos, no text`
- **End image:** `Inside the same showroom, looking straight down the wide central aisle, glossy white floor, white display tables with unbranded laptops, phones and headphones, three zones glowing: cool blue on the left, warm white in the middle, purple neon at the far end, bright and airy, same colour grade, no people, no logos, no text`
- **Video:** `Start frame to end frame. The camera glides forward slowly and smoothly toward the glass doors, the two glass doors slide open to the sides, and the camera flies through into the bright showroom, continuing forward down the centre aisle. One continuous shot, steady speed, no cuts, no camera shake, no people. no text, no logos`

Save as `raw/doors.mp4`. I'll run `npm run frames -- raw/doors.mp4 frames/circuit-doors --zoom 1.2 --max 160`.

### B. Cut-outs (transparent PNG, background removed in Photoroom / Adobe Express, **at least 1500 px wide**) → `raw/`

Make them in **one chat** so the angle and light match:
`[DEVICE], unbranded, no logo, product photo, three-quarter front view, centred, whole device in frame with space around it, plain light grey background, soft studio light, sharp, no shadow, no text, 4K resolution`

Room 01 · Computers
1. `laptop-ultra.png`: *a thin silver ultrabook laptop, open, screen showing a soft blue abstract wallpaper*
2. `laptop-creator.png`: *a 16-inch space-grey creator laptop, open, screen showing a colourful photo-editing style abstract gradient*
3. `laptop-gaming.png`: *a black gaming laptop with a subtle RGB keyboard glow, open, screen showing a dark abstract with blue light*
4. `desktop-aio.png`: *a slim white all-in-one desktop computer with keyboard and mouse, screen showing a pale blue abstract wallpaper*

Room 02 · Phones & tablets
5. `phone-a.png`: *a modern smartphone, back view at an angle showing a triple camera, sand-gold colour*
6. `phone-b.png`: *a modern smartphone, front view, screen showing a warm abstract wallpaper, midnight blue edges*
7. `phone-fold.png`: *a foldable smartphone half-open like a book, graphite colour*
8. `tablet.png`: *a tablet with a thin stylus beside it, screen showing a warm abstract wallpaper, silver*

Room 03 · Audio, TV & gaming
9. `headphones.png`: *over-ear wireless headphones, matte black with a soft purple sheen*
10. `speaker.png`: *a cylindrical portable bluetooth speaker, dark grey fabric*
11. `tv.png`: *a 65-inch ultra-thin 4K TV on a slim stand, front view, screen showing a vivid purple and magenta abstract*
12. `console.png`: *a white game console standing upright with one wireless controller in front of it, generic design*
13. `earbuds.png`: *a pair of white wireless earbuds in an open charging case*

### C. Photos (16:9, at least 2560 px wide, add the style words) → `raw/`

The 3 room photos are **must-haves**: they are the backdrops you walk into through each doorway. Add to each: `seen from the doorway at eye level looking into the room, calm uncluttered middle of the frame, background slightly soft` so the products we place on top stay clear.

14. `room-computers.jpg`: `a showroom zone with rows of open unbranded laptops on white tables, cool blue light from the ceiling, blue glow on the floor, no people`
15. `room-phones.jpg`: `a showroom zone with phones and tablets on white pedestals, warm white light, soft wood accents, no people`
16. `room-neon.jpg`: `a dark gaming and home-theatre zone, a large TV wall, gaming chairs, headphones on stands, purple neon strips on the ceiling and floor, no people` (for this one, leave out "bright" and "clean white" from the style words)
17. `store-wide.jpg`: `wide view of the whole showroom from above the entrance, the three zones blue, warm white and purple visible at once, bright, no people`

**Total: 1 video (2 key images), 13 cut-outs, 4 photos.** Must-haves: the **doors video**, the **13 device cut-outs** and the **3 room photos** (14–16). Only `store-wide.jpg` is optional; without it the Visit section uses the end frame of the doors video.

## Assets status (29 Sep)

All in. `doors.mp4` → first 6 s only (it dissolves into another store after ~6.2 s) → `public/frames/circuit-doors` (144 frames, `--zoom 1.2`, 8 MB). Two laptops on the right showed a small round mark on their lids in frames ~90–141; both marks are painted out frame by frame (local median fill, script kept in `raw/patch.py`). The 13 cut-outs are trimmed WebP; the 3 room photos are cropped 260 px on each side to remove the dark door-frame edges (and a small watermark in the phones photo), since the doorway is drawn in code. No `store-wide.jpg`: Visit uses the doors video's last frame (`store-floor.webp`).

## Polish pass (29 Sep)

- **Computers doorway:** the closed doorway frames the laptops/monitors (`focus` on the photo, in photo coordinates so it works on phone too) and zooms out to the whole room as it opens. The photo is a real "cover"-sized box so any part of it can be framed.
- **Leaving the neon room:** the light still switches early (deals always appear on white), but the dock keeps "03 · Audio & TV" and the offer ticker stays hidden until the Deals section starts (`data-dock` / `data-dock-start` points, RoomLights).
- **Neon stop (laptop):** stops 250 px above the bento so "Turn it up." and all 5 tiles are in view; phone keeps the bento stop.
- **Calmer motion:** laptop swap is a cross-fade (old drifts left and fades, new settles in), room light change 1.3 s, neon beam 2.4 s per lap, each tile lit 1.3 s. Timeline unchanged: 39.9 s, laptop and phone in sync.

## Final timing (Round 3)

**41.9 s after the 2.5 s loader**, laptop and phone in sync. Phone holds 1 s longer on top picks (3.6 s, the row glides through all 8 cards, filters wait 4.4 s so every card stays bright); to stay in sync the laptop takes 1 s longer to scroll on to the stats. The footer holds 2 s on CIRCUIT SQUARE. Phone: the exchange tile's phone sits further right so "₹25,000" is never covered.

