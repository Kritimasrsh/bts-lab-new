import type { StackItem } from "@/components/StackingCards";
import { SHOWCASE_SERVICES } from "@/lib/data/services";

// Real repair imagery paired to each showcase service (same order).
const IMAGES = [
  "/images/screen-repair.jpg", // Screen & Display
  "/images/battery-and-power.jpg", // Battery & Power
  "/images/motherboard-reapair.jpg", // Motherboard / Board-level
  "/images/water-damage-rescue.png", // Water Damage
  "/images/camera-faceid.jpg", // Camera & Face ID
  "/images/audio-buttons-body.jpg", // Audio, Buttons & Body
  "/images/laptop-tablet-repair.avif", // Tablet & Laptop
];

/** Showcase services mapped to stacking-card items. */
export const SERVICE_STACK: StackItem[] = SHOWCASE_SERVICES.map((s, i) => ({
  title: s.title,
  tagline: s.tagline,
  description: s.desc,
  image: IMAGES[i] ?? IMAGES[0],
  points: s.covers,
  meta: s.turnaround,
  href: "/repair",
}));
