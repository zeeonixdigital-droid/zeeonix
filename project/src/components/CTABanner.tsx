import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface CTABannerProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
}

export default function CTABanner({
  title = "Ready to Build Something Great?",
  subtitle = "Let's turn your vision into a high-performing digital product. Zero risk, maximum impact.",
  buttonText = "Start Your Project",
}: CTABannerProps) {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-[#06060e]" />

      {/* Glow background */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-600/5 via-brand-500/10 to-cyan-500/5" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="glass rounded-3xl p-8 sm:p-14 shimmer-border"
        >
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            {title}
          </h2>
          <p className="text-zinc-400 max-w-lg mx-auto mb-8 text-base sm:text-lg">
            {subtitle}
          </p>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-brand-700 px-8 py-4 text-base font-semibold text-white neon-glow hover:from-brand-400 hover:to-brand-600 transition-all duration-300 hover:scale-105 shadow-xl shadow-brand-600/25"
          >
            {buttonText}
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
