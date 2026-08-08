"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useRef, useEffect } from "react";
import * as THREE from "three";

export function Earth({ scale = 1.4 }: { scale?: number }) {
  const { scene } = useGLTF("/assets/earth_cartoon.glb");
  const earthRef = useRef<THREE.Group>(null);
  const { gl } = useThree();

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
            
            // Force the material to be completely solid and opaque
            material.transparent = false;
            material.opacity = 1.0;
            if ('transmission' in material) {
              (material as any).transmission = 0;
            }
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

            material.needsUpdate = true;
          }
        }
      });
    }
  }, [scene, gl]);

  // SINGLE slow continuous rotation in place around its own Y-axis
  useFrame((_state, delta) => {
    if (earthRef.current) {
      // Rotation ONLY — no position animation, no floating, no bouncing
      earthRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <group ref={earthRef} scale={scale}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/assets/earth_cartoon.glb");

