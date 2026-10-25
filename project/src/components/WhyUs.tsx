import { motion } from "framer-motion";
import {
  Zap,
  Clock,
  ShieldCheck,
  MessageSquare,
  BarChart3,
  HeartHandshake,
} from "lucide-react";

// Benefits data — edit to change value propositions
const benefits = [
  {
    icon: Zap,
    title: "Lightning Delivery",
    description:
      "MVP in 4 weeks, full product in 12. We move fast without sacrificing quality — agile sprints with weekly demos.",
  },
  {
    icon: Clock,
    title: "24/7 Support & Maintenance",
    description:
      "Round-the-clock monitoring, instant bug fixes, and proactive updates. Your project never sleeps, and neither do we.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise-Grade Security",
    description:
      "SOC 2 compliant infrastructure, encrypted data at rest and in transit, regular penetration testing. Your data is fortress-level safe.",
  },
  {
    icon: MessageSquare,
    title: "Transparent Communication",
    description:
      "Dedicated Slack channel, weekly strategy calls, and real-time dashboard. Zero black-box agency nonsense — you see everything.",
  },
  {
    icon: BarChart3,
    title: "Data-Driven Decisions",
    description:
      "Every design, feature, and campaign backed by analytics. We A/B test relentlessly and optimize for measurable ROI.",
  },
  {
    icon: HeartHandshake,
    title: "No Lock-In Contracts",
    description:
      "Month-to-month engagements with clear deliverables. We earn your business every 30 days — no sneaky auto-renewals.",
  },
];

export default function WhyUs() {
  return (
    <section id="why-us" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[#06060e]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

      {/* Floating orbs */}
      <div className="absolute top-1/3 -left-32 w-64 h-64 rounded-full bg-emerald-500/8 blur-[100px]" />
      <div className="absolute bottom-1/3 -right-32 w-80 h-80 rounded-full bg-brand-500/8 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold text-emerald-400 uppercase tracking-widest mb-3">
            Why Choose Us
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Agencies <span className="gradient-text-green">Promise</span>.
            We <span className="gradient-text-green">Deliver</span>.
          </h2>
          <p className="mt-4 text-zinc-400 max-w-xl mx-auto text-lg">
            Six reasons why 200+ brands chose Zeeonix and never looked back.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group flex gap-4 p-5 rounded-xl glass-light hover:border-white/15 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex-shrink-0 mt-1">
                  <div className="h-10 w-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-emerald-500/10 transition-colors">
                    <Icon className="h-5 w-5 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white font-display mb-1">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
