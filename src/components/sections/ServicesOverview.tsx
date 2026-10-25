import Link from 'next/link';
import { ArrowRight, TrendingUp, Globe, Palette, Video, Bot, PenTool, ShoppingCart, UserCheck, Code2, Rocket } from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  TrendingUp, Globe, Palette, Video, Bot, PenTool, ShoppingCart, UserCheck, Code2, Rocket,
};

const SERVICES = [
  { id: 'digital-marketing', title: 'Digital Marketing', desc: 'SEO, social media, paid ads, email marketing -- full-funnel growth.', icon: 'TrendingUp', color: 'text-cyan-400', bg: 'bg-cyan-400/10 border-cyan-400/20' },
  { id: 'website-development', title: 'Website Development', desc: 'Fast, secure, mobile-first websites that represent your brand.', icon: 'Globe', color: 'text-violet-400', bg: 'bg-violet-400/10 border-violet-400/20' },
  { id: 'graphic-design', title: 'Graphic Design', desc: 'Logos, creatives, and visual identity that make you memorable.', icon: 'Palette', color: 'text-pink-400', bg: 'bg-pink-400/10 border-pink-400/20' },
  { id: 'video-editing', title: 'Video Editing', desc: 'Reels, YouTube, promos -- professional editing across every format.', icon: 'Video', color: 'text-orange-400', bg: 'bg-orange-400/10 border-orange-400/20' },
  { id: 'ai-services', title: 'AI Services', desc: 'Chatbots, lead qualification, sales assistants, and workflow automation.', icon: 'Bot', color: 'text-emerald-400', bg: 'bg-emerald-400/10 border-emerald-400/20' },
  { id: 'content-writing', title: 'Content Writing', desc: 'Website copy, blogs, product descriptions, and social captions.', icon: 'PenTool', color: 'text-blue-400', bg: 'bg-blue-400/10 border-blue-400/20' },
  { id: 'ecommerce', title: 'E-commerce', desc: 'Store setup, product listing, optimisation, and e-commerce marketing.', icon: 'ShoppingCart', color: 'text-green-400', bg: 'bg-green-400/10 border-green-400/20' },
  { id: 'virtual-assistant', title: 'Virtual Assistant', desc: 'Data entry, email management, research, and admin support.', icon: 'UserCheck', color: 'text-purple-400', bg: 'bg-purple-400/10 border-purple-400/20' },
  { id: 'app-development', title: 'App Development', desc: 'Web apps, dashboards, internal tools, and API integrations.', icon: 'Code2', color: 'text-red-400', bg: 'bg-red-400/10 border-red-400/20' },
  { id: 'online-business-setup', title: 'Online Business Setup', desc: 'Get your entire online presence launched and running quickly.', icon: 'Rocket', color: 'text-sky-400', bg: 'bg-sky-400/10 border-sky-400/20' },
];

export default function ServicesOverview() {
  return (
    <section id="services" className="section-pad bg-brand-dark">
      <div className="container-main">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="divider mx-auto mb-4" />
          <h2 className="section-title mb-4">Everything Your Business Needs</h2>
          <p className="section-subtitle mx-auto text-center">
            One agency, ten specialised service areas -- so you can scale without juggling multiple vendors.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {SERVICES.map(s => {
            const Icon = ICON_MAP[s.icon] || Bot;
            return (
              <Link
                key={s.id}
                href={`/services/${s.id}`}
                className={`group card hover:scale-[1.02] transition-all duration-200 border ${s.bg}`}
              >
                <div className={`w-10 h-10 rounded-lg ${s.bg} border flex items-center justify-center mb-3`}>
                  <Icon size={18} className={s.color} />
                </div>
                <h3 className="font-semibold text-brand-white text-sm mb-1.5">{s.title}</h3>
                <p className="text-brand-muted text-xs leading-relaxed line-clamp-2">{s.desc}</p>
                <div className={`mt-3 text-xs font-medium flex items-center gap-1 ${s.color} opacity-0 group-hover:opacity-100 transition-opacity`}>
                  Learn more <ArrowRight size={12} />
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link href="/services" className="btn-secondary">
            View All Services <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
