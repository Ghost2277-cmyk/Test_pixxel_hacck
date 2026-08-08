"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Float, Sparkles, Box, Cone, Cylinder, Sphere } from "@react-three/drei";
import { useEarthStore } from "@/store/useEarthStore";
import { motion } from "framer-motion";
import { useState } from "react";

export default function IslandPage() {
  const { islandLevel, xp, greenCoins } = useEarthStore();
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  const unlocks = [
    { level: 1, name: "Barren Land", desc: "A fresh start for nature." },
    { level: 2, name: "Small Tree & House", desc: "Life begins to take root." },
    { level: 3, name: "Garden & Lake", desc: "Water brings biodiversity." },
    { level: 4, name: "Solar Panels", desc: "Clean energy powers the island." },
    { level: 5, name: "Wind Turbine", desc: "Harnessing the breeze." },
    { level: 6, name: "Recycling Center", desc: "Zero waste society." },
    { level: 7, name: "Eco Village", desc: "A thriving sustainable community." },
    { level: 8, name: "Green City", desc: "Urban harmony with nature." },
    { level: 9, name: "Biodiversity Sanctuary", desc: "Rare species return." },
    { level: 10, name: "Paradise", desc: "The ultimate eco-utopia." }
  ];

  const currentDesc = unlocks.find(u => u.level === islandLevel)?.desc || unlocks[0].desc;

  return (
    <div className="w-full h-[calc(100vh-80px)] relative flex flex-col p-6 overflow-hidden">
      
      {/* HUD Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 pointer-events-none mb-4"
      >
        <h1 className="text-4xl font-bold font-heading text-emerald-500 drop-shadow-md mb-2">
          My Eco Island
        </h1>
        <p className="text-[var(--foreground)] bg-[var(--card)]/80 backdrop-blur-md p-3 rounded-xl border border-[var(--muted-foreground)]/20 max-w-sm">
          {currentDesc}
        </p>
      </motion.div>

      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 8, 12], fov: 45 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 20, 10]} intensity={1.5} color="#fef08a" castShadow />
          <directionalLight position={[-10, 10, -5]} intensity={0.5} color="#7dd3fc" />
          
          <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.5}>
            <ProceduralIsland level={islandLevel} onSelect={setSelectedFeature} />
          </Float>
          
          <OrbitControls 
            enableZoom={true} 
            maxPolarAngle={Math.PI / 2.1} 
            minPolarAngle={0} 
            autoRotate={!selectedFeature} 
            autoRotateSpeed={0.5} 
          />
          <Environment preset="city" />
        </Canvas>
      </div>

      {/* Interaction Panel */}
      {selectedFeature && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute bottom-8 right-8 z-10 bg-[var(--card)]/90 backdrop-blur-md border border-emerald-500/30 p-6 rounded-3xl w-80 shadow-2xl"
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold font-heading text-emerald-500">{selectedFeature}</h3>
            <button 
              onClick={() => setSelectedFeature(null)}
              className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            >
              ✕
            </button>
          </div>
          <p className="text-sm text-[var(--muted-foreground)] mb-4">
            This feature contributes to the overall health of your island's ecosystem. Keep leveling up to upgrade it!
          </p>
          <button className="w-full py-2 bg-emerald-500/10 hover:bg-emerald-500 hover:text-white text-emerald-500 font-bold rounded-xl transition-colors border border-emerald-500/20">
            Inspect Output
          </button>
        </motion.div>
      )}

      {/* Bottom Stats */}
      <div className="absolute bottom-6 left-6 z-10 flex gap-4 pointer-events-none">
        <div className="bg-[var(--card)]/80 backdrop-blur-md px-6 py-3 rounded-full border border-[var(--muted-foreground)]/20 font-bold text-[var(--foreground)]">
          Island Level: <span className="text-emerald-500">{islandLevel}</span>
        </div>
        <div className="bg-[var(--card)]/80 backdrop-blur-md px-6 py-3 rounded-full border border-[var(--muted-foreground)]/20 font-bold text-[var(--foreground)]">
          Coins: <span className="text-yellow-500">{greenCoins} 🪙</span>
        </div>
      </div>

    </div>
  );
}

function ProceduralIsland({ level, onSelect }: { level: number, onSelect: (name: string) => void }) {
  const handlePointerOver = (e: any) => {
    e.stopPropagation();
    document.body.style.cursor = 'pointer';
  };
  const handlePointerOut = (e: any) => {
    document.body.style.cursor = 'auto';
  };

  return (
    <group>
      {/* Base Island Platform */}
      <Cylinder args={[5, 4.5, 1, 32]} position={[0, -0.5, 0]} receiveShadow>
        <meshStandardMaterial color="#84cc16" roughness={0.8} />
      </Cylinder>
      {/* Dirt layer */}
      <Cylinder args={[4.6, 4.0, 1.5, 32]} position={[0, -1.5, 0]} receiveShadow>
        <meshStandardMaterial color="#78350f" roughness={1} />
      </Cylinder>

      {/* Level 2: Small Tree & House */}
      {level >= 2 && (
        <group position={[-1.5, 0, 1]} onClick={(e) => { e.stopPropagation(); onSelect("Eco Cabin"); }} onPointerOver={handlePointerOver} onPointerOut={handlePointerOut}>
          <Box args={[1.5, 1, 1.5]} position={[0, 0.5, 0]} castShadow>
            <meshStandardMaterial color="#fef3c7" />
          </Box>
          <Cone args={[1.2, 1, 4]} position={[0, 1.5, 0]} castShadow>
            <meshStandardMaterial color="#ef4444" />
          </Cone>
        </group>
      )}

      {/* Level 3: Lake */}
      {level >= 3 && (
        <group position={[1.5, 0.05, 1]} onClick={(e) => { e.stopPropagation(); onSelect("Freshwater Lake"); }} onPointerOver={handlePointerOver} onPointerOut={handlePointerOut}>
          <Cylinder args={[1.5, 1.5, 0.1, 16]} position={[0, 0, 0]}>
            <meshStandardMaterial color="#38bdf8" transparent opacity={0.8} roughness={0.1} />
          </Cylinder>
        </group>
      )}

      {/* Level 4: Solar Panels */}
      {level >= 4 && (
        <group position={[-1.5, 0, -2]} onClick={(e) => { e.stopPropagation(); onSelect("Solar Array"); }} onPointerOver={handlePointerOver} onPointerOut={handlePointerOut}>
          <Box args={[1, 0.1, 1]} position={[0, 0.3, 0]} rotation={[0.2, 0, 0]} castShadow>
            <meshStandardMaterial color="#1e3a8a" metalness={0.8} roughness={0.2} />
          </Box>
          <Cylinder args={[0.05, 0.05, 0.3, 8]} position={[0, 0.15, 0]}>
            <meshStandardMaterial color="#94a3b8" />
          </Cylinder>
        </group>
      )}

      {/* Level 5: Wind Turbine */}
      {level >= 5 && (
        <group position={[2, 0, -1.5]} onClick={(e) => { e.stopPropagation(); onSelect("Wind Turbine"); }} onPointerOver={handlePointerOver} onPointerOut={handlePointerOut}>
          <Cylinder args={[0.1, 0.2, 3, 8]} position={[0, 1.5, 0]} castShadow>
            <meshStandardMaterial color="#f8fafc" />
          </Cylinder>
          <Box args={[0.2, 0.2, 0.5]} position={[0, 3, 0]} castShadow>
            <meshStandardMaterial color="#f8fafc" />
          </Box>
          {/* Blades (static for simplicity, could animate in useFrame) */}
          <group position={[0, 3, 0.3]}>
             <Box args={[0.1, 2, 0.05]} position={[0, 0, 0]} />
             <Box args={[2, 0.1, 0.05]} position={[0, 0, 0]} />
             <meshStandardMaterial color="#cbd5e1" />
          </group>
        </group>
      )}

      {/* Level 6: Recycling Center (Abstract Representation) */}
      {level >= 6 && (
        <group position={[0, 0, -2.5]} onClick={(e) => { e.stopPropagation(); onSelect("Recycling Center"); }} onPointerOver={handlePointerOver} onPointerOut={handlePointerOut}>
          <Box args={[1.5, 1, 1]} position={[0, 0.5, 0]} castShadow>
            <meshStandardMaterial color="#94a3b8" />
          </Box>
          <Box args={[0.5, 0.5, 0.5]} position={[0, 1.25, 0]} castShadow>
            <meshStandardMaterial color="#22c55e" />
          </Box>
        </group>
      )}

      {/* Level 7+: Add more trees and nature */}
      {level >= 7 && (
        <>
          <Tree position={[2, 0, 1.5]} scale={0.8} />
          <Tree position={[-2, 0, 0]} scale={0.6} />
          <Tree position={[-0.5, 0, 1.5]} scale={1.2} />
        </>
      )}

      {/* Ambient Sparkles for high levels */}
      {level >= 8 && (
        <Sparkles count={50} scale={10} size={2} color="#a7f3d0" position={[0, 2, 0]} speed={0.2} />
      )}
    </group>
  );
}

function Tree({ position, scale = 1 }: { position: [number, number, number], scale?: number }) {
  return (
    <group position={position} scale={scale}>
      <Cylinder args={[0.2, 0.3, 1.5, 8]} position={[0, 0.75, 0]} castShadow>
        <meshStandardMaterial color="#78350f" />
      </Cylinder>
      <Sphere args={[0.8, 16, 16]} position={[0, 2, 0]} castShadow>
        <meshStandardMaterial color="#22c55e" roughness={0.8} />
      </Sphere>
    </group>
  );
}
