const STEPS = [
  { num: '01', title: 'Tell Us What You Need', desc: 'Fill in our free enquiry form or chat with our AI assistant. Describe your project, budget, and timeline -- no jargon required.' },
  { num: '02', title: 'Receive a Custom Proposal', desc: "We review your requirements and send a tailored proposal with clear scope, timeline, and transparent pricing -- usually within 24 hours." },
  { num: '03', title: 'We Build & Deliver', desc: 'Our team gets to work. You get regular updates at agreed checkpoints and can give feedback throughout the process.' },
  { num: '04', title: 'Launch & Grow', desc: 'We launch your project, hand over everything you need to manage it, and remain available for ongoing support and growth.' },
];

export default function HowItWorks() {
  return (
    <section className="section-pad bg-brand-dark">
      <div className="container-main">
        <div className="text-center mb-14">
          <div className="divider mx-auto mb-4" />
          <h2 className="section-title mb-4">How It Works</h2>
          <p className="section-subtitle mx-auto text-center">
            A straightforward process designed to get you results with minimum friction.
          </p>
        </div>

        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-brand-blue/30 via-brand-violet/30 to-brand-blue/30" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((step, i) => (
              <div key={step.num} className="relative text-center lg:text-left">
                {/* Step circle */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-card border border-brand-border mb-5 relative z-10">
                  <span className="font-mono text-sm font-bold text-brand-blue">{step.num}</span>
                </div>
                <h3 className="font-semibold text-brand-white mb-2">{step.title}</h3>
                <p className="text-brand-muted text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
