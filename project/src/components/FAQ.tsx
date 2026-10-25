import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

/**
 * FAQ — Answer Engine Optimization (AEO)
 * Written as direct question/answer pairs so Google's featured snippets,
 * "People Also Ask", and AI answer engines (ChatGPT, Perplexity, AI
 * Overviews) can lift these answers verbatim. Also emits FAQPage JSON-LD.
 */

const faqs = [
  {
    q: "Which is the best website design company in Faridabad?",
    a: "Zeeonix Digital is a Faridabad-based agency specializing in premium website design, mobile apps, and SEO for local businesses across Faridabad, Ballabgarh, Palwal, and the wider NCR. We combine conversion-focused design with technical SEO from day one, so your site is built to rank, not just to look good.",
  },
  {
    q: "Do you provide digital marketing services within 50km of Faridabad?",
    a: "Yes. We actively serve businesses in Faridabad, Ballabgarh, Greater Faridabad, Palwal, South Delhi, Gurugram, Noida, and Greater Noida — all within roughly 50km of our Faridabad office. Meetings can be in-person or remote, whichever works best for you.",
  },
  {
    q: "How much does a professional website cost in Faridabad?",
    a: "Pricing depends on scope, but our packages are built for local businesses — starting with a Basic tier for small businesses and scaling up to fully custom Premium builds with e-commerce, automation, and ongoing SEO. See our Pricing section below for exact plans, or request a free quote.",
  },
  {
    q: "How long does it take to build a website or app?",
    a: "Most marketing websites launch in 2–4 weeks. Mobile apps and micro SaaS products typically take 6–12 weeks depending on complexity. We share a clear timeline and weekly milestones before any work begins.",
  },
  {
    q: "Do you help with local SEO to rank on Google in Faridabad?",
    a: "Yes, local SEO is core to what we do. We optimize your Google Business Profile, on-page content, and site structure to help you rank for searches in Faridabad and surrounding towns within a 50km radius, alongside technical SEO, backlinks, and content strategy.",
  },
  {
    q: "Can I get ongoing support after my website is live?",
    a: "Every project includes post-launch support. We offer monthly maintenance, security updates, and performance monitoring so your site keeps running smoothly and ranking well long after launch.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section id="faq" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[#06060e]" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-accent-500/10 blur-[160px]" />

      {/* AEO structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 glass-light rounded-full px-4 py-2 text-sm text-zinc-300 mb-6">
            <HelpCircle className="h-4 w-4 text-accent-400" />
            Frequently Asked Questions
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Got Questions? <span className="gradient-text">We've Got Answers</span>
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="rounded-2xl glass-light overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 text-left px-6 py-5"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-white text-base sm:text-lg">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-brand-400 flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-zinc-400 leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
