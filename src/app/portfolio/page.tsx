import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ArrowRight, Globe, TrendingUp, Palette, Bot } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'See examples of work delivered by Zeeonix Digital across web development, marketing, design, and AI services.',
};

const CATEGORIES = ['All', 'Web Development', 'Digital Marketing', 'Graphic Design', 'AI Services'];

const PROJECTS = [
  {
    title: 'E-commerce Store Launch',
    category: 'Web Development',
    description: 'Full online store setup with product listings, payment integration, and mobile-optimised design.',
    icon: Globe,
    color: 'text-violet-400',
    bg: 'bg-violet-400/10',
    tags: ['Next.js', 'E-commerce', 'SEO'],
  },
  {
    title: 'Lead Generation Campaign',
    category: 'Digital Marketing',
    description: 'Multi-channel campaign combining Google Ads and Meta Ads to generate qualified leads for a service business.',
    icon: TrendingUp,
    color: 'text-cyan-400',
    bg: 'bg-cyan-400/10',
    tags: ['Google Ads', 'Meta Ads', 'Lead Gen'],
  },
  {
    title: 'Brand Identity System',
    category: 'Graphic Design',
    description: 'Complete brand identity including logo, colour palette, typography, and social media templates.',
    icon: Palette,
    color: 'text-pink-400',
    bg: 'bg-pink-400/10',
    tags: ['Branding', 'Logo', 'Social Media'],
  },
  {
    title: 'AI Sales Chatbot',
    category: 'AI Services',
    description: 'Custom AI chatbot trained on a client knowledge base, handling enquiries and qualifying leads 24/7.',
    icon: Bot,
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
    tags: ['AI Chatbot', 'Lead Qualification', 'Automation'],
  },
];

export default function PortfolioPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        <section className="section-pad bg-brand-dark text-center">
          <div className="container-main max-w-3xl mx-auto">
            <div className="divider mx-auto mb-4" />
            <h1 className="section-title mb-4">Our Work</h1>
            <p className="section-subtitle mx-auto">
              Example project types we deliver. Real client case studies will be added here as they are approved for publication.
            </p>
            <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs">
              These are illustrative project types. Actual client work shown only with permission.
            </div>
          </div>
        </section>

        <section className="section-pad bg-brand-navy">
          <div className="container-main">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PROJECTS.map(p => {
                const Icon = p.icon;
                return (
                  <div key={p.title} className="card group hover:border-brand-blue/40 transition-colors">
                    <div className={`w-12 h-12 rounded-xl ${p.bg} flex items-center justify-center mb-4`}>
                      <Icon size={22} className={p.color} />
                    </div>
                    <div className="badge mb-3">{p.category}</div>
                    <h3 className="font-display font-bold text-brand-white text-lg mb-2">{p.title}</h3>
                    <p className="text-brand-muted text-sm leading-relaxed mb-4">{p.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {p.tags.map(t => (
                        <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-brand-border text-brand-light">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 p-8 rounded-2xl border border-dashed border-brand-border text-center">
              <h3 className="font-display font-bold text-brand-white text-xl mb-3">Have a Project in Mind?</h3>
              <p className="text-brand-muted text-sm mb-6 max-w-md mx-auto">
                We would love to add your project to this page. Start with a free quote and let us show you what we can do.
              </p>
              <Link href="/contact#quote" className="btn-primary">
                Get a Free Quote <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
