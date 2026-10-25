import Link from 'next/link';
import { Zap, Mail, Phone, MapPin } from 'lucide-react';

const SERVICES_LINKS = [
  { href: '/services/digital-marketing', label: 'Digital Marketing' },
  { href: '/services/website-development', label: 'Website Development' },
  { href: '/services/graphic-design', label: 'Graphic Design' },
  { href: '/services/ai-services', label: 'AI Services' },
  { href: '/services/content-writing', label: 'Content Writing' },
  { href: '/services/video-editing', label: 'Video Editing' },
];

const COMPANY_LINKS = [
  { href: '/about', label: 'About Us' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

const LEGAL_LINKS = [
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms & Conditions' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark border-t border-brand-border">
      <div className="container-main py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-blue to-brand-violet flex items-center justify-center">
                <Zap size={16} className="text-white" strokeWidth={2.5} />
              </div>
              <span className="font-display font-bold text-lg text-brand-white">
                Zeeonix<span className="text-brand-accent">.</span>
              </span>
            </Link>
            <p className="text-brand-muted text-sm leading-relaxed mb-5">
              AI-powered digital agency helping businesses grow online with smart technology and proven strategies.
            </p>
            {/* Contact placeholders */}
            <ul className="space-y-2 text-sm text-brand-muted">
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-brand-blue shrink-0" />
                <span>[your-email@zeeonix.com]</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-brand-blue shrink-0" />
                <span>[+91 XXXXX XXXXX]</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={14} className="text-brand-blue shrink-0" />
                <span>[City, State, India]</span>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-brand-white font-semibold text-sm mb-4">Services</h4>
            <ul className="space-y-2.5">
              {SERVICES_LINKS.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-brand-muted hover:text-brand-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-brand-white font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-2.5">
              {COMPANY_LINKS.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-brand-muted hover:text-brand-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter placeholder */}
          <div>
            <h4 className="text-brand-white font-semibold text-sm mb-4">Stay Updated</h4>
            <p className="text-brand-muted text-sm mb-4">
              Get tips on digital growth delivered to your inbox.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="input-field text-sm py-2 flex-1"
                aria-label="Email for newsletter"
              />
              <button className="btn-primary text-sm py-2 px-4 shrink-0">
                Join
              </button>
            </div>
            <p className="text-xs text-brand-muted mt-2">Newsletter integration coming soon.</p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-brand-muted">
            © {year} Zeeonix Digital. All rights reserved.
          </p>
          <ul className="flex gap-4">
            {LEGAL_LINKS.map(l => (
              <li key={l.href}>
                <Link href={l.href} className="text-xs text-brand-muted hover:text-brand-white transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
