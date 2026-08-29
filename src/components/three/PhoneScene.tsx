"use client";

import { Suspense, type MutableRefObject } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
import IPhone17Model from "./IPhone17Model";

/**
 * Full-screen transparent canvas hosting the exploding iPhone.
 * The environment map is generated locally from Lightformers (no network
 * HDR fetch) so the orange aluminum reads as polished metal.
 */
export default function PhoneScene({
  progress,
}: {
  progress: MutableRefObject<number>;
}) {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ fov: 32, position: [0, 0.15, 7.1] }}
      gl={{ alpha: true, antialias: true }}
      className="!absolute !inset-0"
    >
      <ambientLight intensity={0.65} />
      <directionalLight position={[4, 6, 6]} intensity={1.4} color="#ffffff" />
      <directionalLight position={[-5, 2, -4]} intensity={0.6} color="#ffd9b8" />
      <directionalLight position={[0, -4, 3]} intensity={0.35} color="#bcd4e6" />

      <Suspense fallback={null}>
        <Environment resolution={128}>
          <Lightformer intensity={2.2} position={[0, 4, 2]} scale={[8, 2, 1]} color="#ffffff" />
          <Lightformer intensity={1.4} position={[-5, 1, 1]} rotation-y={Math.PI / 2} scale={[6, 1.5, 1]} color="#ffe4c8" />
          <Lightformer intensity={1.2} position={[5, -0.5, 1]} rotation-y={-Math.PI / 2} scale={[6, 1.5, 1]} color="#dbe9f4" />
          <Lightformer intensity={0.8} position={[0, -4, 0]} rotation-x={Math.PI / 2} scale={[8, 3, 1]} color="#f6f3ef" />
        </Environment>

        <IPhone17Model progress={progress} />

        <ContactShadows
          position={[0, -2.55, 0]}
          opacity={0.28}
          blur={2.6}
          far={4.5}
          scale={9}
          color="#8a4a1a"
        />
      </Suspense>
    </Canvas>
  );
}
