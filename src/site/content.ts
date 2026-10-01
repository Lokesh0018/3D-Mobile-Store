// All text and data for Circuit Square. Devices are unbranded concepts; prices are samples.

export const STUDIO = "Triozen Tech";

export const store = {
  name: "Circuit Square",
  hours: "Open today · 11 am – 10 pm",
  area: "Hitech City, Hyderabad",
};

export const hero = {
  frames: "/frames/circuit-doors",
  sign: "CIRCUIT SQUARE",
  eyebrow: "Hyderabad · Hitech City",
  title: ["Walk in."],
  subtitle: "Hyderabad's brightest gadget showroom. Every device switched on and ready to try.",
  buttons: [
    { label: "Start the tour", href: "#computers" },
    { label: "Today's offers", href: "#deals" },
  ],
  facts: ["10,000 sq ft", "1,200+ gadgets on display", "3 rooms"],
  captions: [
    { at: 0.3, title: "Every gadget. One floor.", text: "Laptops, phones, audio, TVs and gaming, all under one roof." },
    { at: 0.56, title: "Try before you buy.", text: "Pick it up, play a round, hear the difference. Nothing sits in a box." },
    { at: 0.8, title: "Three rooms. Let's go.", text: "Follow the light." },
  ],
};

export const directory = {
  eyebrow: "Floor directory · Ground floor",
  heading: "Three rooms. One walk.",
  rows: [
    { no: "01", zone: "computers" as const, title: "Computers", note: "Laptops · desktops · monitors", count: "320+ on display", image: "/images/circuit/laptop-ultra.webp", light: "Cool blue" },
    { no: "02", zone: "phones" as const, title: "Phones & tablets", note: "Phones · foldables · tablets", count: "450+ on display", image: "/images/circuit/phone-fold.webp", light: "Warm white" },
    { no: "03", zone: "neon" as const, title: "Audio, TV & gaming", note: "Headphones · speakers · TVs · consoles", count: "430+ on display", image: "/images/circuit/headphones.webp", light: "Purple neon" },
  ],
};

export type Device = {
  image: string;
  name: string;
  kind: string;
  price: string;
  emi?: string;
  specs: string[];
  colors?: string[];
  badge?: string;
};

export const computers = {
  id: "computers",
  photo: "/images/circuit/room-computers.webp",
  room: "Room 01",
  title: "Computers",
  heading: ["Built to work.", "Fast to play."],
  text: "Thin laptops for college, big screens for creators and loud machines for gamers. Open any lid, they're all on.",
  chips: ["For students", "For creators", "For gamers", "For home"],
  items: [
    { image: "/images/circuit/laptop-ultra.webp", name: "Aero 14", kind: "Ultrabook", price: "₹74,990", emi: "₹6,249/mo × 12", specs: ['14" 2.8K display', "16 GB · 1 TB", "1.2 kg, 18 h battery"], badge: "Student pick" },
    { image: "/images/circuit/laptop-creator.webp", name: "Studio 16", kind: "Creator laptop", price: "₹1,24,990", emi: "₹10,416/mo × 12", specs: ['16" colour-true display', "32 GB · 1 TB", "8 GB graphics"] },
    { image: "/images/circuit/laptop-gaming.webp", name: "Vortex 15", kind: "Gaming laptop", price: "₹1,09,990", emi: "₹9,166/mo × 12", specs: ['15.6" 165 Hz display', "8 GB graphics", "RGB keyboard"], badge: "New" },
    { image: "/images/circuit/desktop-aio.webp", name: "Canvas 24", kind: "All-in-one desktop", price: "₹84,990", emi: "₹7,083/mo × 12", specs: ['24" 4K display', "Keyboard + mouse in the box", "Family favourite"] },
  ] satisfies Device[],
};

export const phones = {
  id: "phones",
  photo: "/images/circuit/room-phones.webp",
  room: "Room 02",
  title: "Phones & tablets",
  heading: ["Pocket-sized.", "Picture perfect."],
  text: "Hold them, test the cameras, compare side by side. Bring your old phone and swap it on the spot.",
  items: [
    { image: "/images/circuit/phone-a.webp", name: "Nova 5 Pro", kind: "Phone", price: "₹54,999", emi: "₹4,583/mo", specs: ["Triple 50 MP camera", "5,000 mAh"], colors: ["#d8c3a0", "#1d2433", "#a9b8a4"], badge: "Bestseller" },
    { image: "/images/circuit/phone-b.webp", name: "Nova 5", kind: "Phone", price: "₹32,999", emi: "₹2,749/mo", specs: ['6.7" 120 Hz screen', "All-day battery"], colors: ["#e8743b", "#1d2433", "#e9e4dc"] },
    { image: "/images/circuit/phone-fold.webp", name: "Fold X", kind: "Foldable", price: "₹1,29,999", emi: "₹10,833/mo", specs: ['7.6" inner screen', "Opens like a book"], colors: ["#3a3d44", "#c9c3d6"], badge: "New" },
    { image: "/images/circuit/tablet.webp", name: "Slate 11", kind: "Tablet + pen", price: "₹38,999", emi: "₹3,249/mo", specs: ['11" 2.5K screen', "Pen in the box"], colors: ["#c8ccd2", "#2c3038"] },
  ] satisfies Device[],
  trade: { title: "Swap your old phone", text: "Instant exchange value at the counter.", value: "Up to ₹25,000 off" },
};

export const neon = {
  id: "neon",
  photo: "/images/circuit/room-neon.webp",
  room: "Room 03",
  title: "Audio, TV & gaming",
  heading: ["Turn it up."],
  text: "A dark room built for sound and screens. Sit down, put the headphones on, grab a controller.",
  // first item = the big tile
  items: [
    { image: "/images/circuit/tv.webp", name: "Vista 65", kind: '65" 4K TV', price: "₹84,990", emi: "₹7,083/mo", specs: ["4K HDR · 120 Hz · free wall-mount + setup"] },
    { image: "/images/circuit/headphones.webp", name: "Pulse Max", kind: "Headphones", price: "₹19,990", specs: ["40 h battery · noise cancelling"] },
    { image: "/images/circuit/speaker.webp", name: "Boom Tube", kind: "360° speaker", price: "₹8,990", specs: ["Waterproof · 20 h party mode"] },
    { image: "/images/circuit/console.webp", name: "Arcade One", kind: "Console + controller", price: "₹49,990", specs: ["4K gaming · 1 TB storage"] },
    { image: "/images/circuit/earbuds.webp", name: "Pulse Buds", kind: "Earbuds", price: "₹6,990", specs: ["32 h with case · clear calls"] },
  ] satisfies Device[],
};

export const offers = {
  eyebrow: "Today's offers",
  heading: "Deals at the counter.",
  ticker: ["No-cost EMI on 6 & 9 months", "Exchange up to ₹25,000", "Student deal: extra 10% off", "Free setup across Hyderabad", "Weekend TV fest: up to 30% off"],
  tiles: [
    { size: "lg", tag: "EMI", title: "No-cost EMI", big: "₹1,999", unit: "/month", text: "Take home any laptop, phone or TV from ₹1,999 a month. 6 and 9 month plans, zero extra cost.", image: "/images/circuit/laptop-creator.webp" },
    { size: "wide", tag: "Exchange", title: "Swap your old phone", big: "₹25,000", unit: " off", text: "Instant value at the trade-in desk.", image: "/images/circuit/phone-a.webp" },
    { size: "sm", tag: "Students", title: "Student deal", big: "10%", unit: " extra", text: "Show your college ID." },
    { size: "sm", tag: "Setup", title: "Same-day delivery", big: "45", unit: " min setup", text: "Free home setup in Hyderabad." },
  ],
};

export const picks = {
  eyebrow: "Top picks this week",
  heading: "What everyone's buying.",
  filters: ["All", "Laptops", "Phones", "Audio", "TV & gaming"],
  items: [
    { image: "/images/circuit/laptop-ultra.webp", name: "Aero 14 Ultrabook", cat: "Laptops", price: "₹74,990", old: "₹82,990", emi: "or ₹6,249/mo", badge: "-10%" },
    { image: "/images/circuit/phone-a.webp", name: "Nova 5 Pro", cat: "Phones", price: "₹54,999", emi: "or ₹4,583/mo", badge: "Bestseller" },
    { image: "/images/circuit/earbuds.webp", name: "Pulse Buds", cat: "Audio", price: "₹6,990", old: "₹8,490", emi: "or ₹583/mo", badge: "-18%" },
    { image: "/images/circuit/tv.webp", name: 'Vista 65" 4K TV', cat: "TV & gaming", price: "₹84,990", old: "₹1,09,990", emi: "or ₹7,083/mo", badge: "TV fest" },
    { image: "/images/circuit/laptop-gaming.webp", name: "Vortex 15 Gaming", cat: "Laptops", price: "₹1,09,990", emi: "or ₹9,166/mo" },
    { image: "/images/circuit/tablet.webp", name: "Slate 11 + Pen", cat: "Phones", price: "₹38,999", emi: "or ₹3,249/mo", badge: "Student pick" },
    { image: "/images/circuit/headphones.webp", name: "Pulse Max ANC", cat: "Audio", price: "₹19,990", old: "₹24,990", emi: "or ₹1,666/mo" },
    { image: "/images/circuit/console.webp", name: "Arcade One Bundle", cat: "TV & gaming", price: "₹49,990", emi: "or ₹4,166/mo", badge: "New" },
  ],
};

export const stats = [
  { n: 1200, suffix: "+", label: "gadgets to try, switched on" },
  { n: 45, suffix: " min", label: "home setup, anywhere in the city" },
  { n: 7, suffix: " days", label: "easy exchange, no questions" },
  { n: 4.8, decimals: 1, suffix: "★", label: "from 6,000+ happy buyers" },
];

export const reviews = {
  eyebrow: "Reviews",
  heading: "Heard on the floor.",
  items: [
    { name: "Aditi", who: "B.Tech student", bought: "Aero 14", text: "Tried five laptops in ten minutes. Walked out with the light one and the student discount." },
    { name: "Rahul", who: "First job, first laptop", bought: "Studio 16", text: "They let me edit a video on it before I paid. The EMI made it easy." },
    { name: "The Reddy family", who: "Kondapur", bought: 'Vista 65" TV', text: "Delivered and wall-mounted the same evening. The kids haven't left the sofa." },
    { name: "Farhan", who: "Gamer", bought: "Arcade One", text: "The neon room is unreal. Played a full match before deciding." },
    { name: "Sneha", who: "Designer", bought: "Slate 11 + Pen", text: "Compared three tablets side by side with the pen. No pressure, just help." },
    { name: "Vikram", who: "Swapped an old phone", bought: "Nova 5 Pro", text: "Got a fair exchange price in two minutes. Data moved over while I waited." },
  ],
};

export const visit = {
  eyebrow: "Visit the store",
  heading: ["Come say hi.", "Everything's on."],
  image: "/images/circuit/store-floor.webp",
  details: [
    { k: "Hours", v: "Every day · 11 am – 10 pm" },
    { k: "Where", v: "Hitech City, Hyderabad" },
    { k: "On the floor", v: "Demo zones · Trade-in desk · Free parking" },
  ],
  buttons: [
    { label: "Book a demo", href: "#" },
    { label: "Get directions", href: "#" },
  ],
};

export const footer = {
  columns: [
    { title: "Shop", links: ["Laptops", "Phones", "Tablets", "Audio", "TVs", "Gaming"] },
    { title: "Help", links: ["No-cost EMI", "Exchange", "Home setup", "Warranty"] },
    { title: "Store", links: ["Book a demo", "Directions", "Careers"] },
  ],
  note: `Concept website by ${STUDIO}. Circuit Square is a design concept; all devices are unbranded and prices are samples.`,
};
