import Link from 'next/link';
import { ArrowRight, Sparkles, TrendingUp, Globe, Bot } from 'lucide-react';

const CAPABILITY_PILLS = [
  { icon: TrendingUp, label: 'Digital Marketing' },
  { icon: Globe, label: 'Web Development' },
  { icon: Bot, label: 'AI Automation' },
  { icon: Sparkles, label: 'Graphic Design' },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-navy">
      {/* Background grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(37,99,235,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Glow blobs */}
      <div aria-hidden className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />
      <div aria-hidden className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-brand-violet/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container-main relative z-10 pt-24 pb-16 text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-border bg-brand-card/60 backdrop-blur-sm mb-8">
          <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
          <span className="text-xs font-medium text-brand-light tracking-wide">
            AI-Powered Digital Agency -- Now Available
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-brand-white leading-[1.1] mb-6 text-balance mx-auto max-w-4xl">
          Grow Your Business{' '}
          <span className="gradient-text">Smarter</span> With AI-Driven Digital Solutions
        </h1>

        {/* Sub-headline */}
        <p className="text-brand-light text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
          From marketing campaigns and custom websites to AI chatbots and automation -- Zeeonix Digital delivers end-to-end digital growth for businesses of every size.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <Link href="/contact#quote" className="btn-primary text-base px-8 py-3.5 shadow-2xl shadow-blue-900/30">
            Get a Free Quote <ArrowRight size={18} />
          </Link>
          <Link href="/#services" className="btn-secondary text-base px-8 py-3.5">
            Explore Services
          </Link>
        </div>

        {/* Capability pills */}
        <div className="flex flex-wrap justify-center gap-3">
          {CAPABILITY_PILLS.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 px-4 py-2 rounded-full bg-brand-card border border-brand-border text-sm text-brand-light">
              <Icon size={14} className="text-brand-blue" />
              {label}
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 flex justify-center" aria-hidden>
          <div className="flex flex-col items-center gap-2 opacity-40">
            <div className="w-px h-12 bg-gradient-to-b from-transparent to-brand-border" />
            <span className="text-xs text-brand-muted tracking-widest">SCROLL</span>
          </div>
        </div>
      </div>
    </section>
  );
}
