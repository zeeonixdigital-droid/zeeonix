import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, MessageCircle, Mail, MapPin, Phone } from "lucide-react";

// Contact info — Zeeonix Digital real details
const contactInfo = {
  whatsapp: "919205568663", // Indian WhatsApp number with country code
  email: "zeenexdigi@protonmail.com",
  location: "Faridabad, Haryana, India",
  phone: "+91 9205568663",
};

// Import the database service for form submission
import { submitContactForm } from "../lib/db";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Submit to database backend
      const result = await submitContactForm({
        name: formState.name,
        email: formState.email,
        service: formState.service,
        message: formState.message,
      });

      if (result.success) {
        setSubmitted(true);
        setFormState({ name: "", email: "", service: "", message: "" });
      } else {
        setError(result.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const whatsappURL = `https://wa.me/${contactInfo.whatsapp}?text=Hi%20Zeeonix%20Digital!%20I'm%20interested%20in%20your%20services.`;

  return (
    <section id="contact" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[#06060e]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500/20 to-transparent" />

      {/* Background orb */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-brand-600/8 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold text-brand-400 uppercase tracking-widest mb-3">
            Let's Build
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Ready to{" "}
            <span className="gradient-text">Dominate?</span>
          </h2>
          <p className="mt-4 text-zinc-400 max-w-xl mx-auto text-lg">
            Tell us about your project. We'll get back within 2 hours — guaranteed.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
          >
            {submitted ? (
              <div className="glass rounded-2xl p-10 text-center">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-accent-400 to-accent-500 flex items-center justify-center mx-auto mb-5 neon-glow-cyan">
                  <Send className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white font-display mb-2">
                  Message Sent!
                </h3>
                <p className="text-zinc-400 mb-6">
                  We'll get back to you within 2 hours. In the meantime, feel free to WhatsApp us.
                </p>
                <a
                  href={whatsappURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-green-500 px-6 py-3 text-sm font-semibold text-white hover:bg-green-400 transition-all"
                >
                  <MessageCircle className="h-5 w-5" />
                  Chat on WhatsApp
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 sm:p-8 space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-zinc-300 mb-1.5"
                  >
                    Your Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) =>
                      setFormState({ ...formState, name: e.target.value })
                    }
                    placeholder="John Doe"
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/30 transition-all"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-zinc-300 mb-1.5"
                  >
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) =>
                      setFormState({ ...formState, email: e.target.value })
                    }
                    placeholder="john@company.com"
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/30 transition-all"
                  />
                </div>
                <div>
                  <label
                    htmlFor="service"
                    className="block text-sm font-medium text-zinc-300 mb-1.5"
                  >
                    Service Interested In *
                  </label>
                  <select
                    id="service"
                    required
                    value={formState.service}
                    onChange={(e) =>
                      setFormState({ ...formState, service: e.target.value })
                    }
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/30 transition-all appearance-none cursor-pointer"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%2394a3b8' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10z'/%3E%3C/svg%3E\")",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 1rem center",
                    }}
                  >
                    <option value="" disabled className="bg-zinc-900">
                      Select a service...
                    </option>
                    <option value="website" className="bg-zinc-900 text-white">
                      Website Development
                    </option>
                    <option value="app" className="bg-zinc-900 text-white">
                      Mobile App Development
                    </option>
                    <option value="saas" className="bg-zinc-900 text-white">
                      Micro SaaS Development
                    </option>
                    <option value="ugc" className="bg-zinc-900 text-white">
                      UGC Ads Creation
                    </option>
                    <option value="seo" className="bg-zinc-900 text-white">
                      SEO & Marketing
                    </option>
                    <option value="branding" className="bg-zinc-900 text-white">
                      Branding & Automation
                    </option>
                    <option value="other" className="bg-zinc-900 text-white">
                      Multiple / Other
                    </option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-zinc-300 mb-1.5"
                  >
                    Project Details
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formState.message}
                    onChange={(e) =>
                      setFormState({ ...formState, message: e.target.value })
                    }
                    placeholder="Tell us about your project, goals, timeline, and budget..."
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/30 transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-brand-700 py-3.5 text-base font-semibold text-white neon-glow hover:from-brand-400 hover:to-brand-600 transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {loading ? (
                    <span className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Send Message
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
                {error && (
                  <p className="text-sm text-red-400 text-center bg-red-500/10 rounded-lg py-2 px-4">
                    {error}
                  </p>
                )}
                <p className="text-xs text-zinc-500 text-center">
                  We respect your privacy. No spam, ever.
                </p>
              </form>
            )}
          </motion.div>

          {/* Contact Info + WhatsApp */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-6"
          >
            {/* Info Cards */}
            <div className="glass rounded-2xl p-6 sm:p-8 space-y-5">
              <h3 className="text-xl font-bold text-white font-display">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-zinc-300">
                  <Mail className="h-5 w-5 text-brand-400 flex-shrink-0" />
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="hover:text-brand-400 transition-colors"
                  >
                    {contactInfo.email}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-zinc-300">
                  <Phone className="h-5 w-5 text-brand-400 flex-shrink-0" />
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="hover:text-brand-400 transition-colors"
                  >
                    {contactInfo.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-zinc-300">
                  <MapPin className="h-5 w-5 text-brand-400 flex-shrink-0" />
                  <span>{contactInfo.location}</span>
                </div>
              </div>
            </div>

            {/* WhatsApp Card */}
            <a
              href={whatsappURL}
              target="_blank"
              rel="noopener noreferrer"
              className="glass rounded-2xl p-6 sm:p-8 group hover:border-green-500/30 transition-all duration-300 hover:-translate-y-1 neon-glow-cyan"
            >
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-green-500/20 flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                  <MessageCircle className="h-7 w-7 text-green-400" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white font-display">
                    Chat on WhatsApp
                  </h4>
                  <p className="text-sm text-zinc-400">
                    Get an instant response — we reply in under 5 minutes
                  </p>
                </div>
              </div>
            </a>

            {/* CTA Box */}
            <div className="glass rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-brand-500/10 to-transparent">
              <h4 className="text-lg font-bold text-white font-display mb-2">
                Need Urgent Help?
              </h4>
              <p className="text-sm text-zinc-400 mb-4">
                We offer priority onboarding for time-sensitive projects. Mention "FAST TRACK" and get your project started within 24 hours.
              </p>
              <div className="inline-flex items-center gap-2 text-sm font-medium text-brand-400">
                <span className="h-2 w-2 rounded-full bg-accent-400 animate-pulse" />
                Available Now — Let's Go
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
