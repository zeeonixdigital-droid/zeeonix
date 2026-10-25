import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import { Zap } from "lucide-react";
import { FaXTwitter, FaLinkedinIn, FaInstagram, FaGithub, FaYoutube } from "react-icons/fa6";
import { subscribeNewsletter } from "../lib/db";

// Footer links — edit these to match your actual links
const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Why Us", href: "/#why-us" },
  { label: "Blog", href: "/blog" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Contact", href: "/#contact" },
];

const footerServices = [
  { label: "Website Development", href: "/#services" },
  { label: "Mobile App Development", href: "/#services" },
  { label: "Micro SaaS", href: "/#services" },
  { label: "UGC Ads Creation", href: "/#services" },
  { label: "SEO & Marketing", href: "/#services" },
  { label: "Branding & Automation", href: "/#services" },
];

const socialLinks = [
  { icon: FaXTwitter, href: "#", label: "Twitter / X" },
  { icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaGithub, href: "#", label: "GitHub" },
  { icon: FaYoutube, href: "#", label: "YouTube" },
];

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [newsletterMessage, setNewsletterMessage] = useState("");

  const handleNewsletterSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    
    setNewsletterStatus("loading");
    setNewsletterMessage("");

    const result = await subscribeNewsletter(newsletterEmail);
    
    if (result.success) {
      setNewsletterStatus("success");
      setNewsletterMessage(result.isDuplicate ? "You're already subscribed! ✓" : "Subscribed successfully! Check your inbox soon. ✓");
      setNewsletterEmail("");
      setTimeout(() => {
        setNewsletterStatus("idle");
        setNewsletterMessage("");
      }, 5000);
    } else {
      setNewsletterStatus("error");
      setNewsletterMessage(result.error || "Something went wrong. Please try again.");
      setTimeout(() => {
        setNewsletterStatus("idle");
        setNewsletterMessage("");
      }, 5000);
    }
  };

  return (
    <footer className="relative bg-[#06060e] border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2 mb-4 group">
              <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center neon-glow transition-transform group-hover:scale-110">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold font-display text-white">
                Zeeonix<span className="gradient-text">.</span>
              </span>
            </Link>
            <p className="text-sm text-zinc-400 leading-relaxed mb-4">
              Premium digital agency crafting websites, apps, SaaS, and UGC ads that convert. Based in Faridabad, Haryana, India.
            </p>
            <div className="space-y-2 mb-6">
              <a
                href="mailto:zeenexdigi@protonmail.com"
                className="text-sm text-zinc-400 hover:text-brand-400 transition-colors block"
              >
                zeenexdigi@protonmail.com
              </a>
              <a
                href="tel:+919205568663"
                className="text-sm text-zinc-400 hover:text-brand-400 transition-colors block"
              >
                +91 9205568663
              </a>
              <p className="text-sm text-zinc-500">Faridabad, Haryana, India</p>
            </div>
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="h-9 w-9 rounded-lg bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-brand-500/20 transition-all duration-300"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-zinc-400 hover:text-brand-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-2.5">
              {footerServices.map((s) => (
                <li key={s.label}>
                  <Link
                    to={s.href}
                    className="text-sm text-zinc-400 hover:text-brand-400 transition-colors"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Get Free Insights
            </h4>
            <p className="text-sm text-zinc-400 mb-4">
              Weekly tips on digital growth, SEO, and conversion — straight to your inbox.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="your@email.com"
                disabled={newsletterStatus === "loading" || newsletterStatus === "success"}
                className="flex-1 rounded-lg bg-white/5 border border-white/10 px-3 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-brand-500/50 transition-all disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={newsletterStatus === "loading" || newsletterStatus === "success"}
                className="rounded-lg bg-gradient-to-r from-brand-500 to-brand-700 px-4 py-2.5 text-sm font-semibold text-white hover:from-brand-400 hover:to-brand-600 transition-all disabled:opacity-60 whitespace-nowrap"
              >
                {newsletterStatus === "loading" ? (
                  <span className="flex items-center gap-1">
                    <span className="h-3 w-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Joining...
                  </span>
                ) : newsletterStatus === "success" ? (
                  "✓ Joined"
                ) : (
                  "Join"
                )}
              </button>
            </form>
            {newsletterMessage && (
              <p className={`text-xs mt-2 flex items-center gap-1 ${
                newsletterStatus === "success" ? "text-emerald-400" : "text-red-400"
              }`}>
                {newsletterStatus === "success" ? (
                  <svg className="h-3 w-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                ) : (
                  <svg className="h-3 w-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                  </svg>
                )}
                {newsletterMessage}
              </p>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-zinc-500">
            © {new Date().getFullYear()} Zeeonix Digital. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-zinc-500">
            <a href="#" className="hover:text-zinc-300 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-zinc-300 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
