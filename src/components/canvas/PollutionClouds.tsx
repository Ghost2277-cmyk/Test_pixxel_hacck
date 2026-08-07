"use client";

import { useFrame } from "@react-three/fiber";
import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { useEarthStore } from "@/store/useEarthStore";

export function PollutionClouds({ earthScale = 1.4 }) {
  const health = useEarthStore(state => state.health);
  const cloudsRef = useRef<THREE.InstancedMesh>(null);
  
  const cloudCount = 60; // Enough clouds to look polluted

  // Calculate random positions around a sphere
  const cloudsData = useMemo(() => {
    return Array.from({ length: cloudCount }, () => ({
      phi: Math.random() * Math.PI,
      theta: Math.random() * Math.PI * 2,
      speed: 0.05 + Math.random() * 0.1,
      altitude: 1.1 + Math.random() * 0.2, // Orbit slightly above earth surface
      scale: 0.1 + Math.random() * 0.15,
    }));
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state, delta) => {
    if (cloudsRef.current) {
      cloudsData.forEach((cloud, i) => {
        // Orbit around the earth
        cloud.theta += delta * cloud.speed;
        
        // Scale altitude by earthScale so clouds stay proportional
        const currentAltitude = cloud.altitude * earthScale;
        
        const x = currentAltitude * Math.cos(cloud.theta) * Math.sin(cloud.phi);
        const y = currentAltitude * Math.sin(cloud.theta) * Math.sin(cloud.phi);
        const z = currentAltitude * Math.cos(cloud.phi);

        dummy.position.set(x, y, z);
        
        // The scale of the clouds increases as health decreases (more pollution)
        // If health is 1 (100%), scale is 0. If health is 0, scale is max.
        const pollutionFactor = Math.max(0, 1 - health);
        const currentScale = cloud.scale * earthScale * pollutionFactor;
        
        dummy.scale.setScalar(currentScale);
        
        dummy.updateMatrix();
        cloudsRef.current!.setMatrixAt(i, dummy.matrix);
      });
      cloudsRef.current.instanceMatrix.needsUpdate = true;
    }

    if (materialRef.current) {
      // The smog color gets darker and more opaque as health decreases
      const targetOpacity = Math.max(0, 1 - health) * 0.8;
      materialRef.current.opacity = THREE.MathUtils.lerp(materialRef.current.opacity, targetOpacity, 0.05);
    }
  });

  return (
    <group>
      {/* Pollution Clouds visible when health is below 90% */}
      <instancedMesh ref={cloudsRef} args={[undefined, undefined, cloudCount]}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial 
          ref={materialRef}
          color="#4b5563" // Dark gray/brown smog color
          roughness={1} 
          transparent={true} 
          opacity={0}
          flatShading={true}
        />
      </instancedMesh>
    </group>
  );
}
