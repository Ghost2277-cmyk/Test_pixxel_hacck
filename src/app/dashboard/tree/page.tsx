"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Float, Sparkles, Sphere } from "@react-three/drei";
import { useEarthStore } from "@/store/useEarthStore";
import { motion } from "framer-motion";

export default function TreePage() {
  const { streak, level, xp, lifeTreeLevel } = useEarthStore();
  
  const xpForNextLevel = lifeTreeLevel * 500;
  const progress = Math.min(100, Math.floor((xp / xpForNextLevel) * 100));

  return (
    <div className="w-full h-[calc(100vh-80px)] relative flex flex-col justify-between p-6 overflow-hidden">
      
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 2, 8], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} color="#10b981" />
          <directionalLight position={[-10, 10, -5]} intensity={0.5} color="#06b6d4" />
          
          <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <StylizedTree lifeTreeLevel={lifeTreeLevel} streak={streak} xp={xp} />
          </Float>
          
          <OrbitControls 
            enableZoom={true} 
            enablePan={false} 
            maxPolarAngle={Math.PI / 2} 
            minPolarAngle={0} 
            autoRotate 
            autoRotateSpeed={0.5} 
          />
          <Environment preset="forest" />
        </Canvas>
      </div>

      {/* HUD Overlay */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="relative z-10 pointer-events-none"
      >
        <h1 className="text-5xl font-bold font-heading text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-300 drop-shadow-md mb-2">
          Your Life Tree
        </h1>
        <p className="text-[var(--foreground)] bg-[var(--card)]/80 backdrop-blur-md p-4 rounded-xl border border-[var(--muted-foreground)]/20 max-w-sm">
          This tree represents your journey. It evolves as you gain XP and maintain your daily streak.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 pointer-events-auto bg-[var(--card)]/80 backdrop-blur-md border border-[var(--muted-foreground)]/20 p-6 rounded-3xl max-w-sm self-end"
      >
        <div className="space-y-4">
          <div className="flex justify-between items-end border-b border-[var(--muted-foreground)]/20 pb-4">
            <div>
              <div className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider mb-1">Tree Level</div>
              <div className="text-3xl font-bold text-emerald-500 font-heading">Level {lifeTreeLevel}</div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[var(--muted-foreground)] uppercase tracking-wider">Evolution Progress</span>
              <span className="text-emerald-500 font-bold">{progress}%</span>
            </div>
            <div className="w-full h-3 bg-[var(--muted)] rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 transition-all duration-1000"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-xs text-right mt-1 text-[var(--muted-foreground)]">{xp} / {xpForNextLevel} XP</div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="bg-[var(--muted)] p-3 rounded-xl text-center">
              <div className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider mb-1">Player Rank</div>
              <div className="text-sm font-bold text-[var(--foreground)]">{level}</div>
            </div>
            <div className="bg-[var(--muted)] p-3 rounded-xl text-center">
              <div className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider mb-1">Daily Streak</div>
              <div className="text-sm font-bold text-orange-500">{streak} Days</div>
            </div>
          </div>
        </div>
      </motion.div>

    </div>
  );
}

function StylizedTree({ lifeTreeLevel, streak, xp }: { lifeTreeLevel: number, streak: number, xp: number }) {
  // Procedural scaling based on tree level
  const height = 0.5 + (lifeTreeLevel * 0.5);
  const leafSize = 0.4 + (lifeTreeLevel * 0.3);
  const leafGlow = streak > 5 ? 2 : (streak > 2 ? 1 : 0.2);

  return (
    <group position={[0, -2 + (height/2), 0]}>
      {/* Trunk */}
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.1 + (lifeTreeLevel * 0.05), 0.2 + (lifeTreeLevel * 0.1), height, 8]} />
        <meshStandardMaterial color="#3d2817" roughness={0.9} />
      </mesh>
      
      {/* Leaves Cluster */}
      {lifeTreeLevel > 1 && (
        <mesh position={[0, height / 2 + 0.2, 0]}>
          <dodecahedronGeometry args={[leafSize, 1]} />
          <meshStandardMaterial 
            color="#10b981" 
            emissive="#10b981"
            emissiveIntensity={leafGlow}
            roughness={0.4} 
          />
        </mesh>
      )}
      
      {/* Secondary leaves for higher levels */}
      {lifeTreeLevel > 3 && (
        <>
          <mesh position={[leafSize * 0.6, height / 2, leafSize * 0.4]}>
            <dodecahedronGeometry args={[leafSize * 0.7, 1]} />
            <meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={leafGlow} roughness={0.4} />
          </mesh>
          <mesh position={[-leafSize * 0.6, height / 2 - 0.2, -leafSize * 0.2]}>
            <dodecahedronGeometry args={[leafSize * 0.6, 1]} />
            <meshStandardMaterial color="#059669" emissive="#059669" emissiveIntensity={leafGlow} roughness={0.4} />
          </mesh>
        </>
      )}

      {/* Magical Ecosystem Effects for max levels */}
      {lifeTreeLevel >= 5 && (
        <Sparkles 
          count={lifeTreeLevel * 10} 
          scale={leafSize * 4} 
          size={4} 
          speed={0.4} 
          color="#a7f3d0" 
          position={[0, height/2, 0]} 
        />
      )}
      
      {/* Floating Orbs for Max Level */}
      {lifeTreeLevel >= 7 && (
        <group position={[0, height + 1, 0]}>
           <Float speed={3} rotationIntensity={2} floatIntensity={2}>
              <Sphere args={[0.2, 16, 16]} position={[1, 0, 0]}>
                <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={2} />
              </Sphere>
           </Float>
           <Float speed={2.5} rotationIntensity={1} floatIntensity={1.5}>
              <Sphere args={[0.15, 16, 16]} position={[-1, 0.5, 0.5]}>
                <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={2} />
              </Sphere>
           </Float>
        </group>
      )}
    </group>
  );
}
