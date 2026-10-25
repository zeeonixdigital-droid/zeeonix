import { motion } from "framer-motion";
import { TypeAnimation } from "./TypeAnimation";
import Hero3D from "./Hero3D";
import { ArrowRight, Play, MapPin } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* ===== Animated Background Orbs ===== */}
      <div className="absolute inset-0 bg-[#06060e] bg-grid" />
      <div className="absolute top-1/4 -left-20 w-72 h-72 rounded-full bg-brand-500/20 blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-cyan-500/10 blur-[140px] animate-pulse-glow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-700/8 blur-[180px] animate-float-slow" />

      {/* ===== 3D Ambient Layer ===== */}
      <Hero3D />

      {/* ===== Content ===== */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 glass-light rounded-full px-4 py-2 text-sm text-zinc-300 mb-8 animate-pulse-glow shimmer-border"
        >
          <MapPin className="h-3.5 w-3.5 text-accent-400" />
          Faridabad's Premium Digital Agency — Serving All of NCR
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight max-w-5xl mx-auto"
        >
          We Craft{" "}
          <span className="gradient-text neon-text">
            <TypeAnimation />
          </span>{" "}
          <br className="hidden sm:block" />
          That Dominate Markets
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-6 text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed"
        >
          Zeeonix Digital builds premium websites, apps, micro SaaS, and UGC ads
          engineered to convert — for businesses in Faridabad and every town
          within 50km, with SEO, branding & automation baked in.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-brand-700 px-8 py-4 text-base font-semibold text-white neon-glow hover:from-brand-400 hover:to-brand-600 transition-all duration-300 hover:scale-105 shadow-xl shadow-brand-600/25"
          >
            Start Your Project
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#portfolio"
            className="inline-flex items-center gap-2 rounded-xl glass-light px-8 py-4 text-base font-medium text-zinc-200 hover:text-white transition-all duration-300 hover:scale-105"
          >
            <Play className="h-5 w-5" />
            View Our Work
          </a>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
        >
          {[
            { value: "200+", label: "Projects Delivered" },
            { value: "50+", label: "Team Experts" },
            { value: "98%", label: "Client Retention" },
            { value: "4.9", label: "Avg. Rating" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold font-display gradient-text">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-zinc-500 mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#06060e] to-transparent pointer-events-none" />
    </section>
  );
}
