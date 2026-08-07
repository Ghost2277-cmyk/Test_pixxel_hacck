"use client";

import { motion } from "framer-motion";
import { LineChart as LucideLineChart, BarChart2, TrendingDown, BrainCircuit } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const areaData = [
  { name: 'Jan', emissions: 120 },
  { name: 'Feb', emissions: 110 },
  { name: 'Mar', emissions: 95 },
  { name: 'Apr', emissions: 105 },
  { name: 'May', emissions: 80 },
  { name: 'Jun', emissions: 75 },
];

const barData = [
  { name: 'Transport', value: 45 },
  { name: 'Energy', value: 30 },
  { name: 'Food', value: 15 },
  { name: 'Waste', value: 10 },
];

export default function CarbonReportPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-4">
        <div>
          <h1 className="text-4xl font-bold font-heading mb-2">Carbon Report</h1>
          <p className="text-slate-600">Detailed analytics of your environmental impact.</p>
        </div>
        
        <div className="flex items-center gap-2">
          <select className="bg-white/40 border border-black/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-emerald-500">
            <option>Last 6 Months</option>
            <option>This Year</option>
            <option>All Time</option>
          </select>
          <button className="px-4 py-2 bg-emerald-500 text-black font-bold rounded-xl hover:bg-emerald-400 transition-colors">
            Export PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Total Reduction */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 rounded-3xl border border-emerald-500/30 bg-emerald-900/10"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-600 font-semibold uppercase text-xs tracking-wider">Total CO₂ Saved</h3>
            <TrendingDown className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-4xl font-bold font-heading text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-2">
            1,245 kg
          </div>
          <p className="text-sm text-emerald-400 font-semibold">+15% vs last month</p>
        </motion.div>

        {/* AI Analysis Summary */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6 rounded-3xl border border-black/10 md:col-span-2 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-10 -mt-10" />
          <div className="flex items-center gap-3 mb-4">
            <BrainCircuit className="w-6 h-6 text-emerald-400" />
            <h3 className="text-slate-900 font-bold font-heading text-lg">AI Mentor Analysis</h3>
          </div>
          <p className="text-slate-700 leading-relaxed text-sm">
            "You are doing exceptionally well! Your transport emissions have dropped by 30% this month due to your new cycling habit. However, your energy consumption at home spiked slightly last week. If you focus on unplugging devices, you can easily hit your goal of 500kg saved this quarter."
          </p>
        </motion.div>

        {/* Area Chart: Trend */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6 rounded-3xl border border-black/10 md:col-span-2 h-[400px] flex flex-col"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-slate-900 font-semibold flex items-center gap-2">
              <LucideLineChart className="w-5 h-5 text-emerald-400" /> Emissions Trend
            </h3>
          </div>
          <div className="flex-1 w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorReport" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderColor: 'rgba(16,185,129,0.3)', borderRadius: '12px' }}
                  itemStyle={{ color: '#10b981' }}
                />
                <Area type="monotone" dataKey="emissions" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorReport)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Bar Chart: Breakdown */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6 rounded-3xl border border-black/10 md:col-span-1 h-[400px] flex flex-col"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-slate-900 font-semibold flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-cyan-400" /> By Category
            </h3>
          </div>
          <div className="flex-1 w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 0, right: 0, left: -30, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderColor: 'rgba(34,211,238,0.3)', borderRadius: '12px' }}
                  itemStyle={{ color: '#22d3ee' }}
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                />
                <Bar dataKey="value" fill="#22d3ee" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
