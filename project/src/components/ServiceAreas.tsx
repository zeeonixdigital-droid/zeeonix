import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";

/**
 * ServiceAreas — Local SEO / GEO section
 * Targets "near me" + city-specific searches within ~50km of Faridabad.
 * Each area gets its own on-page mention + distance, which helps Google
 * associate this business entity with all these localities.
 */

const primaryArea = {
  name: "Faridabad",
  note: "Head Office — Sector belt, Faridabad, Haryana",
};

const nearbyAreas = [
  { name: "Ballabgarh", distance: "~10 km" },
  { name: "Greater Faridabad (Neharpar)", distance: "~12 km" },
  { name: "South Delhi (Badarpur, Okhla, Saket)", distance: "~15–25 km" },
  { name: "Palwal", distance: "~30 km" },
  { name: "Gurugram (Gurgaon)", distance: "~35 km" },
  { name: "New Delhi (Central & East Delhi)", distance: "~25–35 km" },
  { name: "Noida", distance: "~40 km" },
  { name: "Greater Noida", distance: "~45 km" },
  { name: "Sohna", distance: "~45 km" },
  { name: "Manesar", distance: "~48 km" },
];

export default function ServiceAreas() {
  return (
    <section id="service-areas" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[#08080f]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-brand-700/10 blur-[160px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 glass-light rounded-full px-4 py-2 text-sm text-zinc-300 mb-6">
            <MapPin className="h-4 w-4 text-accent-400" />
            Proudly Local to Faridabad
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Serving Faridabad &{" "}
            <span className="gradient-text">Every Town Within 50km</span>
          </h2>
          <p className="mt-5 text-lg text-zinc-400 leading-relaxed">
            Zeeonix Digital is headquartered in Faridabad, Haryana — and we work
            on-site or remote across the entire NCR belt. Whether you run a
            business in Ballabgarh, Palwal, South Delhi, Noida, or Gurugram,
            our team is close enough to meet in person and fast enough to
            deliver like a local.
          </p>
        </motion.div>

        {/* Map-style layout */}
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Primary city — hero card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 rounded-3xl glass p-8 flex flex-col justify-between relative overflow-hidden group"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-brand-500/20 blur-[80px] group-hover:bg-brand-500/30 transition-colors" />
            <div className="relative z-10">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center neon-glow mb-6">
                <Navigation className="h-6 w-6 text-white" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-accent-400">
                Headquarters
              </span>
              <h3 className="mt-2 text-3xl font-bold font-display text-white">
                {primaryArea.name}, Haryana
              </h3>
              <p className="mt-3 text-zinc-400 leading-relaxed">
                Web design, app development, SEO & digital marketing — built,
                tested, and supported right here in Faridabad. Book an
                in-person consultation or get on a call today.
              </p>
            </div>
            <a
              href="#contact"
              className="relative z-10 mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-400 hover:text-brand-300 transition-colors"
            >
              Get a Free Local SEO Audit →
            </a>
          </motion.div>

          {/* Nearby areas grid */}
          <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-2 gap-4">
            {nearbyAreas.map((area, i) => (
              <motion.div
                key={area.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="rounded-2xl glass-light p-5 hover:border-brand-500/30 hover:bg-white/[0.06] transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-white font-semibold text-sm leading-snug">
                    {area.name}
                  </h4>
                  <MapPin className="h-4 w-4 text-accent-400 flex-shrink-0 mt-0.5" />
                </div>
                <p className="text-xs text-zinc-500 mt-2">{area.distance} from HQ</p>
              </motion.div>
            ))}
          </div>
        </div>

        <p className="mt-10 text-center text-xs text-zinc-600 max-w-2xl mx-auto">
          Distances are approximate road/straight-line estimates from our
          Faridabad office and provided for general reference.
        </p>
      </div>
    </section>
  );
}
