import { Shield, Zap, Clock, HeartHandshake, LineChart, Globe } from 'lucide-react';

const REASONS = [
  { icon: Zap, title: 'AI-First Approach', desc: 'We build automation into every engagement -- so your business scales without proportionally scaling your costs.', color: 'text-cyan-400' },
  { icon: Clock, title: 'Fast Turnaround', desc: 'Streamlined processes and dedicated teams mean you receive quality work without unnecessary delays.', color: 'text-violet-400' },
  { icon: Shield, title: 'Transparent Pricing', desc: 'No hidden fees or surprise invoices. Every project starts with a clear, agreed scope and budget.', color: 'text-emerald-400' },
  { icon: HeartHandshake, title: 'Partnership, Not Vendor', desc: "We invest in understanding your business goals, not just completing tasks and moving on.", color: 'text-pink-400' },
  { icon: LineChart, title: 'Results You Can Measure', desc: 'Every campaign and project includes clear KPIs and regular reporting so you know exactly what you are getting.', color: 'text-orange-400' },
  { icon: Globe, title: 'Hindi & English Support', desc: 'We communicate in both Hindi and English, making it easy for businesses across India and globally.', color: 'text-blue-400' },
];

export default function WhyUs() {
  return (
    <section className="section-pad bg-brand-navy">
      <div className="container-main">
        <div className="text-center mb-14">
          <div className="divider mx-auto mb-4" />
          <h2 className="section-title mb-4">Why Businesses Choose Zeeonix</h2>
          <p className="section-subtitle mx-auto text-center">
            We combine deep digital expertise with AI technology to deliver outcomes, not just deliverables.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REASONS.map(r => {
            const Icon = r.icon;
            return (
              <div key={r.title} className="card group">
                <div className={`w-10 h-10 rounded-lg bg-brand-border flex items-center justify-center mb-4`}>
                  <Icon size={20} className={r.color} />
                </div>
                <h3 className="font-semibold text-brand-white mb-2">{r.title}</h3>
                <p className="text-brand-muted text-sm leading-relaxed">{r.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
