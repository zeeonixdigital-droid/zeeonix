import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ArrowRight, Target, Eye, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Zeeonix Digital -- our mission, values, and the team behind the work.',
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        <section className="section-pad bg-brand-dark">
          <div className="container-main max-w-4xl mx-auto text-center">
            <div className="divider mx-auto mb-4" />
            <h1 className="section-title mb-6">About Zeeonix Digital</h1>
            <p className="section-subtitle mx-auto">
              We are a digital agency that combines creativity, technology, and AI to help businesses build a powerful online presence and grow sustainably.
            </p>
          </div>
        </section>

        <section className="section-pad bg-brand-navy">
          <div className="container-main max-w-3xl mx-auto">
            <h2 className="font-display text-2xl font-bold text-brand-white mb-6">Our Story</h2>
            <div className="space-y-4 text-brand-muted leading-relaxed">
              <p>
                Zeeonix Digital was founded with a clear goal: to make high-quality digital services and AI automation accessible to businesses of all sizes -- not just large enterprises with big budgets.
              </p>
              <p>
                We noticed that many small and medium-sized businesses were either being overcharged by large agencies, receiving poor-quality generic work, or left to navigate the complexities of digital marketing alone. We set out to change that.
              </p>
              <p>
                Today, Zeeonix Digital offers ten specialised service areas, all delivered with transparent pricing, honest communication, and a genuine focus on measurable results.
              </p>
            </div>
            <div className="mt-10 p-6 rounded-xl border border-dashed border-brand-border bg-brand-card/30 text-center">
              <p className="text-brand-muted text-sm italic">
                [Founder / team profile section -- add your name, photo, and bio here]
              </p>
            </div>
          </div>
        </section>

        <section className="section-pad bg-brand-dark">
          <div className="container-main">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: Target, title: 'Our Mission', text: 'To help businesses grow online with smart digital strategies, honest advice, and technology that actually works.', color: 'text-blue-400' },
                { icon: Eye, title: 'Our Vision', text: 'To be the most trusted digital partner for ambitious businesses across India and beyond.', color: 'text-violet-400' },
                { icon: Heart, title: 'Our Values', text: 'Transparency, quality, accountability, and genuine care for every client success -- not just their project.', color: 'text-pink-400' },
              ].map(function(item) {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="card text-center">
                    <Icon size={28} className={item.color + ' mx-auto mb-4'} />
                    <h3 className="font-display font-bold text-brand-white text-xl mb-2">{item.title}</h3>
                    <p className="text-brand-muted text-sm leading-relaxed">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 bg-brand-navy text-center">
          <div className="container-main max-w-xl mx-auto">
            <h2 className="font-display text-3xl font-bold text-brand-white mb-4">Ready to Work Together?</h2>
            <p className="text-brand-muted mb-8">Start with a free, no-obligation quote.</p>
            <Link href="/contact#quote" className="btn-primary text-base px-8">
              Get a Free Quote <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
