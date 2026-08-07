"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, SoftShadows } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Earth } from "./Earth";
import { useEffect, useState, Suspense } from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useEarthStore } from "@/store/useEarthStore";

interface CanvasContainerProps {
  health?: number;
  className?: string;
  earthScale?: number;
}

import * as THREE from "three";

export function CanvasContainer({ health, className, earthScale = 2.2 }: CanvasContainerProps) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const theme = useEarthStore(state => state.theme);
  const isEarthPage = pathname === "/dashboard/earth";
  const isHomePage = pathname === "/dashboard";
  const isLandingPage = pathname === "/";
  const isInteractive = isEarthPage || isHomePage || isLandingPage;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={cn("absolute inset-0 z-0", isInteractive ? "pointer-events-auto" : "pointer-events-none", className)}>
      <Canvas 
        shadows 
        dpr={[1, 2.5]}
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        gl={{ 
          antialias: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping, 
          toneMappingExposure: 1.0,
          outputColorSpace: THREE.SRGBColorSpace,
          alpha: true,
          premultipliedAlpha: false,
          preserveDrawingBuffer: false
        }}
        onCreated={({ gl }) => {
          gl.autoClear = true;
          gl.setClearColor(0x000000, 0);
        }}
      >
        
        {/* Clean, standard lighting to prevent blowout */}
        <ambientLight intensity={1.0} />
        <directionalLight 
          castShadow 
          position={[5, 5, 5]} 
          intensity={1.0} 
          color="#ffffff"
          shadow-mapSize={[1024, 1024]}
        />
        
       <Suspense fallback={null}>
        {/* Sky Background as requested - using a solid sky color for the cleanest background */}
        <color attach="background" args={["#bae6fd"]} />
        
        {/* Generate a basic neutral Environment Map to prevent stained dark void reflections */}
        <Environment preset="city" background={false} />
        
        {/* The GLB Earth */}
        <group position={isLandingPage ? [2, -0.5, 0] : isEarthPage ? [0, 0, 0] : [0, 0, 0]}>
          <Earth scale={isEarthPage ? 2.6 : earthScale} />
        </group>
       </Suspense>

        {/* Orbit Controls with Mouse Parallax & Scroll Zoom */}
        {isInteractive && (
          <OrbitControls 
            enableZoom={true}
            enablePan={false}
            autoRotate={true}
            autoRotateSpeed={isHomePage ? 0.4 : 0.5}
            minDistance={4}
            maxDistance={12}
            enableDamping={true}
            dampingFactor={0.05}
          />
        )}

      </Canvas>
    </div>
  );
}
