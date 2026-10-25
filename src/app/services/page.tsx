import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { SERVICE_GROUPS } from '@/lib/services-data';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Explore all digital services offered by Zeeonix Digital -- from marketing and web development to AI automation and content creation.',
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        {/* Hero */}
        <section className="section-pad bg-brand-dark text-center">
          <div className="container-main max-w-3xl mx-auto">
            <h1 className="section-title mb-4">Our Services</h1>
            <p className="section-subtitle mx-auto">
              Ten specialised service areas designed to cover every stage of your digital growth journey.
            </p>
          </div>
        </section>

        {/* Service groups */}
        <section className="section-pad bg-brand-navy">
          <div className="container-main">
            <div className="space-y-16">
              {SERVICE_GROUPS.map(group => (
                <div key={group.id}>
                  <div className="flex items-start justify-between mb-6 gap-4">
                    <div>
                      <h2 className="font-display text-2xl font-bold text-brand-white mb-1">{group.title}</h2>
                      <p className="text-brand-muted text-sm">{group.tagline}</p>
                    </div>
                    <Link href={`/services/${group.id}`} className="btn-secondary text-sm shrink-0">
                      View all <ArrowRight size={14} />
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {group.services.map(svc => (
                      <div key={svc.id} className="card">
                        <h3 className="font-semibold text-brand-white text-sm mb-1.5">{svc.name}</h3>
                        <p className="text-brand-muted text-xs leading-relaxed mb-3">{svc.description}</p>
                        <ul className="space-y-1">
                          {svc.features.slice(0, 3).map(f => (
                            <li key={f} className="text-xs text-brand-muted flex items-center gap-1.5">
                              <span className="w-1 h-1 rounded-full bg-brand-blue shrink-0" />
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-brand-dark text-center">
          <div className="container-main max-w-xl mx-auto">
            <h2 className="font-display text-3xl font-bold text-brand-white mb-4">Ready to Get Started?</h2>
            <p className="text-brand-muted mb-8">Tell us what you need and we will send a free custom proposal within 24 hours.</p>
            <Link href="/contact#quote" className="btn-primary text-base px-8">
              Request a Free Quote <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
