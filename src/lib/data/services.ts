export type ServiceAccent = "violet" | "coral" | "sun" | "mint";

export type Service = {
  icon: string;
  title: string;
  desc: string;
  price: string;
  code: string;
  accent: ServiceAccent;
};

export const SERVICES: Service[] = [
  {
    icon: "📱",
    title: "Screen replacement",
    desc: "LCD, OLED & AMOLED swaps for iPhone, Samsung, Xiaomi, Oppo, Vivo and more, with touch calibration on every job.",
    price: "From ₨2,999",
    code: "TKT-01",
    accent: "violet",
  },
  {
    icon: "🔋",
    title: "Battery replacement",
    desc: "Original and high-capacity batteries, safe disposal of the old one, and a full health diagnostic.",
    price: "From ₨1,499",
    code: "TKT-02",
    accent: "coral",
  },
  {
    icon: "💧",
    title: "Water damage rescue",
    desc: "Ultrasonic cleaning and board-level corrosion treatment—we've saved phones others called dead.",
    price: "From ₨3,999",
    code: "TKT-03",
    accent: "mint",
  },
  {
    icon: "🧩",
    title: "Back glass & housing",
    desc: "Laser-precision back glass replacement that keeps wireless charging fully intact.",
    price: "From ₨2,499",
    code: "TKT-04",
    accent: "sun",
  },
  {
    icon: "🛠️",
    title: "Motherboard repair",
    desc: "Chip-level diagnostics and micro-soldering for charging ports, boot loops and shorted boards.",
    price: "Custom quote",
    code: "TKT-05",
    accent: "violet",
  },
  {
    icon: "🩺",
    title: "Free diagnostics",
    desc: "Not sure what's wrong? We check it properly before you spend a single rupee.",
    price: "Always free",
    code: "TKT-06",
    accent: "coral",
  },
  {
    icon: "🔊",
    title: "Speaker & mic repair",
    desc: "Crackling calls or silent speakers fixed with genuine replacement components.",
    price: "From ₨999",
    code: "TKT-07",
    accent: "mint",
  },
  {
    icon: "📷",
    title: "Camera module repair",
    desc: "Blurry, black, or cracked camera lenses replaced and recalibrated.",
    price: "From ₨1,999",
    code: "TKT-08",
    accent: "sun",
  },
  {
    icon: "🔓",
    title: "Software & unlocking",
    desc: "OS troubleshooting, data recovery support, and carrier unlocking.",
    price: "From ₨799",
    code: "TKT-09",
    accent: "violet",
  },
];

// Broader service categories for the homepage showcase wheel. Richer content,
// no prices — meant to fill the section and communicate range.
export type ShowcaseService = {
  icon: string;
  title: string;
  tagline: string;
  desc: string;
  covers: string[];
  turnaround: string;
};

export const SHOWCASE_SERVICES: ShowcaseService[] = [
  {
    icon: "📱",
    title: "Screen & Display",
    tagline: "Cracks, dead pixels, ghost touch",
    desc: "OLED, AMOLED and LCD replacement with full touch calibration and True Tone preserved where possible — so your display looks and feels original.",
    covers: ["Cracked / broken glass", "Ghost touch & dead zones", "Lines, flicker & discoloration", "Digitizer & frame fitting"],
    turnaround: "Most done same day",
  },
  {
    icon: "🔋",
    title: "Battery & Power",
    tagline: "Draining fast, won't charge, dead",
    desc: "Genuine and high-capacity cells fitted with a full power-system diagnostic, safe disposal of the old battery and a health report.",
    covers: ["Fast draining & swelling", "Battery health not showing", "Not charging / port loose", "Boot & power faults"],
    turnaround: "30–60 min walk-in",
  },
  {
    icon: "🛠️",
    title: "Motherboard / Board-level",
    tagline: "The repairs others refuse",
    desc: "Chip-level diagnostics and micro-soldering for the faults most shops won't touch — under a microscope, by certified board engineers.",
    covers: ["Boot loops & hang on logo", "Charging IC & power faults", "Shorted / dead boards", "Data recovery attempts"],
    turnaround: "1–3 days after diagnosis",
  },
  {
    icon: "💧",
    title: "Water Damage Rescue",
    tagline: "Spilled, dropped, submerged",
    desc: "Ultrasonic cleaning and board-level corrosion treatment. The sooner it reaches us, the more we can save — we've revived phones declared dead.",
    covers: ["Corrosion cleaning", "Moisture-triggered faults", "Post-liquid diagnostics", "Component-level restore"],
    turnaround: "Bring it in fast",
  },
  {
    icon: "📷",
    title: "Camera & Face ID",
    tagline: "Blurry, black, not focusing",
    desc: "Front and rear camera modules, lenses and Face ID components replaced and recalibrated for sharp, reliable shots and secure unlock.",
    covers: ["Blur / black spots", "Cracked camera glass", "Face ID not working", "Focus motor faults"],
    turnaround: "Same day, most models",
  },
  {
    icon: "🔊",
    title: "Audio, Buttons & Body",
    tagline: "Speakers, mics, housing, keys",
    desc: "From silent speakers and distorted mics to bent housings, dead buttons and back-glass replacement — the everyday fixes that make a phone whole.",
    covers: ["Speaker & mic issues", "Power / volume / home keys", "Back glass & housing", "Vibration motor"],
    turnaround: "Same day, most models",
  },
  {
    icon: "💻",
    title: "Tablet & Laptop Repair",
    tagline: "iPad, MacBook, Windows & PC",
    desc: "Beyond phones — we service tablets and laptops too: screens, batteries, keyboards, ports and board-level faults across all major brands.",
    covers: ["iPad & Android tablets", "MacBook & Windows laptops", "Keyboard & port repair", "Screen & battery swaps"],
    turnaround: "Quote after diagnosis",
  },
];