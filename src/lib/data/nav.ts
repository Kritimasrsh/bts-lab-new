import { BRANDS } from "@/lib/data/brands";

export type NavLink = {
  label: string;
  href: string;
  desc?: string;
};

export type NavColumn = {
  heading: string;
  links: NavLink[];
};

export type NavItem = {
  label: string;
  href: string;
  /** When present, hovering/focusing opens a mega-menu with these columns. */
  columns?: NavColumn[];
  /** Optional promo card shown on the right side of the mega-menu. */
  promo?: {
    title: string;
    desc: string;
    ctaLabel: string;
    href: string;
  };
};

// Quick-action bar shown at the bottom of every open mega-menu (Asana-style).
export const NAV_FOOTER: NavLink[] = [
  { label: "Track my repair", href: "/services" },
  { label: "Free diagnostics", href: "/contact" },
  { label: "Call us", href: "tel:+9779866754678" },
];

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Repair",
    href: "/services",
    columns: [
      {
        heading: "By Service",
        links: [
          { label: "Screen replacement", href: "/services", desc: "Cracked & unresponsive displays" },
          { label: "Battery replacement", href: "/services", desc: "Drains fast? Fresh cells" },
          { label: "Water damage rescue", href: "/services", desc: "Board-level corrosion care" },
          { label: "Motherboard repair", href: "/services", desc: "Micro-soldering & diagnostics" },
        ],
      },
      {
        heading: "By Device",
        links: [
          { label: "Phone repair", href: "/services", desc: "iPhone, Samsung, Xiaomi & more" },
          { label: "Tablet repair", href: "/services", desc: "iPad & Android tablets" },
          { label: "Laptop repair", href: "/services", desc: "MacBook, Windows & PC" },
          { label: "Free diagnostics", href: "/contact", desc: "We find it before we quote" },
        ],
      },
    ],
    promo: {
      title: "Not sure what's wrong?",
      desc: "Pick your brand and model, tell us the problem, and get an instant estimate.",
      ctaLabel: "Start a repair",
      href: "/services",
    },
  },
  {
    label: "Devices",
    href: "/services",
    columns: [
      {
        heading: "Popular brands",
        links: BRANDS.slice(0, 5).map((b) => ({
          label: b.name,
          href: `/repair/${b.slug}`,
        })),
      },
      {
        heading: "More brands",
        links: BRANDS.slice(5, 10).map((b) => ({
          label: b.name,
          href: `/repair/${b.slug}`,
        })),
      },
    ],
    promo: {
      title: "Every major brand",
      desc: "From flagships to budget phones — if it powers on (or doesn't), we can help.",
      ctaLabel: "Browse all brands",
      href: "/#select-brand",
    },
  },
  {
    label: "Shop",
    href: "/shop",
    columns: [
      {
        heading: "Buy",
        links: [
          { label: "Refurbished phones", href: "/shop", desc: "Tested & warrantied" },
          { label: "Accessories", href: "/shop", desc: "Cases, chargers, cables" },
        ],
      },
      {
        heading: "Sell & trade",
        links: [
          { label: "Sell your phone", href: "/contact", desc: "Fair, instant quotes" },
          { label: "Trade-in", href: "/contact", desc: "Upgrade for less" },
        ],
      },
    ],
  },
  {
    label: "Company",
    href: "/about",
    columns: [
      {
        heading: "About",
        links: [
          { label: "About BTS Lab", href: "/about", desc: "Who we are" },
          { label: "Blog", href: "/blog", desc: "Tips & guides" },
        ],
      },
      {
        heading: "Get in touch",
        links: [
          { label: "Contact", href: "/contact", desc: "Visit or call us" },
          { label: "Reviews", href: "/#reviews", desc: "What customers say" },
        ],
      },
    ],
  },
];
