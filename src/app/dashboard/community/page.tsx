"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Sky } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";
import { Search, Users } from "lucide-react";

export default function CommunityPage() {
  return (
    <div className="w-full h-[calc(100vh-80px)] relative flex flex-col justify-between overflow-hidden">
      
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 20, 40], fov: 45 }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 20, 10]} intensity={1.5} color="#fdf4dc" castShadow />
          
          <Sky sunPosition={[10, 20, 10]} turbidity={0.1} rayleigh={0.5} />
          
          {/* Ground */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
            <planeGeometry args={[200, 200]} />
            <meshStandardMaterial color="#0f3d23" roughness={1} />
          </mesh>

          {/* Instanced Forest */}
          <CommunityForest count={2000} />
          
          <OrbitControls 
            enableZoom={true} 
            maxPolarAngle={Math.PI / 2 - 0.1} 
            minPolarAngle={0} 
            autoRotate 
            autoRotateSpeed={0.2} 
            maxDistance={80}
            minDistance={10}
          />
          <Environment preset="forest" />
        </Canvas>
      </div>

      {/* HUD Overlay */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 pointer-events-auto p-6 max-w-xl"
      >
        <h1 className="text-4xl font-bold font-heading text-slate-900 drop-shadow-md mb-2 flex items-center gap-3">
          <Users className="w-8 h-8 text-emerald-400" /> Community Forest
        </h1>
        <p className="text-slate-700 glass-card p-4 rounded-xl border border-black/10">
          This forest represents thousands of EcoLife users worldwide. Every tree is a real person contributing to global sustainability.
        </p>
      </motion.div>

      {/* Search Bar */}
      <div className="relative z-10 pointer-events-auto p-6 self-end w-full md:w-96">
        <div className="glass-card rounded-2xl border border-black/10 p-2 flex items-center shadow-2xl backdrop-blur-md">
          <Search className="w-5 h-5 text-slate-600 mx-2" />
          <input 
            type="text" 
            placeholder="Search for a friend's tree..." 
            className="flex-1 bg-transparent border-none outline-none text-slate-900 placeholder:text-gray-500"
          />
        </div>
      </div>

    </div>
  );
}

function CommunityForest({ count = 1000 }: { count: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  // Pre-calculate positions and scales
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const treeData = useMemo(() => {
    const data = [];
    for (let i = 0; i < count; i++) {
      // Random position in a circle
      const radius = 10 + Math.random() * 80;
      const angle = Math.random() * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      
      // Random scale to simulate different user levels
      const scale = 0.5 + Math.random() * 1.5;
      
      data.push({ x, z, scale });
    }
    return data;
  }, [count]);

  useMemo(() => {
    if (!meshRef.current) return;
    
    treeData.forEach((tree, i) => {
      dummy.position.set(tree.x, tree.scale * 1.5, tree.z);
      dummy.scale.set(tree.scale, tree.scale * 1.5, tree.scale);
      dummy.rotation.y = Math.random() * Math.PI;
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
      
      // Add slight color variation
      const color = new THREE.Color().setHSL(
        0.33 + Math.random() * 0.1, // Green hue
        0.7 + Math.random() * 0.3,  // Saturation
        0.2 + Math.random() * 0.3   // Lightness
      );
      meshRef.current!.setColorAt(i, color);
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
    if(meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  }, [treeData, dummy]);

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} castShadow receiveShadow>
      {/* Simple stylized tree geometry: a cone */}
      <coneGeometry args={[1, 3, 5]} />
      <meshStandardMaterial roughness={0.8} />
    </instancedMesh>
  );
}
