import { motion } from "framer-motion";
import { Check, Zap, Crown } from "lucide-react";

// Pricing plans — edit prices and features here
const plans = [
  {
    name: "Basic",
    icon: Zap,
    price: "Get Quote",
    period: "",
    description: "Perfect for startups and small businesses looking to establish their digital presence.",
    features: [
      "Custom 5-Page Website",
      "Mobile Responsive Design",
      "Basic SEO Setup",
      "1 Month Support",
      "Contact Form Integration",
      "Social Media Links",
    ],
    highlighted: false,
    buttonText: "Get Started",
    buttonStyle: "glass-light text-white hover:bg-white/10",
  },
  {
    name: "Pro",
    icon: Crown,
    price: "Get Quote",
    period: "",
    description: "For growing businesses that need a complete digital solution with marketing.",
    features: [
      "Everything in Basic",
      "Custom Web/Mobile App",
      "Advanced SEO + Content Strategy",
      "3 Months Support & Maintenance",
      "UGC Ad Campaign (5 Creatives)",
      "Analytics Dashboard Setup",
      "Email Automation Funnel",
      "Priority Slack Channel",
    ],
    highlighted: true,
    buttonText: "Go Pro",
    buttonStyle:
      "bg-gradient-to-r from-brand-500 to-brand-700 text-white neon-glow hover:from-brand-400 hover:to-brand-600",
    badge: "Most Popular",
  },
  {
    name: "Premium",
    icon: Zap,
    price: "Custom",
    period: "",
    description: "Enterprise-grade solution for established brands needing full-stack digital dominance.",
    features: [
      "Everything in Pro",
      "Full SaaS Product Development",
      "Unlimited UGC Ad Creatives",
      "Dedicated Account Manager",
      "12 Months Priority Support",
      "Custom API Integrations",
      "Brand Identity & Style Guide",
      "Weekly Strategy Consultations",
      "Performance Guarantee",
    ],
    highlighted: false,
    buttonText: "Contact Sales",
    buttonStyle: "glass-light text-white hover:bg-white/10",
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardItem = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[#06060e]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500/20 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold text-brand-400 uppercase tracking-widest mb-3">
            Pricing
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Simple, Transparent{" "}
            <span className="gradient-text">Pricing</span>
          </h2>
          <p className="mt-4 text-zinc-400 max-w-xl mx-auto text-lg">
            No hidden fees. No surprises. Just results. Every plan includes a money-back guarantee.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.name}
                variants={cardItem}
                className={`relative rounded-2xl p-6 sm:p-8 flex flex-col ${
                  plan.highlighted
                    ? "glass border-brand-500/30 -mt-2 md:-mt-4 md:-mb-4 z-10 neon-glow shimmer-border"
                    : "glass-light"
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-brand-500 to-brand-700 px-4 py-1 text-xs font-semibold text-white neon-glow">
                    {plan.badge}
                  </div>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                      plan.highlighted
                        ? "bg-gradient-to-br from-brand-500 to-brand-700"
                        : "bg-white/5"
                    }`}
                  >
                    <Icon
                      className={`h-5 w-5 ${
                        plan.highlighted ? "text-white" : "text-brand-400"
                      }`}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white font-display">
                    {plan.name}
                  </h3>
                </div>

                <div className="mb-2">
                  <span className="text-4xl font-extrabold text-white font-display">
                    {plan.price}
                  </span>
                  <span className="text-zinc-400 text-sm">{plan.period}</span>
                </div>

                <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
                  {plan.description}
                </p>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm text-zinc-300"
                    >
                      <Check className="h-4 w-4 text-accent-400 flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`block text-center rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300 hover:scale-105 ${plan.buttonStyle}`}
                >
                  {plan.buttonText}
                </a>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
