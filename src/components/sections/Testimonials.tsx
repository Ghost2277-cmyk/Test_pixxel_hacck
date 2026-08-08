"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Community Leader",
    text: "SYLVA-eCO LIFE turned my daily guilt into action. Watching my digital Earth heal every time I recycle is incredibly motivating.",
    img: "https://i.pravatar.cc/150?img=1"
  },
  {
    name: "David Chen",
    role: "Software Engineer",
    text: "The AI Mentor is brilliant. It suggested tiny habit changes that didn't disrupt my routine but saved me money and lowered my footprint.",
    img: "https://i.pravatar.cc/150?img=11"
  },
  {
    name: "Elena Rodriguez",
    role: "Teacher",
    text: "My students use SYLVA-eCO LIFE for our class project. The gamification aspect completely engaged them in sustainability.",
    img: "https://i.pravatar.cc/150?img=5"
  }
];

export function Testimonials() {
  return (
    <section className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-heading">
            Stories of <span className="text-cyan-400">Impact</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-8 rounded-3xl space-y-6 relative"
            >
              <div className="text-emerald-400 text-4xl font-serif absolute top-4 right-6 opacity-20">"</div>
              <p className="text-gray-300 relative z-10 leading-relaxed text-lg">"{test.text}"</p>
              
              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <img src={test.img} alt={test.name} className="w-12 h-12 rounded-full ring-2 ring-emerald-500/30" />
                <div>
                  <h4 className="font-bold text-white">{test.name}</h4>
                  <p className="text-sm text-gray-500">{test.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
