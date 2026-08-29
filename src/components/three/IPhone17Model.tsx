"use client";

import { useMemo, useRef, type MutableRefObject } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, Html } from "@react-three/drei";
import {
  PHONE,
  COLORS,
  PARTS,
  LABELS,
  TIMING,
  explodeAmount,
  partAmount,
  clamp01,
  type PartId,
} from "./phone-config";

/* ------------------------------------------------------------------ */
/*  Procedural iPhone 17 Pro Max that explodes into repair parts.     */
/*  `progress` (0..1) is the pinned scroll progress driving explode,  */
/*  tilt and label reveal — mutated externally by GSAP ScrollTrigger. */
/* ------------------------------------------------------------------ */

function roundedRectShape(w: number, h: number, r: number) {
  const s = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

const LENS_POSITIONS: [number, number][] = [
  [-0.17, 0.19],
  [-0.17, -0.19],
  [0.18, 0.19],
];

export default function IPhone17Model({
  progress,
}: {
  progress: MutableRefObject<number>;
}) {
  const rootRef = useRef<THREE.Group>(null);
  const partRefs = useRef<Partial<Record<PartId, THREE.Group | null>>>({});
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const labelGroupRefs = useRef<(THREE.Group | null)[]>([]);

  const baseVecs = useMemo(() => PARTS.map((p) => new THREE.Vector3(...p.base)), []);
  const explodedVecs = useMemo(() => PARTS.map((p) => new THREE.Vector3(...p.exploded)), []);
  const partIndexById = useMemo(() => {
    const m = {} as Record<PartId, number>;
    PARTS.forEach((p, i) => (m[p.id] = i));
    return m;
  }, []);
  const currentVecs = useMemo(() => PARTS.map(() => new THREE.Vector3()), []);

  /* Aluminum chassis ring — rounded rect with a hole, extruded */
  const chassisGeom = useMemo(() => {
    const outer = roundedRectShape(PHONE.width, PHONE.height, PHONE.radius);
    const inner = roundedRectShape(PHONE.width - 0.16, PHONE.height - 0.16, PHONE.radius - 0.07);
    outer.holes.push(inner);
    const g = new THREE.ExtrudeGeometry(outer, {
      depth: PHONE.depth,
      bevelEnabled: true,
      bevelSize: 0.012,
      bevelThickness: 0.012,
      bevelSegments: 2,
      curveSegments: 24,
    });
    g.center();
    return g;
  }, []);

  /* Warm gradient wallpaper for the OLED panel */
  const screenTex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 256;
    c.height = 512;
    const ctx = c.getContext("2d")!;
    const g = ctx.createLinearGradient(0, 0, 200, 512);
    g.addColorStop(0, "#ffb26b");
    g.addColorStop(0.45, "#ff7a1a");
    g.addColorStop(1, "#7a2d05");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 256, 512);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  useFrame((state) => {
    const p = progress.current;
    const e = explodeAmount(p);
    const t = state.clock.elapsedTime;

    /* part positions */
    PARTS.forEach((part, i) => {
      const g = partRefs.current[part.id];
      if (!g) return;
      const k = partAmount(e, part.stagger);
      currentVecs[i].lerpVectors(baseVecs[i], explodedVecs[i], k);
      g.position.copy(currentVecs[i]);
    });

    /* labels ride along with their part (anchors pulled inward on phones) */
    const anchorScale = state.size.width < 640 ? 0.45 : 1;
    LABELS.forEach((l, i) => {
      const g = labelGroupRefs.current[i];
      if (!g) return;
      const pv = currentVecs[partIndexById[l.part]];
      g.position.set(pv.x + l.anchor[0] * anchorScale, pv.y + l.anchor[1], pv.z + l.anchor[2]);
    });

    /* root tilt: upright & low in the hero, laid back and centered while exploded */
    const root = rootRef.current;
    if (root) {
      /* shrink on narrow viewports so the exploded stack and its labels fit */
      const narrow = state.size.width < 640;
      root.scale.setScalar(narrow ? 0.72 : 1);
      root.rotation.x = THREE.MathUtils.lerp(-0.1, -1.02, e) + Math.sin(t * 0.6) * 0.015;
      root.rotation.y = -0.14 + Math.sin(t * 0.4) * 0.04 + p * 0.25;
      root.rotation.z = THREE.MathUtils.lerp(0, -0.06, e);
      /* extra drop during the outro so the reassembled phone clears the CTA card */
      const outroDrop = clamp01((p - 0.88) / 0.1);
      root.position.y =
        THREE.MathUtils.lerp(-1.45, -0.3, e) -
        outroDrop * outroDrop * 0.65 +
        Math.sin(t * 0.8) * 0.03;
    }

    /* camera pulls back as the stack fans out */
    state.camera.position.z = THREE.MathUtils.lerp(8.0, 10.6, e);
    state.camera.position.y = THREE.MathUtils.lerp(0.1, 0.25, e);
    state.camera.lookAt(0, 0, 0);

    /* label reveal windows */
    LABELS.forEach((l, i) => {
      const el = labelRefs.current[i];
      if (!el) return;
      const on =
        clamp01((p - l.at) / 0.035) *
        clamp01((TIMING.labelsOut + 0.01 - p) / 0.03);
      el.style.opacity = String(on);
      el.style.transform = `translateY(${(1 - on) * 8}px)`;
    });
  });

  const setPart = (id: PartId) => (g: THREE.Group | null) => {
    partRefs.current[id] = g;
  };

  return (
    <group ref={rootRef}>
      {/* 01 — Ceramic Shield front glass */}
      <group ref={setPart("ceramicShield")}>
        <RoundedBox args={[1.5, 3.2, 0.02]} radius={0.16} smoothness={4}>
          <meshPhysicalMaterial
            color={COLORS.glass}
            transparent
            opacity={0.28}
            roughness={0.05}
            metalness={0.1}
            clearcoat={1}
          />
        </RoundedBox>
      </group>

      {/* 02 — Display assembly (OLED) */}
      <group ref={setPart("display")}>
        <RoundedBox args={[1.48, 3.18, 0.028]} radius={0.15} smoothness={4}>
          <meshStandardMaterial color={COLORS.panel} roughness={0.4} metalness={0.5} />
        </RoundedBox>
        <mesh position={[0, 0, 0.016]}>
          <planeGeometry args={[1.34, 3.02]} />
          <meshBasicMaterial map={screenTex} toneMapped={false} />
        </mesh>
        {/* dynamic island */}
        <RoundedBox args={[0.36, 0.1, 0.006]} radius={0.045} position={[0, 1.32, 0.019]}>
          <meshBasicMaterial color="#08090b" />
        </RoundedBox>
      </group>

      {/* 03 — Digitizer / touch layer */}
      <group ref={setPart("digitizer")}>
        <RoundedBox args={[1.46, 3.16, 0.012]} radius={0.15} smoothness={4}>
          <meshStandardMaterial color={COLORS.layer} roughness={0.6} metalness={0.35} />
        </RoundedBox>
      </group>

      {/* 04 — Display support frame */}
      <group ref={setPart("displayFrame")}>
        <RoundedBox args={[1.5, 3.2, 0.016]} radius={0.16} smoothness={4}>
          <meshStandardMaterial color="#2e3136" roughness={0.35} metalness={0.75} />
        </RoundedBox>
      </group>

      {/* 05 — Front camera / Face ID module */}
      <group ref={setPart("frontCamera")}>
        <RoundedBox args={[0.32, 0.13, 0.05]} radius={0.03}>
          <meshStandardMaterial color={COLORS.steel} roughness={0.35} metalness={0.8} />
        </RoundedBox>
        <mesh position={[-0.08, 0, 0.03]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.038, 0.038, 0.03, 24]} />
          <meshStandardMaterial color="#10131c" roughness={0.15} metalness={0.6} />
        </mesh>
      </group>

      {/* 06 — Aluminum chassis ring */}
      <group ref={setPart("chassis")}>
        <mesh geometry={chassisGeom}>
          <meshStandardMaterial color={COLORS.frame} roughness={0.28} metalness={0.9} />
        </mesh>
      </group>

      {/* 07 — Logic board (A19 Pro) */}
      <group ref={setPart("logicBoard")}>
        <RoundedBox args={[0.85, 1.9, 0.03]} radius={0.04}>
          <meshStandardMaterial color={COLORS.pcb} roughness={0.55} metalness={0.4} />
        </RoundedBox>
        <RoundedBox args={[0.32, 0.32, 0.022]} radius={0.02} position={[-0.02, 0.45, 0.024]}>
          <meshStandardMaterial color={COLORS.chip} roughness={0.3} metalness={0.7} />
        </RoundedBox>
        <RoundedBox args={[0.26, 0.2, 0.02]} radius={0.02} position={[0.12, -0.1, 0.022]}>
          <meshStandardMaterial color="#1e1a16" roughness={0.35} metalness={0.6} />
        </RoundedBox>
        <RoundedBox args={[0.2, 0.14, 0.018]} radius={0.02} position={[-0.2, -0.55, 0.022]}>
          <meshStandardMaterial color={COLORS.chip} roughness={0.35} metalness={0.6} />
        </RoundedBox>
        <mesh position={[0, 0.88, 0.02]}>
          <boxGeometry args={[0.6, 0.05, 0.01]} />
          <meshStandardMaterial color={COLORS.gold} roughness={0.25} metalness={0.95} />
        </mesh>
        <mesh position={[0, -0.88, 0.02]}>
          <boxGeometry args={[0.6, 0.05, 0.01]} />
          <meshStandardMaterial color={COLORS.gold} roughness={0.25} metalness={0.95} />
        </mesh>
      </group>

      {/* 08 — Rear camera system (48MP triple) */}
      <group ref={setPart("rearCamera")}>
        <RoundedBox args={[0.78, 0.82, 0.07]} radius={0.16} smoothness={4}>
          <meshStandardMaterial color={COLORS.housingDeep} roughness={0.3} metalness={0.9} />
        </RoundedBox>
        {LENS_POSITIONS.map(([x, y], i) => (
          <group key={i} position={[x, y, 0.05]} rotation={[Math.PI / 2, 0, 0]}>
            <mesh>
              <cylinderGeometry args={[0.15, 0.15, 0.07, 32]} />
              <meshStandardMaterial color="#17181c" roughness={0.2} metalness={0.85} />
            </mesh>
            <mesh position={[0, -0.04, 0]}>
              <cylinderGeometry args={[0.095, 0.095, 0.012, 32]} />
              <meshPhysicalMaterial color="#28406e" roughness={0.05} metalness={0.4} clearcoat={1} />
            </mesh>
          </group>
        ))}
        <mesh position={[0.18, -0.16, 0.05]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.055, 0.055, 0.03, 24]} />
          <meshStandardMaterial color="#f4e6c8" roughness={0.3} emissive="#c9b489" emissiveIntensity={0.3} />
        </mesh>
      </group>

      {/* 09 — Battery */}
      <group ref={setPart("battery")}>
        <RoundedBox args={[1.02, 1.75, 0.05]} radius={0.07} smoothness={4}>
          <meshStandardMaterial color={COLORS.battery} roughness={0.5} metalness={0.45} />
        </RoundedBox>
        <mesh position={[0, 0, 0.027]}>
          <planeGeometry args={[0.9, 1.6]} />
          <meshStandardMaterial color="#34383e" roughness={0.6} metalness={0.3} />
        </mesh>
      </group>

      {/* 10 — MagSafe / wireless charging coil */}
      <group ref={setPart("magsafe")}>
        <mesh>
          <torusGeometry args={[0.42, 0.032, 12, 48]} />
          <meshStandardMaterial color={COLORS.copper} roughness={0.25} metalness={0.95} />
        </mesh>
        <mesh>
          <torusGeometry args={[0.33, 0.025, 12, 48]} />
          <meshStandardMaterial color={COLORS.copper} roughness={0.3} metalness={0.9} />
        </mesh>
        <mesh>
          <circleGeometry args={[0.29, 40]} />
          <meshStandardMaterial color="#4c4f55" roughness={0.5} metalness={0.6} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* 11 — Taptic engine */}
      <group ref={setPart("taptic")}>
        <RoundedBox args={[0.44, 0.3, 0.06]} radius={0.035}>
          <meshStandardMaterial color={COLORS.steel} roughness={0.3} metalness={0.85} />
        </RoundedBox>
      </group>

      {/* 12 — Speaker module */}
      <group ref={setPart("speaker")}>
        <RoundedBox args={[0.5, 0.26, 0.06]} radius={0.035}>
          <meshStandardMaterial color="#202327" roughness={0.5} metalness={0.5} />
        </RoundedBox>
      </group>

      {/* 13 — USB-C charging port assembly */}
      <group ref={setPart("chargePort")}>
        <RoundedBox args={[0.66, 0.11, 0.05]} radius={0.025}>
          <meshStandardMaterial color={COLORS.steel} roughness={0.35} metalness={0.8} />
        </RoundedBox>
        <RoundedBox args={[0.28, 0.055, 0.056]} radius={0.024}>
          <meshStandardMaterial color="#0c0d10" roughness={0.4} metalness={0.4} />
        </RoundedBox>
      </group>

      {/* 14 — Side buttons */}
      <group ref={setPart("sideButtons")}>
        {[0.4, 0.06, -0.28].map((y, i) => (
          <RoundedBox key={i} args={[0.045, i === 0 ? 0.18 : 0.26, 0.045]} radius={0.02} position={[0, y, 0]}>
            <meshStandardMaterial color={COLORS.frame} roughness={0.25} metalness={0.9} />
          </RoundedBox>
        ))}
      </group>

      {/* 15 — Back housing (aluminum unibody) */}
      <group ref={setPart("backHousing")}>
        <RoundedBox args={[1.6, 3.3, 0.07]} radius={0.26} smoothness={4}>
          <meshStandardMaterial color={COLORS.housing} roughness={0.32} metalness={0.85} />
        </RoundedBox>
        {/* inner tray face (visible when exploded) */}
        <RoundedBox args={[1.45, 3.15, 0.02]} radius={0.2} position={[0, 0, 0.03]}>
          <meshStandardMaterial color="#d9601a" roughness={0.45} metalness={0.7} />
        </RoundedBox>
        {/* camera cutouts on the tray */}
        {LENS_POSITIONS.map(([x, y], i) => (
          <mesh key={i} position={[x + 0.42, y + 1.15, 0.045]}>
            <circleGeometry args={[0.16, 32]} />
            <meshStandardMaterial color="#241207" roughness={0.6} metalness={0.3} />
          </mesh>
        ))}
      </group>

      {/* ---- Glass callout labels ---- */}
      {LABELS.map((l, i) => {
        return (
          <group
            key={l.num}
            ref={(g) => {
              labelGroupRefs.current[i] = g;
            }}
          >
            <Html center zIndexRange={[40, 0]} wrapperClass="pointer-events-none">
              <div
                ref={(el) => {
                  labelRefs.current[i] = el;
                }}
                className="pointer-events-none select-none"
                style={{ opacity: 0 }}
              >
                <div className="relative h-0 w-0">
                  {/* phones: compact chip stacked under the dot so nothing clips offscreen */}
                  <div className="absolute left-0 top-0 flex -translate-x-1/2 flex-col items-center gap-1 sm:hidden">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#ff6b1a] shadow-[0_0_8px_rgba(255,107,26,0.9)]" />
                    <div className="whitespace-nowrap rounded-lg border border-white/70 bg-white/65 px-2 py-1 shadow-sm backdrop-blur-md">
                      <p className="text-[9px] font-bold leading-tight text-ink">
                        <span className="font-mono-tag text-[8px] font-bold text-[#e85d04]">{l.num} </span>
                        {l.name}
                      </p>
                    </div>
                  </div>
                  {/* desktop: leader line out to the side, like the reference */}
                  <div
                    className={`absolute top-0 hidden -translate-y-1/2 items-center sm:flex ${
                      l.side === "left" ? "right-0 flex-row" : "left-0 flex-row-reverse"
                    }`}
                  >
                    <div className="whitespace-nowrap rounded-xl border border-white/70 bg-white/60 px-3 py-1.5 shadow-[0_8px_24px_-8px_rgba(180,100,40,0.4)] backdrop-blur-md">
                      <p className="flex items-baseline gap-1.5 text-xs font-bold leading-tight text-ink">
                        <span className="font-mono-tag text-[9px] font-bold text-[#e85d04]">{l.num}</span>
                        {l.name}
                      </p>
                      <p className="text-[10px] leading-tight text-ink/55">{l.sub}</p>
                    </div>
                    <div className="h-px w-14 border-t border-dashed border-[#ff6b1a]/80" />
                    <div className="h-2 w-2 rounded-full bg-[#ff6b1a] shadow-[0_0_10px_rgba(255,107,26,0.9)]" />
                  </div>
                </div>
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}
