import { motion } from "framer-motion";
import {
  Globe,
  Smartphone,
  Cloud,
  Video,
  Search,
  TrendingUp,
  MessageCircle,
  Mic,
  Headphones,
  Bot,
  Target,
  MapPin,
  ShieldCheck,
  Users,
} from "lucide-react";

// Service cards data — edit to add/remove/modify services
const services = [
  {
    icon: Globe,
    title: "Website Development",
    description:
      "High-performance, SEO-optimized websites built with React, Next.js, or custom stacks. Conversion-focused design that loads in under 2 seconds.",
    gradient: "from-purple-500/20 to-violet-600/10",
    iconGradient: "from-brand-400 to-brand-600",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description:
      "Native iOS & Android apps plus cross-platform Flutter/React Native solutions. Sleek UI, smooth UX, and scalable backend architecture.",
    gradient: "from-cyan-500/20 to-blue-600/10",
    iconGradient: "from-cyan-400 to-blue-500",
  },
  {
    icon: Cloud,
    title: "Micro SaaS Development",
    description:
      "Lean, profitable SaaS products from idea to launch. MVP in 4-6 weeks with subscription billing, user management, and analytics built in.",
    gradient: "from-emerald-500/20 to-teal-600/10",
    iconGradient: "from-emerald-400 to-teal-500",
  },
  {
    icon: Video,
    title: "UGC Ads Creation",
    description:
      "User-generated-content ad creatives that outperform polished ads by 4x. Script writing, filming, editing — full production for TikTok, Meta & YouTube.",
    gradient: "from-orange-500/20 to-rose-600/10",
    iconGradient: "from-orange-400 to-rose-500",
  },
  {
    icon: Search,
    title: "SEO & Marketing",
    description:
      "Technical SEO, content strategy, link building, and paid ads management. We rank you #1 and keep you there with data-driven campaigns.",
    gradient: "from-indigo-500/20 to-purple-600/10",
    iconGradient: "from-indigo-400 to-purple-500",
  },
  {
    icon: TrendingUp,
    title: "Branding & Automation",
    description:
      "Full brand identity design, style guides, and marketing automation funnels. Convert leads on autopilot with email sequences and CRM workflows.",
    gradient: "from-pink-500/20 to-rose-600/10",
    iconGradient: "from-pink-400 to-rose-500",
  },
  {
    icon: Search,
    title: "Advanced SEO Services",
    description:
      "Complete SEO solutions including on-page optimization, off-page link building, technical SEO audits, local SEO, and content marketing. Rank higher on Google and drive organic traffic.",
    gradient: "from-blue-500/20 to-indigo-600/10",
    iconGradient: "from-blue-400 to-indigo-500",
  },
  // NEW AI Services
  {
    icon: MessageCircle,
    title: "AI Chatbot Development",
    description:
      "Intelligent 24/7 customer support chatbots powered by advanced AI. Handle inquiries, book appointments, and boost engagement automatically.",
    gradient: "from-blue-500/20 to-cyan-600/10",
    iconGradient: "from-blue-400 to-cyan-500",
  },
  {
    icon: Mic,
    title: "AI Voice Assistance",
    description:
      "Custom AI voice assistants for your business. Integrate with apps, websites, or devices for hands-free operation and enhanced user experience.",
    gradient: "from-violet-500/20 to-purple-600/10",
    iconGradient: "from-violet-400 to-purple-500",
  },
  {
    icon: Headphones,
    title: "AI Voice Receptionist",
    description:
      "Professional AI phone receptionists that answer calls 24/7. Never miss a customer call again with intelligent call handling and routing.",
    gradient: "from-fuchsia-500/20 to-pink-600/10",
    iconGradient: "from-fuchsia-400 to-pink-500",
  },
  {
    icon: Bot,
    title: "Custom AI Agents",
    description:
      "Bespoke AI agents tailored to your specific business needs. Automate complex workflows, data processing, and decision-making tasks.",
    gradient: "from-emerald-500/20 to-green-600/10",
    iconGradient: "from-emerald-400 to-green-500",
  },
  // NEW Specialized SEO Services for Faridabad
  {
    icon: Target,
    title: "AEO (Answer Engine Optimization)",
    description:
      "Optimize for AI search & voice assistants. Get featured in Google SGE, ChatGPT, Alexa & featured snippets. Position 0 rankings for Faridabad businesses.",
    gradient: "from-violet-500/20 to-purple-600/10",
    iconGradient: "from-violet-400 to-purple-500",
  },
  {
    icon: MapPin,
    title: "GEO (Generative Engine Optimization)",
    description:
      "Appear in AI-generated search responses. Optimize for Google SGE, ChatGPT, Perplexity. Get cited as authoritative source in AI answers.",
    gradient: "from-emerald-500/20 to-green-600/10",
    iconGradient: "from-emerald-400 to-green-500",
  },
  {
    icon: Users,
    title: "Entity SEO",
    description:
      "Build your brand in Google's Knowledge Graph. Get Knowledge Panel, Wikidata presence, and entity-based authority. Future-proof SEO strategy.",
    gradient: "from-fuchsia-500/20 to-pink-600/10",
    iconGradient: "from-fuchsia-400 to-pink-500",
  },
  {
    icon: ShieldCheck,
    title: "Reputation & Conversation SEO",
    description:
      "Manage online reviews, suppress negative content, amplify positive mentions. Control your brand narrative across Google, social media & review platforms.",
    gradient: "from-orange-500/20 to-amber-600/10",
    iconGradient: "from-orange-400 to-amber-500",
  },
];

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#06060e]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500/30 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold text-brand-400 uppercase tracking-widest mb-3">
            What We Offer
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Full-Stack Digital{" "}
            <span className="gradient-text">Services</span>
          </h2>
          <p className="mt-4 text-zinc-400 max-w-xl mx-auto text-lg">
            From the first line of code to million-dollar ad campaigns — we do it
            all under one roof.
          </p>
        </motion.div>

        {/* Service Cards Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={item}
                className="group relative p-6 rounded-2xl glass-light hover:border-white/20 transition-all duration-500 hover:-translate-y-1 cursor-default shimmer-border corner-decor"
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                <div className="relative z-10">
                  <div
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${service.iconGradient} mb-5 shadow-lg transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 font-display">
                    {service.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {service.description}
                  </p>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-brand-400 hover:text-brand-300 transition-colors group/link"
                  >
                    Get Started
                    <span className="group-hover/link:translate-x-1 transition-transform inline-block">
                      →
                    </span>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
