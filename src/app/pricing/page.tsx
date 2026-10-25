import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ArrowRight, CheckCircle, MessageSquare } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Transparent pricing approach from Zeeonix Digital. No hidden fees. Custom quotes for every project.',
};

const STARTER_FEATURES = [
  'Single service focus',
  'Dedicated project manager',
  'Defined revision rounds',
  'Regular progress updates',
  'Source files on completion',
  'Post-delivery support (7 days)',
];

const GROWTH_FEATURES = [
  'Multiple services bundled',
  'Priority turnaround',
  'Monthly performance report',
  'Strategy consultation included',
  'Extended support (30 days)',
  'Discounted rates vs individual services',
];

const RETAINER_FEATURES = [
  'Ongoing monthly services',
  'Dedicated team allocation',
  'Weekly check-in calls',
  'Analytics and reporting',
  'Flexible scope adjustments',
  'Priority support channel',
];

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        <section className="section-pad bg-brand-dark text-center">
          <div className="container-main max-w-3xl mx-auto">
            <div className="divider mx-auto mb-4" />
            <h1 className="section-title mb-4">Transparent Pricing</h1>
            <p className="section-subtitle mx-auto">
              Every project is scoped individually. We believe in clear proposals with no surprises -- you always know what you are paying for before we start.
            </p>
          </div>
        </section>

        {/* Pricing approach cards */}
        <section className="section-pad bg-brand-navy">
          <div className="container-main max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
              {[
                {
                  name: 'Starter Project',
                  price: 'Custom',
                  desc: 'One-time projects with a clear scope and fixed deliverables.',
                  features: STARTER_FEATURES,
                  highlight: false,
                  cta: 'Get a Quote',
                },
                {
                  name: 'Growth Bundle',
                  price: 'Custom',
                  desc: 'Combine multiple services for better results and bundled pricing.',
                  features: GROWTH_FEATURES,
                  highlight: true,
                  cta: 'Get a Quote',
                },
                {
                  name: 'Monthly Retainer',
                  price: 'Custom',
                  desc: 'Ongoing partnership for sustained growth and continuous delivery.',
                  features: RETAINER_FEATURES,
                  highlight: false,
                  cta: 'Discuss Retainer',
                },
              ].map(plan => (
                <div
                  key={plan.name}
                  className={`rounded-xl p-6 border flex flex-col ${
                    plan.highlight
                      ? 'border-brand-blue bg-gradient-to-b from-brand-blue/10 to-brand-card shadow-lg shadow-blue-900/20'
                      : 'border-brand-border bg-brand-card'
                  }`}
                >
                  {plan.highlight && (
                    <div className="text-xs font-semibold text-brand-accent bg-brand-blue/20 border border-brand-blue/30 rounded-full px-3 py-1 w-fit mb-4">
                      Most Popular
                    </div>
                  )}
                  <h3 className="font-display font-bold text-brand-white text-xl mb-1">{plan.name}</h3>
                  <p className="text-brand-muted text-sm mb-4">{plan.desc}</p>
                  <div className="text-3xl font-display font-bold text-brand-white mb-6">
                    {plan.price}
                    <span className="text-sm font-normal text-brand-muted ml-2">-- quoted per project</span>
                  </div>
                  <ul className="space-y-2.5 mb-8 flex-1">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm text-brand-light">
                        <CheckCircle size={14} className="text-brand-blue shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact#quote"
                    className={plan.highlight ? 'btn-primary justify-center' : 'btn-secondary justify-center'}
                  >
                    {plan.cta} <ArrowRight size={15} />
                  </Link>
                </div>
              ))}
            </div>

            {/* Why custom pricing */}
            <div className="card text-center p-10">
              <MessageSquare size={32} className="text-brand-blue mx-auto mb-4" />
              <h2 className="font-display font-bold text-brand-white text-2xl mb-3">Why We Quote Custom Prices</h2>
              <p className="text-brand-muted text-sm leading-relaxed max-w-2xl mx-auto mb-6">
                Every business is different. A logo for a startup and a logo for an established brand require different levels of research and complexity. A 5-page website and a 50-page e-commerce store are not the same project. We price based on your actual requirements -- not a generic tier that may under-deliver or overcharge.
              </p>
              <p className="text-brand-muted text-sm mb-8">
                We will always give you a clear written quote before any work begins. No hidden fees. No vague scopes.
              </p>
              <Link href="/contact#quote" className="btn-primary">
                Request Your Free Quote <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
