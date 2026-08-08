"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { useEarthStore } from "@/store/useEarthStore";

export function Earth({ scale = 1.4 }) {
  const { scene } = useGLTF("/assets/earth_cartoon.glb");
  const earthRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const { gl } = useThree();

  const { health, planetPulse, forestVitality } = useEarthStore();

  useEffect(() => {
    if (scene && gl) {
      const maxAnisotropy = gl.capabilities.getMaxAnisotropy();
      
      scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          
          if (mesh.material) {
            const material = mesh.material as THREE.MeshStandardMaterial;
            
            // Adjust any aggressive AO that causes discoloration
            if (material.aoMapIntensity !== undefined) {
              material.aoMapIntensity = 0.4;
            }
            
            // Dynamic emissive intensity based on health
            if (material.emissiveIntensity !== undefined) {
              material.emissiveIntensity = 0.5 + (health * 0.5); // 0.5 to 1.0 based on health
            }

            // Force the material to be completely solid and opaque to prevent the CSS background from bleeding through
            material.transparent = false;
            material.opacity = 1.0;
            // Handle transmission if it's a PhysicalMaterial
            if ('transmission' in material) {
              (material as any).transmission = 0;
            }
            // Ensure depth sorting is correct so inside faces don't render over front faces
            material.depthWrite = true;
            material.depthTest = true;

            // Maximize texture clarity
            const maps = [material.map, material.normalMap, material.roughnessMap, material.metalnessMap, material.emissiveMap, material.aoMap];
            maps.forEach(map => {
              if (map) {
                map.anisotropy = maxAnisotropy;
                map.generateMipmaps = true;
                map.minFilter = THREE.LinearMipmapLinearFilter;
                map.needsUpdate = true;
              }
            });

            // Ensure roughness and metalness are properly evaluated
            material.needsUpdate = true;
          }
        }
      });
    }
  }, [scene, gl, health]);

  // Floating animation and smooth rotation
  useFrame((state, delta) => {
    if (earthRef.current) {
      // Smooth continuous rotation driven by planet pulse (energy)
      const baseRotationSpeed = 0.05;
      const pulseMultiplier = 1 + (planetPulse * 2); // Spins up to 3x faster with max energy
      earthRef.current.rotation.y += delta * baseRotationSpeed * pulseMultiplier;
      
      // Gentle floating animation driven by forest vitality
      const floatSpeed = 1 + forestVitality;
      earthRef.current.position.y = Math.sin(state.clock.elapsedTime * floatSpeed) * 0.1;
      
      // Subtle scale pulse on hover
      const targetScale = hovered ? scale * 1.05 : scale;
      earthRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <group 
      ref={earthRef} 
      scale={scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/assets/earth_cartoon.glb");
