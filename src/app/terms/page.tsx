import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Terms and conditions governing the use of Zeeonix Digital services.',
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        <section className="section-pad bg-brand-navy">
          <div className="container-main max-w-3xl mx-auto">
            <h1 className="font-display text-3xl font-bold text-brand-white mb-2">Terms & Conditions</h1>
            <p className="text-brand-muted text-sm mb-10">Last updated: October 2025</p>

            <div className="space-y-6 text-brand-muted text-sm leading-relaxed">
              <p className="text-brand-light">Please read these terms carefully before using our services or website. By engaging Zeeonix Digital, you agree to these terms.</p>

              {[
                { title: '1. Services', body: 'Zeeonix Digital provides digital marketing, web development, design, AI automation, content writing, and related services. The exact scope, deliverables, timelines, and price for each project are defined in a written proposal or service agreement.' },
                { title: '2. Proposals and Agreements', body: 'A service engagement begins when you accept a written proposal or sign a service agreement. We do not begin work until the agreed deposit is received. Verbal agreements or informal conversations do not constitute a binding contract.' },
                { title: '3. Payments', body: 'Payment terms are specified in your proposal. Typical terms are 50% upfront, 50% on delivery. We reserve the right to pause work on overdue accounts. All prices are in Indian Rupees (INR) unless otherwise specified.' },
                { title: '4. Revisions', body: 'Each project includes a defined number of revision rounds as specified in the proposal. Additional revisions beyond this scope are charged at our standard hourly rate.' },
                { title: '5. Intellectual Property', body: 'Upon receipt of full payment, you own the final deliverables created specifically for you. We retain the right to use the work in our portfolio unless you request otherwise in writing. Third-party assets (stock photos, fonts, plugins) remain subject to their own licences.' },
                { title: '6. Client Responsibilities', body: 'You are responsible for providing accurate information, timely feedback at agreed checkpoints, and necessary content or assets. Delays caused by late client responses may affect the agreed timeline without penalty to Zeeonix Digital.' },
                { title: '7. Confidentiality', body: 'We treat all client information as confidential and do not share it with third parties without your consent, except as required to deliver your project or by law.' },
                { title: '8. Limitation of Liability', body: 'Zeeonix Digital is not liable for indirect, consequential, or incidental damages arising from your use of our services. Our total liability is limited to the amount paid for the specific service that caused the issue.' },
                { title: '9. Results Disclaimer', body: 'Digital marketing and SEO results vary depending on many factors outside our control, including search engine algorithm changes, market conditions, and competition. We do not guarantee specific rankings, traffic levels, or revenue outcomes.' },
                { title: '10. Termination', body: 'Either party may terminate a project by giving 14 days\' written notice. Work completed to the termination date will be invoiced. Deposits are non-refundable unless Zeeonix Digital is unable to deliver agreed services.' },
                { title: '11. Governing Law', body: 'These terms are governed by the laws of India. Any disputes will be subject to the jurisdiction of courts in [your city], India. [Update with your actual city].' },
                { title: '12. Updates', body: 'We may update these terms. Continued use of our services after changes constitutes acceptance of the revised terms.' },
                { title: '13. Contact', body: 'For any questions about these terms, contact us at: [your-email@zeeonix.com].' },
              ].map(({ title, body }) => (
                <div key={title}>
                  <h2 className="font-semibold text-brand-white mb-1">{title}</h2>
                  <p>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
