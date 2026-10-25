import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContactSection from '@/components/sections/ContactSection';
import { Mail, MessageSquare, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact & Free Quote',
  description: 'Get in touch with Zeeonix Digital. Request a free quote for any digital service -- we respond within 24 hours.',
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        {/* Header */}
        <section className="py-16 bg-brand-dark text-center">
          <div className="container-main max-w-3xl mx-auto">
            <div className="divider mx-auto mb-4" />
            <h1 className="section-title mb-4">Let's Talk</h1>
            <p className="section-subtitle mx-auto">
              Fill in the form below and we will get back to you with a tailored proposal within 24 hours. No spam, no commitment.
            </p>
          </div>
        </section>

        {/* Info cards */}
        <div className="bg-brand-navy py-10">
          <div className="container-main max-w-3xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-2">
              {[
                { icon: Mail, title: 'Email', info: '[your-email@zeeonix.com]', sub: 'Replace with your real email' },
                { icon: MessageSquare, title: 'WhatsApp', info: '[+91 XXXXX XXXXX]', sub: 'Add after WhatsApp Business setup' },
                { icon: Clock, title: 'Response Time', info: 'Within 24 hours', sub: 'Business days' },
              ].map(({ icon: Icon, title, info, sub }) => (
                <div key={title} className="card text-center p-5">
                  <Icon size={20} className="text-brand-blue mx-auto mb-2" />
                  <p className="font-semibold text-brand-white text-sm">{title}</p>
                  <p className="text-brand-muted text-xs mt-1">{info}</p>
                  <p className="text-xs text-brand-muted/60 mt-0.5 italic">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
