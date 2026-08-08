"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Earth } from "./Earth";
import { EarthPlaceholder } from "./EarthPlaceholder";
import { useEffect, useState, Suspense } from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import * as THREE from "three";

interface CanvasContainerProps {
  health?: number;
  className?: string;
  earthScale?: number;
}

export function CanvasContainer({ className, earthScale = 2.6 }: CanvasContainerProps) {
  const [mounted, setMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number>(1200);
  const pathname = usePathname();
  const isEarthPage = pathname === "/dashboard/earth";
  const isLandingPage = pathname === "/";

  useEffect(() => {
    setMounted(true);
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!mounted) return null;

  // Anchored right-side placement for hero visual balance:
  // Large & visually dominant (85-92% of maximum fit area), complete sphere boundary visible with intentional breathing room
  let responsivePosition: [number, number, number] = [2.0, -0.05, 0];
  let responsiveScale = 2.15;

  if (isLandingPage) {
    if (windowWidth < 640) {
      // Mobile: centered below hero text & CTAs with full sphere visible
      responsivePosition = [0, -1.85, 0];
      responsiveScale = 1.4;
    } else if (windowWidth < 1024) {
      // Tablet: anchored right, reduced scale with full sphere visible
      responsivePosition = [1.45, -0.3, 0];
      responsiveScale = 1.65;
    } else if (windowWidth < 1280) {
      // Laptop: right column, complete sphere visible with breathing room
      responsivePosition = [1.85, -0.05, 0];
      responsiveScale = 1.95;
    } else {
      // Desktop: occupies right side (~88-90% of max area), centered in right space, complete circle visible
      responsivePosition = [2.0, -0.05, 0];
      responsiveScale = 2.15;
    }
  }


  return (
    <div className={cn("absolute inset-0 z-0 pointer-events-none", className)}>
      <Canvas 
        shadows 
        dpr={[1, 2]}
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        gl={{ 
          antialias: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping, 
          toneMappingExposure: 1.05,
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
        {/* Soft, eco-tech illumination */}
        <ambientLight intensity={1.2} />
        <directionalLight 
          castShadow 
          position={[6, 8, 5]} 
          intensity={1.4} 
          color="#f4fbf7"
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight 
          position={[-6, -4, -5]} 
          intensity={0.4} 
          color="#00b87a"
        />
        
        <Suspense fallback={
          <group position={responsivePosition}>
            <EarthPlaceholder scale={isEarthPage ? 2.6 : responsiveScale} />
          </group>
        }>
          <Environment preset="city" background={false} />
          
          {/* GLB Earth permanently anchored on the right side of the hero */}
          <group position={responsivePosition}>
            <Earth scale={isEarthPage ? 2.6 : responsiveScale} />
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}



