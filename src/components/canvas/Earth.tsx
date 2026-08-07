"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";

export function Earth({ scale = 1.4 }) {
  const { scene } = useGLTF("/assets/earth_cartoon.glb");
  const earthRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
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
            
            // Fix emissive blending if it is washed out
            if (material.emissiveIntensity !== undefined && material.emissiveIntensity > 0) {
              material.emissiveIntensity = 1.0; // Standardize it
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
  }, [scene, gl]);

  // Floating animation and smooth rotation
  useFrame((state, delta) => {
    if (earthRef.current) {
      // Smooth continuous rotation
      earthRef.current.rotation.y += delta * 0.1;
      
      // Gentle floating animation
      earthRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
      
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
