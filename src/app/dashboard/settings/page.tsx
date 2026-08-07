"use client";

import { Bell, Lock, Eye, Download, Trash2, Moon, Globe, Volume2 } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold font-heading mb-2">Settings</h1>
        <p className="text-slate-600">Manage your account preferences and app configuration.</p>
      </div>

      <div className="space-y-6">
        
        {/* Appearance */}
        <section className="glass-card p-6 rounded-3xl border border-black/10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Moon className="w-5 h-5 text-emerald-400" /> Appearance
          </h2>
          <div className="space-y-4">
            <SettingRow label="Theme" description="Switch between Dark and Light mode.">
              <select className="bg-white/40 border border-black/10 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-emerald-500">
                <option>Dark Mode (Eco)</option>
                <option>Light Mode</option>
                <option>System Default</option>
              </select>
            </SettingRow>
            <SettingRow label="Ambient Animations" description="Toggle background particles and leaves.">
              <Toggle defaultChecked />
            </SettingRow>
            <SettingRow label="High Quality 3D Earth" description="Disable for better performance on low-end devices.">
              <Toggle defaultChecked />
            </SettingRow>
          </div>
        </section>

        {/* Notifications */}
        <section className="glass-card p-6 rounded-3xl border border-black/10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5 text-emerald-400" /> Notifications
          </h2>
          <div className="space-y-4">
            <SettingRow label="Daily Reminders" description="Get notified to complete your daily challenges.">
              <Toggle defaultChecked />
            </SettingRow>
            <SettingRow label="Leaderboard Alerts" description="When someone passes your rank.">
              <Toggle />
            </SettingRow>
            <SettingRow label="AI Mentor Updates" description="Personalized tips from the Recycling AI.">
              <Toggle defaultChecked />
            </SettingRow>
          </div>
        </section>

        {/* Privacy & Data */}
        <section className="glass-card p-6 rounded-3xl border border-black/10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Lock className="w-5 h-5 text-emerald-400" /> Privacy & Data
          </h2>
          <div className="space-y-4">
            <SettingRow label="Public Profile" description="Allow others to see your Life Tree and Achievements.">
              <Toggle defaultChecked />
            </SettingRow>
            
            <div className="pt-4 border-t border-white/5 flex gap-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors">
                <Download className="w-4 h-4" /> Export Data
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-xl transition-colors border border-red-500/20">
                <Trash2 className="w-4 h-4" /> Delete Account
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

function SettingRow({ label, description, children }: any) {
  return (
    <div className="flex items-center justify-between py-2">
      <div>
        <div className="font-semibold text-slate-900">{label}</div>
        <div className="text-sm text-slate-600">{description}</div>
      </div>
      <div>{children}</div>
    </div>
  );
}

function Toggle({ defaultChecked = false }) {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" value="" className="sr-only peer" defaultChecked={defaultChecked} />
      <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
    </label>
  );
}
