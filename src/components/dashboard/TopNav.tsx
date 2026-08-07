import { Bell, Gift, Settings, Plus, Zap, Diamond, Trophy, Leaf } from "lucide-react";
import { useEarthStore } from "@/store/useEarthStore";

export function TopNav() {
  const { level, xp, greenCoins, gems, energy } = useEarthStore();

  return (
    <div className="h-20 w-full flex items-center justify-between px-6 bg-transparent relative z-20 pointer-events-auto">
      
      {/* Player Profile */}
      <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-full pr-6 p-2 border border-white/20 shadow-lg">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-400">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar" className="w-full h-full object-cover bg-sky-200" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-sm">Eco Explorer</span>
          <span className="text-xs font-bold text-emerald-400">Level 24</span>
          <div className="w-32 h-2 bg-black/30 rounded-full mt-1 relative overflow-hidden">
            <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-400 to-green-500 w-[60%]"></div>
          </div>
        </div>
        <div className="text-[10px] opacity-70 ml-2 mt-4 font-bold">2,450 / 4,000 XP</div>
      </div>

      {/* Center Resources */}
      <div className="flex items-center gap-4">
        {/* Energy */}
        <div className="flex items-center bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20 shadow-lg gap-3">
          <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
            <Zap className="w-5 h-5 text-amber-500 fill-current" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold opacity-70">Energy</span>
            <span className="font-bold text-sm leading-none">{energy} / 100</span>
          </div>
          <button className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-slate-900 ml-2 transition">
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Coins */}
        <div className="flex items-center bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20 shadow-lg gap-3">
          <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
            <Trophy className="w-5 h-5 text-yellow-500 fill-current" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold opacity-70">Coins</span>
            <span className="font-bold text-sm leading-none">{greenCoins.toLocaleString()}</span>
          </div>
          <button className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-slate-900 ml-2 transition">
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Gems */}
        <div className="flex items-center bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20 shadow-lg gap-3">
          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
            <Diamond className="w-5 h-5 text-purple-500 fill-current" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold opacity-70">Gems</span>
            <span className="font-bold text-sm leading-none">{gems.toLocaleString()}</span>
          </div>
          <button className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-slate-900 ml-2 transition">
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Right Icons */}
      <div className="flex items-center gap-3">
        <button className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center hover:bg-white/20 transition shadow-lg">
          <Gift className="w-5 h-5" />
        </button>
        <button className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center hover:bg-white/20 transition shadow-lg relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full border-2 border-slate-900 text-[8px] flex items-center justify-center font-bold">3</span>
        </button>
        <button className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center hover:bg-white/20 transition shadow-lg">
          <Settings className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
}
