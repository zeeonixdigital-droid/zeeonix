import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X, Code2, Trophy } from "lucide-react";
import { getStaticCaseStudies, type CaseStudy } from "../lib/db";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardItem = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function Portfolio() {
  const [projects] = useState<CaseStudy[]>(getStaticCaseStudies());
  const [selectedProject, setSelectedProject] = useState<CaseStudy | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  return (
    <section id="portfolio" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[#06060e]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold text-cyan-400 uppercase tracking-widest mb-3">
            Portfolio
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Projects That{" "}
            <span className="gradient-text">Win Markets</span>
          </h2>
          <p className="mt-4 text-zinc-400 max-w-xl mx-auto text-lg">
            Click any project to view the full case study — results, tech stack, and metrics.
          </p>
        </motion.div>

        {/* Project Cards Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardItem}
              onClick={() => setSelectedProject(project)}
              className={`group relative rounded-2xl overflow-hidden border ${project.accent} glass cursor-pointer shimmer-border`}
            >
              {/* Project Image */}
              <div className="aspect-[3/2] overflow-hidden">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-60 group-hover:opacity-40 transition-opacity duration-500 z-10`}
                />
                <img
                  src={project.img}
                  alt={project.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Overlay Content */}
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-6">
                <span className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
                  {project.category}
                </span>
                <h3 className="text-xl font-bold text-white font-display mb-1">
                  {project.title}
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-h-0 group-hover:max-h-20 overflow-hidden">
                  {project.description}
                </p>
                <div className="mt-3 flex items-center gap-2 text-sm font-medium text-white opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  View Full Case Study
                  <ExternalLink className="h-4 w-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-14 text-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-xl glass-light px-8 py-3 text-base font-semibold text-white hover:bg-white/10 transition-all duration-300 hover:scale-105 border border-white/10"
          >
            Want Your Project Here? Let's Talk →
          </a>
        </motion.div>
      </div>

      {/* ===== Case Study Modal ===== */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" as const }}
              onClick={(e) => e.stopPropagation()}
              className="relative glass rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shimmer-border"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-white/20 transition-all backdrop-blur-sm"
                aria-label="Close case study"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Hero Image */}
              <div className="aspect-[16/9] overflow-hidden rounded-t-3xl relative">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${selectedProject.gradient} z-10`}
                />
                <img
                  src={selectedProject.img}
                  alt={selectedProject.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
                  <span className="inline-block text-xs font-semibold text-white/70 uppercase tracking-wider bg-white/10 rounded-full px-3 py-1 mb-3 backdrop-blur-sm">
                    {selectedProject.category}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
                    {selectedProject.title}
                  </h2>
                </div>
              </div>

              {/* Details */}
              <div className="p-6 sm:p-8 space-y-6">
                {/* Description */}
                <div>
                  <h3 className="text-sm font-semibold text-brand-400 uppercase tracking-wider mb-2">
                    Overview
                  </h3>
                  <p className="text-zinc-300 leading-relaxed">
                    {selectedProject.full_description || selectedProject.description}
                  </p>
                </div>

                {/* Results */}
                {selectedProject.results && (
                  <div>
                    <h3 className="text-sm font-semibold text-brand-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-amber-400" />
                      Results & Impact
                    </h3>
                    <div className="glass-light rounded-xl p-4">
                      <pre className="text-sm text-zinc-200 font-sans whitespace-pre-line leading-relaxed">
                        {selectedProject.results}
                      </pre>
                    </div>
                  </div>
                )}

                {/* Tech Stack */}
                {selectedProject.tech_stack && (
                  <div>
                    <h3 className="text-sm font-semibold text-brand-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Code2 className="h-4 w-4 text-cyan-400" />
                      Tech Stack
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech_stack.split(", ").map((tech) => (
                        <span
                          key={tech}
                          className="inline-block rounded-lg bg-white/5 border border-white/10 px-3 py-1.5 text-xs font-medium text-zinc-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <a
                    href="#contact"
                    onClick={() => setSelectedProject(null)}
                    className="flex-1 text-center rounded-xl bg-gradient-to-r from-brand-500 to-brand-700 py-3 text-sm font-semibold text-white hover:from-brand-400 hover:to-brand-600 transition-all"
                  >
                    Start a Similar Project →
                  </a>
                  <a
                    href={`https://wa.me/919205568663?text=Hi%20Zeeonix!%20I'm%20interested%20in%20a%20project%20like%20${encodeURIComponent(selectedProject.title)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center rounded-xl bg-green-500/20 border border-green-500/30 py-3 text-sm font-semibold text-green-300 hover:bg-green-500/30 transition-all"
                  >
                    Discuss on WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
