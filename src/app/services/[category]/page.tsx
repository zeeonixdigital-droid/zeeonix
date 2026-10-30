import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { SERVICE_GROUPS } from '@/lib/services-data';
import { ArrowRight, CheckCircle } from 'lucide-react';

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return SERVICE_GROUPS.map(g => ({ category: g.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const group = SERVICE_GROUPS.find(g => g.id === category);
  if (!group) return { title: 'Service Not Found' };
  return {
    title: group.title,
    description: group.tagline,
  };
}

export default async function ServiceCategoryPage({ params }: Props) {
  const { category } = await params;
  const group = SERVICE_GROUPS.find(g => g.id === category);
  if (!group) notFound();

  return (
    <>
      <Navbar />
      <main className="pt-24">
        {/* Hero */}
        <section className="section-pad bg-brand-dark">
          <div className="container-main max-w-4xl mx-auto">
            <Link href="/services" className="inline-flex items-center gap-1.5 text-sm text-brand-muted hover:text-brand-white mb-6 transition-colors">
              <ArrowRight size={14} className="rotate-180" /> All Services
            </Link>
            <div className="divider mb-4" />
            <h1 className="section-title mb-3">{group.title}</h1>
            <p className="section-subtitle">{group.tagline}</p>
          </div>
        </section>

        {/* Services grid */}
        <section className="section-pad bg-brand-navy">
          <div className="container-main">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {group.services.map(svc => (
                <div key={svc.id} className="card">
                  <h3 className="font-display font-bold text-brand-white text-lg mb-2">{svc.name}</h3>
                  <p className="text-brand-muted text-sm leading-relaxed mb-4">{svc.description}</p>
                  <div className="grid grid-cols-2 gap-y-2">
                    {svc.features.map(f => (
                      <div key={f} className="flex items-center gap-2 text-sm text-brand-light">
                        <CheckCircle size={13} className="text-brand-blue shrink-0" />
                        {f}
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
            <h2 className="font-display text-3xl font-bold text-brand-white mb-4">
              Interested in {group.title}?
            </h2>
            <p className="text-brand-muted mb-8 text-sm">
              Tell us what you need and we will send a custom proposal within 24 hours.
            </p>
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