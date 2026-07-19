// Canonical seed data for BTS Lab: brands, sample models, and the full
// grouped problem list. Kept in one place so the seed script (and any future
// admin reset) share a single source of truth.

export type SeedBrand = {
  name: string;
  slug: string;
  logo: string;
  models: SeedModel[];
};

export type SeedModel = {
  name: string;
  slug: string;
  series: string;
};

export type SeedCategory = {
  name: string;
  problems: string[];
};

export type SeedReview = {
  author: string;
  rating: number;
  text: string;
  service: string;
};

export const GOOGLE_REVIEWS: SeedReview[] = [
  {
    author: "Rajesh Karki",
    rating: 5,
    text: "Got my iPhone 12 screen replaced here. Genuine OLED, perfect touch, and done the same day. Fair price and very professional staff.",
    service: "Screen replacement",
  },
  {
    author: "Sushmita Gurung",
    rating: 5,
    text: "They revived my water-damaged phone after two other shops gave up. Kept me updated the whole time. Highly recommend BTS Lab.",
    service: "Water damage rescue",
  },
  {
    author: "Bibek Shrestha",
    rating: 5,
    text: "Sold my old Samsung through their buyback — instant payment, no haggling drama. Smoothest experience I've had.",
    service: "Buyback",
  },
  {
    author: "Anita Tamang",
    rating: 5,
    text: "Battery was draining in hours. New genuine battery + full diagnostic and it lasts all day again. Honest people.",
    service: "Battery replacement",
  },
  {
    author: "Prakash Adhikari",
    rating: 5,
    text: "Motherboard-level repair on a dead OnePlus — nobody else in town would touch it. These guys fixed it. Real technicians.",
    service: "Motherboard repair",
  },
  {
    author: "Melina Rai",
    rating: 5,
    text: "Doorstep pickup and delivery made it so easy. Camera fixed and recalibrated perfectly. Warranty gave me peace of mind.",
    service: "Camera repair",
  },
];

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// --- helper to build models with slugs from a series map ---
function modelsFromSeries(series: Record<string, string[]>): SeedModel[] {
  const out: SeedModel[] = [];
  for (const [seriesName, names] of Object.entries(series)) {
    for (const name of names) {
      out.push({ name, slug: slugify(name), series: seriesName });
    }
  }
  return out;
}

export const BRANDS: SeedBrand[] = [
  {
    name: "Apple",
    slug: "apple",
    logo: "/images/brands/apple.svg",
    models: modelsFromSeries({
      "iPhone 11": ["iPhone 11", "iPhone 11 Pro", "iPhone 11 Pro Max"],
      "iPhone 12": ["iPhone 12 Mini", "iPhone 12", "iPhone 12 Pro", "iPhone 12 Pro Max"],
      "iPhone 13": ["iPhone 13 Mini", "iPhone 13", "iPhone 13 Pro", "iPhone 13 Pro Max"],
      "iPhone 14": ["iPhone 14", "iPhone 14 Plus", "iPhone 14 Pro", "iPhone 14 Pro Max"],
      "iPhone 15": ["iPhone 15", "iPhone 15 Plus", "iPhone 15 Pro", "iPhone 15 Pro Max"],
      "iPhone SE": ["iPhone SE (2nd gen)", "iPhone SE (3rd gen)"],
    }),
  },
  {
    name: "Samsung",
    slug: "samsung",
    logo: "/images/brands/samsung.svg",
    models: modelsFromSeries({
      "Galaxy S24": ["Galaxy S24", "Galaxy S24+", "Galaxy S24 Ultra"],
      "Galaxy S23": ["Galaxy S23", "Galaxy S23+", "Galaxy S23 Ultra"],
      "Galaxy A": ["Galaxy A55", "Galaxy A35", "Galaxy A25", "Galaxy A15"],
      "Galaxy Z": ["Galaxy Z Flip 5", "Galaxy Z Fold 5"],
    }),
  },
  {
    name: "Xiaomi",
    slug: "xiaomi",
    logo: "/images/brands/xiaomi.svg",
    models: modelsFromSeries({
      "Xiaomi 14": ["Xiaomi 14", "Xiaomi 14 Ultra"],
      "Redmi Note 13": ["Redmi Note 13", "Redmi Note 13 Pro", "Redmi Note 13 Pro+"],
      "Poco": ["Poco X6", "Poco F6"],
    }),
  },
  {
    name: "OnePlus",
    slug: "oneplus",
    logo: "/images/brands/oneplus.svg",
    models: modelsFromSeries({
      "OnePlus 12": ["OnePlus 12", "OnePlus 12R"],
      "OnePlus 11": ["OnePlus 11"],
      "OnePlus Nord": ["OnePlus Nord 3", "OnePlus Nord CE 4"],
    }),
  },
  {
    name: "OPPO",
    slug: "oppo",
    logo: "/images/brands/oppo.svg",
    models: modelsFromSeries({
      Reno: ["Reno 11 Pro", "Reno 11", "Reno 10"],
      "Find X": ["Find X7", "Find X7 Ultra"],
      A: ["OPPO A79", "OPPO A58"],
    }),
  },
  {
    name: "VIVO",
    slug: "vivo",
    logo: "/images/brands/vivo.svg",
    models: modelsFromSeries({
      V: ["Vivo V30 Pro", "Vivo V29"],
      Y: ["Vivo Y100", "Vivo Y28"],
      T: ["Vivo T3"],
    }),
  },
  {
    name: "Realme",
    slug: "realme",
    logo: "/images/brands/realme.svg",
    models: modelsFromSeries({
      "Realme 12": ["Realme 12 Pro+", "Realme 12 Pro"],
      Narzo: ["Narzo 70", "Narzo 60"],
      C: ["Realme C67", "Realme C55"],
    }),
  },
  {
    name: "Google",
    slug: "google",
    logo: "/images/brands/google.svg",
    models: modelsFromSeries({
      "Pixel 8": ["Pixel 8", "Pixel 8 Pro", "Pixel 8a"],
      "Pixel 7": ["Pixel 7", "Pixel 7 Pro", "Pixel 7a"],
    }),
  },
];

// Full grouped problem list (shared across all models).
export const PROBLEM_CATEGORIES: SeedCategory[] = [
  {
    name: "Display",
    problems: [
      "Ghost Touch",
      "No Frame",
      "Frame Change",
      "Display Swap",
      "TrueTone Copy",
      "Display Loose",
      "Display Damage",
      "Display Fitting",
      "Display Messages Remove",
      "Display Change",
      "Cracked Glass",
      "Touch Issue",
      "Display Flickering",
      "Blank Display (Display Dead)",
      "White Display",
      "Yellow Display",
      "Green Display",
      "Line In Display",
    ],
  },
  {
    name: "Audio",
    problems: [
      "Front Speaker Not Working",
      "Main Speaker Not Working",
      "Speaker Low Sound",
      "Mic Not Working",
      "Mic Distort",
    ],
  },
  {
    name: "Body",
    problems: [
      "Back Panel Laser",
      "Rough Housing",
      "Broken Back Panel",
      "Housing Bend",
      "Housing Change",
    ],
  },
  {
    name: "Charging",
    problems: ["Not Charging", "Charging Port Loose"],
  },
  {
    name: "Camera/Flash",
    problems: ["Flash Light Not Working"],
  },
  {
    name: "Connectivity",
    problems: [
      "Low Network",
      "WiFi Not Working",
      "Bluetooth Not Working",
      "Network Issue",
      "SIM Lock",
    ],
  },
  {
    name: "Software / Security",
    problems: ["Bypass"],
  },
  {
    name: "Board / Power",
    problems: ["Dead"],
  },
  {
    name: "Software / Board",
    problems: ["Auto Restart", "CPU Lag", "Hang On Logo"],
  },
  {
    name: "Board / Storage",
    problems: ["Hard Disk Issue"],
  },
  {
    name: "Liquid",
    problems: ["Water Proofing", "Water Damage", "Moisture Detection"],
  },
  {
    name: "Maintenance",
    problems: ["Servicing"],
  },
  {
    name: "Buttons / Controls",
    problems: [
      "Vibration Not Working",
      "Home Button Not Working",
      "Power Button Not Working",
      "Volume Button Not Working",
      "Ringer Slider",
    ],
  },
  {
    name: "Battery",
    problems: [
      "Battery Welding",
      "Battery Swap",
      "Battery Change",
      "Battery Drop",
      "Battery Swollen",
      "Battery Health Not Shown",
      "Battery Boost",
      "Battery Draining",
    ],
  },
  {
    name: "Camera/FaceID",
    problems: [
      "Front Camera Portrait Not Working",
      "Black Spot In Main Camera",
      "Camera Glass Cracked",
      "Camera Change",
      "Rear Camera Not Working",
      "Front Camera Not Working",
      "Face ID Not Working",
      "Blur In Main Camera",
      "Main Camera Motor Not Working",
    ],
  },
  {
    name: "Other",
    problems: ["Other"],
  },
];

export { slugify };
