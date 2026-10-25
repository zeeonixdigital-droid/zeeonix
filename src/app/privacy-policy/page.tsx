import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Zeeonix Digital collects, uses, and protects your personal information.',
};

export default function PrivacyPage() {
  const updated = 'October 2025';
  return (
    <>
      <Navbar />
      <main className="pt-24">
        <section className="section-pad bg-brand-navy">
          <div className="container-main max-w-3xl mx-auto prose prose-sm prose-invert">
            <h1 className="font-display text-3xl font-bold text-brand-white mb-2">Privacy Policy</h1>
            <p className="text-brand-muted text-sm mb-10">Last updated: {updated}</p>

            {[
              { title: '1. Who We Are', body: 'Zeeonix Digital is a digital agency offering marketing, web development, design, AI, and related services. Our website is www.zeeonix.com. [Add your full legal business name and address here when available].' },
              { title: '2. What Information We Collect', body: 'When you submit an enquiry, we collect: your name, email address, phone number, country, business name (if provided), the services you are interested in, your project description, budget, deadline, and preferred contact method. We do not collect payment card details through our website forms.' },
              { title: '3. Why We Collect It', body: 'We use your information to respond to your enquiry, prepare a proposal, and communicate about your project. We do not use it for unrelated marketing without your explicit consent.' },
              { title: '4. How We Store It', body: 'Enquiry data is stored securely in our database, which is hosted on a reputable cloud provider with industry-standard security measures. Access is restricted to authorised Zeeonix Digital team members only.' },
              { title: '5. How Long We Keep It', body: 'We retain enquiry data for 24 months or until you request deletion, whichever comes first. If you become a client, we retain project records for the duration required by applicable law.' },
              { title: '6. Sharing Your Data', body: 'We do not sell, rent, or share your personal information with third parties for marketing purposes. We may share information with service providers (such as email delivery services) who help us operate our business, under strict confidentiality agreements.' },
              { title: '7. Your Rights', body: 'You have the right to access the information we hold about you, request correction of inaccurate data, request deletion of your data, withdraw consent at any time, and lodge a complaint with your local data protection authority. To exercise these rights, contact us at [your-email@zeeonix.com].' },
              { title: '8. Cookies', body: 'Our website may use essential cookies to function correctly. We do not currently use tracking or advertising cookies. We will update this policy before enabling any analytics.' },
              { title: '9. Third-Party Links', body: 'Our website may contain links to third-party websites. We are not responsible for their privacy practices. We encourage you to read their privacy policies.' },
              { title: '10. Changes to This Policy', body: 'We may update this policy. Changes are effective when posted on this page. For material changes, we will make reasonable efforts to notify you.' },
              { title: '11. Contact Us', body: 'For privacy-related questions, contact us at: [your-email@zeeonix.com]. [Add postal address when available].' },
            ].map(({ title, body }) => (
              <div key={title} className="mb-6">
                <h2 className="font-display text-lg font-semibold text-brand-white mb-2">{title}</h2>
                <p className="text-brand-muted text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
