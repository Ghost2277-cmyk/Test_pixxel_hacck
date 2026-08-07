"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useEarthStore } from "@/store/useEarthStore";
import { motion, AnimatePresence } from "framer-motion";

export function GaiaCompanion() {
  const { gaiaEmotion, gaiaMessage } = useEarthStore();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 pointer-events-none">
      
      {/* Speech Bubble */}
      <AnimatePresence>
        {gaiaMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10, originX: 1, originY: 1 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="bg-white/10 backdrop-blur-xl border border-emerald-500/30 p-4 rounded-2xl rounded-br-sm max-w-[250px] shadow-[0_0_20px_rgba(16,185,129,0.3)] pointer-events-auto"
          >
            <p className="text-sm font-semibold text-slate-900 drop-shadow-md">{gaiaMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Container */}
      <div className="w-32 h-32 pointer-events-auto cursor-pointer group" onClick={() => useEarthStore.getState().setGaiaState('happy', 'Hi! I am Gaia!')}>
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[2, 5, 2]} intensity={2} color="#a7f3d0" />
          <GaiaModel emotion={gaiaEmotion} />
        </Canvas>
      </div>

    </div>
  );
}

function GaiaModel({ emotion }: { emotion: string }) {
  const group = useRef<THREE.Group>(null);
  const leftWing = useRef<THREE.Mesh>(null);
  const rightWing = useRef<THREE.Mesh>(null);
  
  // Animation loop
  useFrame((state, delta) => {
    if (!group.current) return;
    
    // Look at mouse (subtle)
    const targetX = (state.pointer.x * Math.PI) / 4;
    const targetY = (state.pointer.y * Math.PI) / 4;
    
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetX, 0.1);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -targetY, 0.1);

    // Wing flapping
    if (leftWing.current && rightWing.current) {
      const flapSpeed = emotion === 'excited' || emotion === 'celebrating' ? 20 : emotion === 'sleeping' ? 2 : 10;
      const flapAmount = Math.sin(state.clock.elapsedTime * flapSpeed) * 0.2;
      
      leftWing.current.rotation.z = -0.5 + flapAmount;
      rightWing.current.rotation.z = 0.5 - flapAmount;
    }

    // Squash and stretch based on emotion
    if (emotion === 'happy' || emotion === 'celebrating') {
      const bounce = Math.sin(state.clock.elapsedTime * 8) * 0.1;
      group.current.scale.set(1 - bounce, 1 + bounce, 1 - bounce);
    } else if (emotion === 'sleeping') {
      const breathe = Math.sin(state.clock.elapsedTime * 2) * 0.05;
      group.current.scale.set(1 + breathe, 0.9 - breathe, 1 + breathe);
    } else {
      // Idle
      group.current.scale.setScalar(1);
    }
  });

  const bodyColor = emotion === 'sleeping' ? "#064e3b" : "#10b981";
  const glowIntensity = emotion === 'celebrating' ? 2 : emotion === 'sleeping' ? 0.2 : 0.8;

  return (
    <Float speed={emotion === 'sleeping' ? 1 : 3} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={group}>
        
        {/* Main Body */}
        <mesh castShadow>
          <sphereGeometry args={[1, 32, 32]} />
          <MeshDistortMaterial 
            color={bodyColor} 
            emissive="#10b981"
            emissiveIntensity={glowIntensity}
            distort={0.2} 
            speed={emotion === 'sleeping' ? 1 : 3} 
            roughness={0.2}
          />
        </mesh>

        {/* Eyes */}
        <group position={[0, 0.2, 0.9]}>
          {/* Left Eye */}
          <mesh position={[-0.3, 0, 0]}>
            <sphereGeometry args={emotion === 'sleeping' ? [0.1, 16, 16, 0, Math.PI] : [0.15, 16, 16]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          {/* Right Eye */}
          <mesh position={[0.3, 0, 0]}>
            <sphereGeometry args={emotion === 'sleeping' ? [0.1, 16, 16, 0, Math.PI] : [0.15, 16, 16]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          
          {/* Pupils */}
          {emotion !== 'sleeping' && (
            <>
              <mesh position={[-0.3, 0, 0.12]}>
                <sphereGeometry args={[0.06, 16, 16]} />
                <meshBasicMaterial color="#000000" />
              </mesh>
              <mesh position={[0.3, 0, 0.12]}>
                <sphereGeometry args={[0.06, 16, 16]} />
                <meshBasicMaterial color="#000000" />
              </mesh>
            </>
          )}
        </group>

        {/* Tiny Leaf Wings */}
        <mesh ref={leftWing} position={[-1.1, 0, 0]}>
          <coneGeometry args={[0.3, 1, 3]} />
          <meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={0.5} />
        </mesh>
        
        <mesh ref={rightWing} position={[1.1, 0, 0]}>
          <coneGeometry args={[0.3, 1, 3]} />
          <meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={0.5} />
        </mesh>

        {/* Particle Aura */}
        <Sparkles count={20} scale={3} size={2} speed={0.5} color="#a7f3d0" />
      </group>
    </Float>
  );
}
