import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FAQSection from '@/components/sections/FAQSection';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Answers to common questions about Zeeonix Digital services, pricing, timelines, and process.',
};

export default function FAQPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        <section className="py-16 bg-brand-dark text-center">
          <div className="container-main max-w-3xl mx-auto">
            <div className="divider mx-auto mb-4" />
            <h1 className="section-title mb-4">Frequently Asked Questions</h1>
            <p className="section-subtitle mx-auto">
              If you cannot find your answer here, contact us directly -- we are happy to help.
            </p>
          </div>
        </section>
        <FAQSection />
        <section className="py-16 bg-brand-navy text-center">
          <div className="container-main max-w-xl mx-auto">
            <h2 className="font-display text-2xl font-bold text-brand-white mb-3">Still Have Questions?</h2>
            <p className="text-brand-muted mb-6 text-sm">Send us your question and we will reply within 24 hours.</p>
            <Link href="/contact" className="btn-primary">
              Contact Us <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
