"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Float, Sparkles } from "@react-three/drei";
import { useEarthStore } from "@/store/useEarthStore";
import { motion } from "framer-motion";

export default function TreePage() {
  const { streak, level, xp } = useEarthStore();

  return (
    <div className="w-full h-[calc(100vh-80px)] relative flex flex-col justify-between p-6 overflow-hidden">
      
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 2, 8], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} color="#10b981" />
          <directionalLight position={[-10, 10, -5]} intensity={0.5} color="#06b6d4" />
          
          <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <StylizedTree streak={streak} xp={xp} />
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
        <p className="text-slate-700 glass-card p-4 rounded-xl border border-black/10 max-w-sm">
          This tree represents your journey. It grows taller with every XP earned, and its leaves glow brighter with your daily streak. 
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 pointer-events-auto glass-card border border-black/10 p-6 rounded-3xl max-w-sm self-end bg-white/40 backdrop-blur-md"
      >
        <div className="space-y-4">
          <div>
            <div className="text-xs text-slate-600 uppercase tracking-wider mb-1">Tree Age (Streak)</div>
            <div className="text-2xl font-bold text-orange-400">{streak} Days</div>
          </div>
          <div>
            <div className="text-xs text-slate-600 uppercase tracking-wider mb-1">Vitality (XP)</div>
            <div className="text-2xl font-bold text-emerald-400">{xp} / 1000</div>
          </div>
          <div>
            <div className="text-xs text-slate-600 uppercase tracking-wider mb-1">Evolution Level</div>
            <div className="text-2xl font-bold text-slate-900 font-heading">{level}</div>
          </div>
          <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold transition-colors">
            Decorate Tree
          </button>
        </div>
      </motion.div>

    </div>
  );
}

function StylizedTree({ streak, xp }: { streak: number, xp: number }) {
  // Simple procedural scaling based on XP and streak
  const height = 1 + (xp / 1000) * 3;
  const leafSize = 0.5 + (streak / 365) * 2;
  const leafGlow = streak > 5 ? 2 : 0.5;

  return (
    <group position={[0, -2, 0]}>
      {/* Trunk */}
      <mesh position={[0, height / 2, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.4, height, 8]} />
        <meshStandardMaterial color="#3d2817" roughness={0.9} />
      </mesh>
      
      {/* Leaves Cluster */}
      <mesh position={[0, height + 0.5, 0]}>
        <dodecahedronGeometry args={[leafSize, 1]} />
        <meshStandardMaterial 
          color="#10b981" 
          emissive="#10b981"
          emissiveIntensity={leafGlow}
          roughness={0.4} 
        />
      </mesh>
      
      {/* Sparkles around healthy trees */}
      {streak > 3 && (
        <Sparkles 
          count={streak * 5} 
          scale={leafSize * 3} 
          size={3} 
          speed={0.4} 
          color="#a7f3d0" 
          position={[0, height, 0]} 
        />
      )}
    </group>
  );
}
