import { Html } from '@react-three/drei';
import { motion } from 'framer-motion';

export function EarthPlaceholder({ scale = 1 }: { scale?: number }) {
  // We use HTML to render the pure CSS placeholder over the 3D canvas origin
  return (
    <Html center>
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.1 }}
        className="relative"
        style={{ width: 120 * scale, height: 120 * scale }}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 shadow-[0_0_50px_rgba(16,185,129,0.2)] overflow-hidden">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 w-[200%] flex"
          >
            <div className="w-1/2 h-full relative">
              <div className="absolute top-[20%] left-[20%] w-[40%] h-[30%] bg-emerald-400 rounded-full blur-[2px] opacity-80" />
              <div className="absolute bottom-[30%] right-[20%] w-[35%] h-[40%] bg-emerald-500 rounded-full blur-[2px] opacity-80" />
            </div>
            <div className="w-1/2 h-full relative">
              <div className="absolute top-[20%] left-[20%] w-[40%] h-[30%] bg-emerald-400 rounded-full blur-[2px] opacity-80" />
              <div className="absolute bottom-[30%] right-[20%] w-[35%] h-[40%] bg-emerald-500 rounded-full blur-[2px] opacity-80" />
            </div>
          </motion.div>
        </div>
        <div className="absolute inset-[-4px] rounded-full border-2 border-cyan-300/30 blur-[4px]" />
      </motion.div>
    </Html>
  );
}
