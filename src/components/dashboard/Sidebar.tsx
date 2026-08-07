"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Home, 
  Globe2, 
  Target, 
  Gamepad2, 
  Recycle, 
  Users, 
  Trophy, 
  TreePine, 
  Award, 
  UserCircle, 
  Settings,
  Flame,
  Leaf
} from "lucide-react";
import { useEarthStore } from "@/store/useEarthStore";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/dashboard/earth", label: "Earth", icon: Globe2 },
  { href: "/dashboard/challenges", label: "Challenges", icon: Target },
  { href: "/dashboard/games", label: "Games", icon: Gamepad2 },
  { href: "/dashboard/recycling", label: "Recycling AI", icon: Recycle },
  { href: "/dashboard/community", label: "Community", icon: Users },
  { href: "/dashboard/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/dashboard/tree", label: "Life Tree", icon: TreePine },
  { href: "/dashboard/achievements", label: "Achievements", icon: Award },
  { href: "/dashboard/inventory", label: "Inventory", icon: UserCircle },
  { href: "/dashboard/report", label: "Carbon Report", icon: Leaf },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const streak = useEarthStore(state => state.streak);

  return (
    <div className="w-64 h-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-r border-slate-200 dark:border-black/10 flex flex-col pt-6 z-20 text-slate-800 dark:text-slate-200 shadow-[4px_0_24px_rgba(0,0,0,0.05)]">
      
      {/* Logo */}
      <div className="px-8 mb-8 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-900">
          <Leaf className="w-5 h-5 fill-current" />
        </div>
        <span className="font-heading font-bold text-2xl tracking-tight">EcoLife</span>
      </div>

      {/* Nav Links - Scrollable Area */}
      <div className="flex-1 overflow-y-auto px-4 custom-scrollbar flex flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div className={`
                flex items-center gap-4 px-4 py-3 rounded-2xl cursor-pointer transition-all relative group
                ${isActive ? 'text-emerald-700 dark:text-emerald-400 font-bold' : 'hover:bg-slate-100 dark:hover:bg-white/5 font-medium opacity-70 hover:opacity-100'}
              `}>
                {isActive && (
                  <motion.div 
                    layoutId="sidebar-active" 
                    className="absolute inset-0 bg-emerald-100 dark:bg-emerald-500/20 rounded-2xl -z-10" 
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <item.icon className={`w-5 h-5 ${isActive ? 'text-emerald-600 dark:text-emerald-400' : ''}`} />
                <span className="text-sm">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Bottom Section - Chest & Streak */}
      <div className="p-4 mt-auto">
        <div className="bg-slate-50 dark:bg-black/20 rounded-3xl p-4 border border-slate-100 dark:border-white/5 flex flex-col items-center">
          <div className="flex items-center justify-between w-full mb-3 px-2">
            <span className="text-xs font-bold opacity-60 uppercase tracking-widest">Daily Streak</span>
            <div className="flex items-center gap-1 text-orange-500">
              <Flame className="w-4 h-4 fill-current" />
              <span className="font-bold">{streak} <span className="text-[10px] text-slate-500 uppercase">Days</span></span>
            </div>
          </div>
          
          <button className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-900 rounded-2xl font-bold text-sm shadow-lg shadow-emerald-500/30 transition-transform hover:scale-105 mb-4">
            Claim Reward!
          </button>
          
          <div className="relative w-32 h-32 flex items-center justify-center">
            {/* Soft glow behind chest */}
            <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-2xl"></div>
            <img src="/assets/chest.png" alt="Treasure Chest" className="w-full h-full object-contain relative z-10 hover:scale-110 transition-transform cursor-pointer drop-shadow-xl mix-blend-multiply" />
          </div>
        </div>
      </div>
    </div>
  );
}
