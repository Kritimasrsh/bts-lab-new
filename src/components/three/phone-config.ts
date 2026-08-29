/**
 * iPhone 17 Pro Max — procedural exploded-view configuration.
 *
 * The phone is built in local space: X = width, Y = height, Z = thickness
 * (+Z is the screen side). Each part has an assembled position and an
 * exploded offset along the stack axis; scroll progress lerps between them.
 */

export const PHONE = {
  width: 1.6,
  height: 3.3,
  depth: 0.17,
  radius: 0.26,
} as const;

export const COLORS = {
  orange: "#ff6b1a",
  orangeSoft: "#ff9a4d",
  housing: "#e86f24",
  housingDeep: "#b34e12",
  glass: "#8fa3b8",
  panel: "#101216",
  layer: "#1c1f24",
  frame: "#f07a2e",
  pcb: "#14100d",
  chip: "#2a2622",
  gold: "#c9a86a",
  battery: "#2b2e33",
  copper: "#c47b3f",
  steel: "#3a3d42",
} as const;

export type PartId =
  | "ceramicShield"
  | "display"
  | "digitizer"
  | "displayFrame"
  | "frontCamera"
  | "chassis"
  | "logicBoard"
  | "rearCamera"
  | "battery"
  | "magsafe"
  | "taptic"
  | "speaker"
  | "chargePort"
  | "sideButtons"
  | "backHousing";

export type PartConfig = {
  id: PartId;
  /** assembled position (local phone space) */
  base: [number, number, number];
  /** fully exploded position */
  exploded: [number, number, number];
  /** 0..1 — later stagger values start moving later in the explode */
  stagger: number;
};

/**
 * Exploded stack: screen layers fan toward +Z (screen up when the phone is
 * laid back), internals and housing toward -Z — mirroring the reference
 * exploded render.
 */
export const PARTS: PartConfig[] = [
  { id: "ceramicShield", base: [0, 0, 0.105], exploded: [0, 0, 2.4], stagger: 0.0 },
  { id: "display",       base: [0, 0, 0.075], exploded: [0, 0, 1.9], stagger: 0.04 },
  { id: "digitizer",     base: [0, 0, 0.05],  exploded: [0, 0, 1.45], stagger: 0.08 },
  { id: "displayFrame",  base: [0, 0, 0.03],  exploded: [0, 0, 1.05], stagger: 0.12 },
  { id: "frontCamera",   base: [0.18, 1.38, 0.02], exploded: [0.5, 1.35, 0.7], stagger: 0.16 },
  { id: "chassis",       base: [0, 0, 0],     exploded: [0, 0, 0.5], stagger: 0.2 },
  { id: "logicBoard",    base: [-0.28, 0.55, -0.015], exploded: [-0.28, 0.55, 0.05], stagger: 0.22 },
  { id: "rearCamera",    base: [0.42, 1.15, -0.03],  exploded: [0.95, 1.1, -0.3], stagger: 0.24 },
  { id: "battery",       base: [0.05, -0.35, -0.02], exploded: [0.05, -0.3, -0.65], stagger: 0.26 },
  { id: "magsafe",       base: [0.05, -0.3, -0.045], exploded: [0.05, -0.55, -1.15], stagger: 0.3 },
  { id: "taptic",        base: [-0.5, -1.35, -0.02], exploded: [-0.85, -1.35, -1.35], stagger: 0.34 },
  { id: "speaker",       base: [0.5, -1.35, -0.02],  exploded: [0.85, -1.35, -1.35], stagger: 0.34 },
  { id: "chargePort",    base: [0, -1.58, -0.02],    exploded: [0, -1.7, -1.6], stagger: 0.38 },
  { id: "sideButtons",   base: [0.82, 0.7, -0.01],   exploded: [1.35, 0.7, -0.95], stagger: 0.3 },
  { id: "backHousing",   base: [0, 0, -0.055],       exploded: [0, 0, -2.4], stagger: 0.1 },
];

export type LabelConfig = {
  part: PartId;
  /** anchor offset in the part's local space */
  anchor: [number, number, number];
  num: string;
  name: string;
  sub: string;
  side: "left" | "right";
  /** overall scroll progress at which the label fades in */
  at: number;
};

export const LABELS: LabelConfig[] = [
  { part: "display",     anchor: [-0.75, 0.4, 0],  num: "01", name: "Display Assembly", sub: "OLED · most common repair", side: "left",  at: 0.42 },
  { part: "ceramicShield", anchor: [0.75, 0.6, 0], num: "02", name: "Ceramic Shield",   sub: "Front glass protection",    side: "right", at: 0.46 },
  { part: "rearCamera",  anchor: [0.4, 0, 0],      num: "03", name: "Rear Camera System", sub: "48MP triple camera",      side: "right", at: 0.5 },
  { part: "logicBoard",  anchor: [-0.4, 0, 0],     num: "04", name: "Logic Board",      sub: "A19 Pro · board-level lab", side: "left",  at: 0.54 },
  { part: "battery",     anchor: [-0.5, -0.1, 0],  num: "05", name: "Battery",          sub: "High-density · health fix", side: "left",  at: 0.58 },
  { part: "magsafe",     anchor: [0.55, 0, 0],     num: "06", name: "MagSafe Coil",     sub: "Wireless charging",         side: "right", at: 0.62 },
  { part: "taptic",      anchor: [-0.3, 0, 0],     num: "07", name: "Taptic Engine",    sub: "Haptic feedback motor",     side: "left",  at: 0.66 },
  { part: "chargePort",  anchor: [0.4, -0.05, 0],  num: "08", name: "Charging Port",    sub: "USB-C assembly",            side: "right", at: 0.7 },
  { part: "backHousing", anchor: [-0.7, -0.6, 0],  num: "09", name: "Back Housing",     sub: "Aluminum unibody",          side: "left",  at: 0.74 },
];

/* ------------------------------------------------------------------ */
/*  Scroll choreography constants (fractions of the pinned scroll)     */
/* ------------------------------------------------------------------ */

export const TIMING = {
  explodeStart: 0.14,
  explodeEnd: 0.52,
  labelsOut: 0.86,
  reassembleStart: 0.87,
  reassembleEnd: 0.985,
} as const;

export function clamp01(v: number) {
  return Math.min(1, Math.max(0, v));
}

export function smooth(t: number) {
  const c = clamp01(t);
  return c * c * (3 - 2 * c);
}

/** overall explode amount (0 assembled → 1 exploded → back to 0) */
export function explodeAmount(p: number) {
  const rise = smooth((p - TIMING.explodeStart) / (TIMING.explodeEnd - TIMING.explodeStart));
  const fall = smooth((p - TIMING.reassembleStart) / (TIMING.reassembleEnd - TIMING.reassembleStart));
  return rise * (1 - fall);
}

/** per-part progress with stagger applied: later parts start moving later */
export function partAmount(e: number, stagger: number) {
  return smooth((e - stagger * 0.5) / 0.65);
}
