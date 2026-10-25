'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const FAQS = [
  { q: 'What services does Zeeonix Digital offer?', a: 'We offer ten service areas: digital marketing, website development, graphic design, video editing, AI services, content writing, e-commerce, virtual assistant services, app development, and complete online business setup. Most clients combine two or more services for best results.' },
  { q: 'How do I get started?', a: 'Fill in the free enquiry form on this page, or chat with our AI assistant. We will review your requirements and send a custom proposal within 24 hours.' },
  { q: 'Do you work with businesses outside India?', a: 'Yes. We work with clients across India, the UK, USA, UAE, Canada, Australia, and other countries. We communicate in Hindi and English.' },
  { q: 'How long does a typical project take?', a: 'Timelines vary by project scope. A landing page can be delivered in 3-5 days. A full website takes 2-4 weeks. Ongoing services like SEO or social media run on monthly retainers. We always confirm the timeline before starting.' },
  { q: 'What are your payment terms?', a: 'We typically require 50% upfront and the remainder on delivery for one-time projects. Monthly retainers are billed at the start of each month. Specific terms are included in every proposal.' },
  { q: 'Can I request changes after delivery?', a: 'Yes. Every project includes a defined number of revision rounds. Larger changes that fall outside the agreed scope are quoted separately. We document everything clearly upfront.' },
  { q: 'Is my data safe with Zeeonix Digital?', a: 'We take data security seriously. All enquiry data is stored securely, and we never share your information with third parties without consent. See our Privacy Policy for full details.' },
  { q: 'What AI tools do you use?', a: 'We use industry-standard AI APIs and frameworks. The specific tools depend on your project requirements. All AI outputs are reviewed by our team before delivery. We never fabricate results or make claims we cannot verify.' },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn('border rounded-lg transition-colors duration-200', open ? 'border-brand-blue/50 bg-brand-card' : 'border-brand-border bg-brand-card/50')}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left gap-4"
        aria-expanded={open}
      >
        <span className="font-medium text-brand-white text-sm">{q}</span>
        <ChevronDown size={16} className={cn('text-brand-muted shrink-0 transition-transform duration-200', open && 'rotate-180')} />
      </button>
      {open && (
        <div className="px-5 pb-4">
          <p className="text-brand-muted text-sm leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQSection() {
  return (
    <section id="faq" className="section-pad bg-brand-dark">
      <div className="container-main max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="divider mx-auto mb-4" />
          <h2 className="section-title mb-4">Frequently Asked Questions</h2>
          <p className="section-subtitle mx-auto text-center">
            Common questions from businesses we work with.
          </p>
        </div>
        <div className="space-y-3">
          {FAQS.map(item => <FAQItem key={item.q} {...item} />)}
        </div>
      </div>
    </section>
  );
}
