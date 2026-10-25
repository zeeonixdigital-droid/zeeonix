import { motion } from "framer-motion";
import { MessageCircle, Mic, Headphones, Bot, Search, MapPin, CheckCircle, ArrowRight, Lightbulb, Zap, Users, Clock, TrendingUp, Target } from "lucide-react";

// Complete SEO-optimized blog content for each service
const services = [
  // ==================== AEO ====================
  {
    id: "aeo-optimization",
    icon: Target,
    title: "AEO (Answer Engine Optimization)",
    subtitle: "Optimize for AI Search & Voice Assistants",
    gradient: "from-violet-500/20 to-purple-600/10",
    iconGradient: "from-violet-400 to-purple-500",
    accentColor: "violet",
    overview: {
      heading: "Get Featured in AI Search Results & Voice Answers",
      content: "Answer Engine Optimization (AEO) is the future of search. With AI-powered search engines like Google's SGE (Search Generative Experience), ChatGPT, Perplexity, and voice assistants like Alexa and Google Assistant, users now get direct answers instead of just links. Our AEO services optimize your content to be selected as the authoritative answer, putting your Faridabad business in front of customers at the exact moment they're asking questions about your products or services.",
    },
    features: [
      "Featured Snippet Optimization (Position 0)",
      "Question-Based Content Strategy (Who, What, When, Where, Why, How)",
      "Schema Markup & Structured Data Implementation",
      "Voice Search Optimization for Alexa & Google Assistant",
      "AI Search Engine Optimization (Google SGE, ChatGPT, Perplexity)",
      "Conversational Keyword Research",
      "Long-Form FAQ Content Creation",
      "Local Business Schema for Faridabad Businesses",
      "Knowledge Graph Optimization",
      "Natural Language Processing (NLP) Content Optimization",
    ],
    benefits: [
      { icon: Target, title: "Position 0 Rankings", desc: "Appear above traditional #1 search results" },
      { icon: Zap, title: "Voice Search Traffic", desc: "Capture Alexa & Google Assistant queries" },
      { icon: Users, title: "AI Search Visibility", desc: "Get featured in Google SGE & ChatGPT answers" },
      { icon: TrendingUp, title: "40% More CTR", desc: "Featured snippets get 8x more clicks" },
    ],
    useCases: [
      "Faridabad Clinics: Answer 'best doctor near me' queries",
      "Restaurants: Optimize for 'best restaurant in Faridabad' voice searches",
      "Real Estate: Target 'properties for sale in Faridabad' questions",
      "Educational Institutes: Answer course & admission queries",
      "Legal Services: Optimize for legal advice questions",
    ],
    seo: {
      keywords: ["AEO services Faridabad", "answer engine optimization", "featured snippet optimization", "voice search SEO", "Google SGE optimization", "AI search optimization", "schema markup services", "conversational SEO India"],
      metaDescription: "AEO services in Faridabad. Optimize for AI search, voice assistants & featured snippets. Get Position 0 rankings. Book consultation with Zeeonix Digital.",
    },
  },
  // ==================== SEO ====================
  {
    id: "seo-services",
    icon: Search,
    title: "SEO (Search Engine Optimization)",
    subtitle: "Rank #1 on Google & Drive Organic Traffic",
    gradient: "from-blue-500/20 to-indigo-600/10",
    iconGradient: "from-blue-400 to-indigo-500",
    accentColor: "blue",
    overview: {
      heading: "Dominate Google Search Results in Faridabad & Beyond",
      content: "Search Engine Optimization remains the most cost-effective way to attract qualified customers online. Our comprehensive SEO services help Faridabad businesses rank higher on Google, drive organic traffic, and convert visitors into paying customers. We combine technical expertise, content strategy, and data-driven link building to deliver sustainable, long-term results. Whether you're a local shop or a growing enterprise, our SEO strategies are tailored to your business goals and competitive landscape.",
    },
    features: [
      "Complete Technical SEO Audit & Fixes",
      "On-Page Optimization (Title tags, meta descriptions, headers)",
      "Off-Page SEO & High-Quality Link Building",
      "Local SEO for Google My Business optimization",
      "Content Strategy & SEO Copywriting",
      "Keyword Research & Competitor Analysis",
      "Page Speed Optimization (Core Web Vitals)",
      "Monthly SEO Reports & Analytics Dashboard",
      "E-commerce SEO (Product pages, category optimization)",
      "International SEO for Global Reach",
    ],
    benefits: [
      { icon: Target, title: "Top 3 Rankings", desc: "Target first page for competitive keywords" },
      { icon: TrendingUp, title: "200%+ Traffic Growth", desc: "Average organic traffic increase in 6 months" },
      { icon: Users, title: "Qualified Leads", desc: "Attract visitors actively searching for your services" },
      { icon: Zap, title: "Long-Term ROI", desc: "Sustainable results that compound over time" },
    ],
    useCases: [
      "Faridabad Manufacturers: Rank for industrial keywords",
      "Healthcare Providers: Dominate local medical searches",
      "Educational Institutes: Attract more student inquiries",
      "Retail Stores: Drive foot traffic through local SEO",
      "B2B Services: Generate qualified business leads",
    ],
    seo: {
      keywords: ["SEO services Faridabad", "search engine optimization India", "local SEO Faridabad", "technical SEO audit", "link building services", "SEO company Faridabad", "Google ranking services", "organic traffic growth"],
      metaDescription: "Professional SEO services in Faridabad. Rank #1 on Google with technical SEO, link building & content optimization. Drive organic traffic. Free consultation available.",
    },
  },
  // ==================== GEO ====================
  {
    id: "geo-optimization",
    icon: MapPin,
    title: "GEO (Generative Engine Optimization)",
    subtitle: "Optimize for AI-Powered Search Generations",
    gradient: "from-emerald-500/20 to-green-600/10",
    iconGradient: "from-emerald-400 to-green-500",
    accentColor: "emerald",
    overview: {
      heading: "Appear in AI-Generated Search Responses",
      content: "Generative Engine Optimization (GEO) is the cutting-edge evolution of SEO for the AI era. When users ask Google's SGE, ChatGPT, or other AI search engines questions, these systems generate comprehensive answers by synthesizing information from multiple sources. Our GEO services ensure your Faridabad business content is selected, cited, and featured in these AI-generated responses. We optimize for how AI models understand, process, and present information — putting your brand in front of customers at their most engaged moment.",
    },
    features: [
      "AI Search Engine Content Optimization",
      "Google SGE (Search Generative Experience) Optimization",
      "ChatGPT & LLM Content Training",
      "Perplexity AI Optimization",
      "Bing Chat & Copilot Optimization",
      "Authoritative Content Development for AI Citation",
      "Multi-Source Content Strategy",
      "Entity-Based Optimization",
      "AI-Readable Content Structure",
      "Citation & Reference Optimization",
    ],
    benefits: [
      { icon: Lightbulb, title: "AI Search Presence", desc: "Appear in Google SGE & AI-generated answers" },
      { icon: Target, title: "Brand Authority", desc: "Become the cited source for your industry" },
      { icon: Users, title: "High-Intent Traffic", desc: "Reach users ready to make decisions" },
      { icon: Zap, title: "First-Mover Advantage", desc: "Stay ahead as AI search grows" },
    ],
    useCases: [
      "Faridabad Hospitals: Get cited in medical condition answers",
      "Legal Firms: Appear in legal advice AI responses",
      "Financial Advisors: Feature in investment & tax AI answers",
      "Home Services: Get recommended in local service queries",
      "Educational Consultants: Appear in course selection AI responses",
    ],
    seo: {
      keywords: ["GEO optimization Faridabad", "generative engine optimization", "Google SGE optimization", "AI search optimization", "ChatGPT optimization", "LLM content optimization", "AI citation SEO", "generative search India"],
      metaDescription: "GEO services in Faridabad. Optimize for Google SGE, ChatGPT & AI search engines. Get featured in AI-generated answers. Zeeonix Digital - GEO experts.",
    },
  },
  // ==================== Entity SEO ====================
  {
    id: "entity-seo",
    icon: Users,
    title: "Entity SEO",
    subtitle: "Build Your Brand as a Recognized Entity",
    gradient: "from-fuchsia-500/20 to-pink-600/10",
    iconGradient: "from-fuchsia-400 to-pink-500",
    accentColor: "fuchsia",
    overview: {
      heading: "Establish Your Business in Google's Knowledge Graph",
      content: "Entity SEO focuses on optimizing your business as a distinct 'entity' in search engines' knowledge graphs. Google doesn't just match keywords anymore — it understands entities (people, businesses, places, things) and their relationships. Our Entity SEO services help Faridabad businesses build strong entity profiles, get featured in Knowledge Panels, and establish authority in their industry. This approach future-proofs your SEO against algorithm updates and builds lasting brand visibility.",
    },
    features: [
      "Google Knowledge Panel Optimization",
      "Wikidata & Wikipedia Entity Creation",
      "Schema.org Entity Markup Implementation",
      "Brand Entity Building Across Platforms",
      "Entity Relationship Mapping",
      "Author & Person Schema for Leadership",
      "Local Business Entity Optimization",
      "Industry Association & Citation Building",
      "Entity-Based Content Strategy",
      "Cross-Platform Entity Consistency Audit",
    ],
    benefits: [
      { icon: Users, title: "Knowledge Panel", desc: "Get your own Google Knowledge Panel" },
      { icon: Target, title: "Brand Authority", desc: "Recognized as industry authority by Google" },
      { icon: Zap, title: "Algorithm-Proof", desc: "Entity SEO survives algorithm updates" },
      { icon: TrendingUp, title: "Trust Signals", desc: "Build credibility with search engines & users" },
    ],
    useCases: [
      "Faridabad Business Owners: Build personal brand entities",
      "Medical Practitioners: Get doctor Knowledge Panels",
      "Real Estate Developers: Establish company entity presence",
      "Educational Institutions: Build institution entity profiles",
      "Manufacturing Companies: Create industry authority entities",
    ],
    seo: {
      keywords: ["entity SEO Faridabad", "Google Knowledge Panel", "brand entity optimization", "Wikidata creation", "schema markup services", "entity-based SEO", "knowledge graph optimization", "brand authority SEO India"],
      metaDescription: "Entity SEO services in Faridabad. Build Google Knowledge Panel, optimize brand entity, establish authority. Zeeonix Digital - Entity SEO specialists.",
    },
  },
  // ==================== Reputation SEO ====================
  {
    id: "reputation-seo",
    icon: MessageCircle,
    title: "Reputation & Conversation SEO",
    subtitle: "Control Your Brand Narrative Online",
    gradient: "from-orange-500/20 to-amber-600/10",
    iconGradient: "from-orange-400 to-amber-500",
    accentColor: "orange",
    overview: {
      heading: "Manage & Protect Your Online Reputation in Faridabad",
      content: "Your online reputation directly impacts customer trust and business growth. Our Reputation & Conversation SEO services help Faridabad businesses manage reviews, respond to customer conversations, suppress negative content, and amplify positive brand mentions. We monitor what people are saying about your business across Google, social media, review platforms, and forums — then strategically optimize your online presence to ensure potential customers see the best version of your brand first.",
    },
    features: [
      "Google Reviews Management & Optimization",
      "Review Response Strategy & Templates",
      "Negative Content Suppression",
      "Positive Content Amplification",
      "Social Media Reputation Monitoring",
      "Brand Mention Tracking & Alerts",
      "Crisis Management & Response",
      "Local Citation & Directory Management",
      "Customer Conversation Engagement",
      "Reputation Recovery Services",
    ],
    benefits: [
      { icon: Users, title: "5-Star Reputation", desc: "Build & maintain excellent review ratings" },
      { icon: Target, title: "First Page Control", desc: "Push negative content off page 1" },
      { icon: Zap, title: "Trust Building", desc: "Convert more customers with positive reviews" },
      { icon: TrendingUp, title: "Crisis Prevention", desc: "Catch & address issues before they escalate" },
    ],
    useCases: [
      "Faridabad Hospitals: Manage patient reviews & testimonials",
      "Restaurants: Respond to dining reviews on Google & Zomato",
      "Real Estate Agents: Build agent reputation with client reviews",
      "Service Businesses: Counter negative reviews professionally",
      "Educational Institutes: Manage student & parent feedback",
    ],
    seo: {
      keywords: ["reputation management Faridabad", "online reputation SEO", "review management services", "negative content removal", "brand reputation SEO", "Google reviews optimization", "reputation recovery India", "online reputation management company Faridabad"],
      metaDescription: "Reputation management services in Faridabad. Manage reviews, suppress negative content, build 5-star reputation. Zeeonix Digital - ORM experts.",
    },
  },
  {
    id: "ai-chatbot",
    icon: MessageCircle,
    title: "AI Chatbot Development",
    subtitle: "24/7 Intelligent Customer Support That Never Sleeps",
    gradient: "from-blue-500/20 to-cyan-600/10",
    iconGradient: "from-blue-400 to-cyan-500",
    accentColor: "blue",
    overview: {
      heading: "Transform Customer Support with AI-Powered Chatbots",
      content: "In today's fast-paced digital world, customers expect instant responses 24/7. Our AI Chatbot Development service delivers intelligent conversational agents that handle customer inquiries, resolve issues, and drive engagement around the clock. Built on cutting-edge natural language processing (NLP) and machine learning technologies, our chatbots understand context, learn from interactions, and provide human-like responses that delight your customers.",
    },
    features: [
      "Natural Language Processing (NLP) for human-like conversations",
      "Multi-platform integration (Website, WhatsApp, Facebook, Instagram)",
      "Custom training on your business data and FAQs",
      "Seamless handoff to human agents when needed",
      "Real-time analytics and conversation insights",
      "Multi-language support for global audiences",
      "Appointment booking and scheduling automation",
      "E-commerce product recommendations",
    ],
    benefits: [
      { icon: Clock, title: "24/7 Availability", desc: "Never miss a customer query, even during holidays" },
      { icon: Users, title: "Handle Unlimited Conversations", desc: "Scale support without hiring more staff" },
      { icon: Zap, title: "Instant Responses", desc: "0-second wait time for customer queries" },
      { icon: CheckCircle, title: "70% Cost Reduction", desc: "Automate 70% of routine support tickets" },
    ],
    useCases: [
      "E-commerce stores: Product recommendations, order tracking, returns",
      "Healthcare: Appointment scheduling, symptom checking, FAQs",
      "Real Estate: Property inquiries, virtual tours, lead qualification",
      "Education: Course information, enrollment assistance, student support",
      "Finance: Account queries, transaction history, loan applications",
    ],
    seo: {
      keywords: ["AI chatbot development", "customer support chatbot", "business chatbot India", "WhatsApp chatbot", "intelligent chatbot", "conversational AI", "chatbot for website", "AI customer service"],
      metaDescription: "Build intelligent AI chatbots for 24/7 customer support. Reduce costs by 70%, handle unlimited conversations, and boost customer satisfaction. Get a custom chatbot for your business in Faridabad, India.",
    },
  },
  {
    id: "ai-voice-assistant",
    icon: Mic,
    title: "AI Voice Assistance",
    subtitle: "Hands-Free Control Powered by Advanced Voice AI",
    gradient: "from-violet-500/20 to-purple-600/10",
    iconGradient: "from-violet-400 to-purple-500",
    accentColor: "violet",
    overview: {
      heading: "Enable Voice-First Experiences for Your Business",
      content: "Voice technology is revolutionizing how users interact with devices and applications. Our AI Voice Assistance service creates custom voice assistants that integrate seamlessly with your apps, websites, smart devices, and IoT ecosystems. Using state-of-the-art speech recognition and synthesis, our voice assistants understand natural commands and respond with clarity, enabling truly hands-free operation for your users.",
    },
    features: [
      "Advanced speech recognition (95%+ accuracy)",
      "Natural voice synthesis with multiple voice options",
      "Custom wake words and voice commands",
      "Integration with Alexa, Google Assistant, Siri Shortcuts",
      "Noise cancellation for clear audio in any environment",
      "Context-aware conversations",
      "Multi-language and accent support",
      "Voice biometrics for secure authentication",
    ],
    benefits: [
      { icon: Zap, title: "Enhanced UX", desc: "Provide intuitive hands-free interaction" },
      { icon: Users, title: "Accessibility", desc: "Make your product usable for everyone" },
      { icon: Lightbulb, title: "Competitive Edge", desc: "Stand out with voice-first innovation" },
      { icon: CheckCircle, title: "Future-Ready", desc: "Prepare for the voice-first future" },
    ],
    useCases: [
      "Smart Home: Control lights, temperature, security with voice",
      "Automotive: In-car voice commands for navigation, music, calls",
      "Healthcare: Voice-activated patient records, hands-free documentation",
      "Retail: Voice shopping, product search, inventory checks",
      "Enterprise: Voice-activated workflows, hands-free data entry",
    ],
    seo: {
      keywords: ["AI voice assistant", "voice assistant development", "custom voice AI", "speech recognition India", "voice integration", "smart voice assistant", "voice command system", "conversational voice AI"],
      metaDescription: "Build custom AI voice assistants for your business. Advanced speech recognition, natural voice synthesis, seamless integration. Voice AI solutions in Faridabad, India.",
    },
  },
  {
    id: "ai-voice-receptionist",
    icon: Headphones,
    title: "AI Voice Receptionist",
    subtitle: "Professional Phone Answering Service That Never Misses a Call",
    gradient: "from-fuchsia-500/20 to-pink-600/10",
    iconGradient: "from-fuchsia-400 to-pink-500",
    accentColor: "fuchsia",
    overview: {
      heading: "Never Miss a Business Call Again",
      content: "Every missed call is a lost opportunity. Our AI Voice Receptionist service provides professional, intelligent phone answering 24/7/365. Unlike traditional voicemail, our AI receptionist engages callers in natural conversations, answers questions, books appointments, takes messages, and routes calls to the right department. It's like having a dedicated receptionist working around the clock at a fraction of the cost.",
    },
    features: [
      "Natural conversation flow (sounds human)",
      "Custom greeting and branding",
      "Intelligent call routing based on caller needs",
      "Appointment scheduling and calendar integration",
      "Message taking with transcription",
      "FAQ answering from your knowledge base",
      "Multi-language support",
      "Call analytics and insights dashboard",
      "Integration with CRM, Google Calendar, Slack",
    ],
    benefits: [
      { icon: Clock, title: "24/7 Call Answering", desc: "Answer calls even after business hours" },
      { icon: Users, title: "Unlimited Concurrent Calls", desc: "Never put callers on hold" },
      { icon: CheckCircle, title: "99% Call Answer Rate", desc: "Virtually eliminate missed calls" },
      { icon: Zap, title: "80% Cost Savings", desc: "Fraction of hiring a full-time receptionist" },
    ],
    useCases: [
      "Medical Practices: Patient calls, appointment booking, prescription refills",
      "Law Firms: Client intake, consultation scheduling, emergency routing",
      "Service Businesses: HVAC, plumbing, electrical - emergency dispatch",
      "Real Estate: Property inquiries, showing appointments, lead qualification",
      "Restaurants: Reservations, takeout orders, hours and location info",
    ],
    seo: {
      keywords: ["AI voice receptionist", "virtual receptionist", "AI phone answering", "24/7 call answering service", "business phone receptionist", "AI telephone operator", "automated receptionist India", "smart call answering"],
      metaDescription: "AI Voice Receptionist for 24/7 professional call answering. Never miss a business call. Appointment booking, call routing, message taking. Faridabad, India.",
    },
  },
  {
    id: "custom-ai-agents",
    icon: Bot,
    title: "Custom AI Agents",
    subtitle: "Bespoke AI Solutions Tailored to Your Business Needs",
    gradient: "from-emerald-500/20 to-green-600/10",
    iconGradient: "from-emerald-400 to-green-500",
    accentColor: "emerald",
    overview: {
      heading: "Build AI Agents That Work Your Way",
      content: "Every business has unique challenges that off-the-shelf AI solutions can't address. Our Custom AI Agents service creates purpose-built AI solutions designed specifically for your workflows, data, and business objectives. From automating complex decision-making to processing unstructured data, our AI agents become intelligent team members that work tirelessly to drive efficiency and innovation.",
    },
    features: [
      "Custom AI model training on your proprietary data",
      "Integration with existing systems and APIs",
      "Autonomous task execution and workflow automation",
      "Advanced reasoning and decision-making capabilities",
      "Real-time data processing and analysis",
      "Continuous learning and improvement",
      "Explainable AI with transparent decision logs",
      "Enterprise-grade security and compliance",
    ],
    benefits: [
      { icon: Lightbulb, title: "Tailored Solution", desc: "Built specifically for your use case" },
      { icon: Zap, title: "10x Productivity", desc: "Automate complex, time-consuming tasks" },
      { icon: CheckCircle, title: "Competitive Advantage", desc: "AI capabilities competitors don't have" },
      { icon: Users, title: "Scalable Intelligence", desc: "Grow AI capabilities with your business" },
    ],
    useCases: [
      "Data Analysis: Automated report generation, trend detection, anomaly identification",
      "Content Creation: Blog posts, social media, product descriptions at scale",
      "Customer Intelligence: Lead scoring, churn prediction, personalized recommendations",
      "Operations: Inventory optimization, demand forecasting, resource allocation",
      "Compliance: Document review, regulatory checks, audit trail generation",
    ],
    seo: {
      keywords: ["custom AI agents", "bespoke AI solutions", "AI automation", "enterprise AI", "AI workflow automation", "custom machine learning", "AI business solutions India", "intelligent automation"],
      metaDescription: "Custom AI agents built for your specific business needs. Automate workflows, process data, make decisions. Bespoke AI solutions in Faridabad, India.",
    },
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardItem = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

export default function ServiceBlog() {
  return (
    <section id="ai-services" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[#06060e]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500/20 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="inline-block text-sm font-semibold text-brand-400 uppercase tracking-widest mb-3">
            AI Solutions
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Next-Gen{" "}
            <span className="gradient-text">AI Services</span>
          </h2>
          <p className="mt-4 text-zinc-400 max-w-2xl mx-auto text-lg">
            Harness the power of artificial intelligence to automate operations, enhance customer experience, and drive business growth.
          </p>
        </motion.div>

        {/* AI Service Blog Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-20"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.id}
                variants={cardItem}
                id={service.id}
                className="scroll-mt-24"
              >
                <div className={`glass rounded-3xl overflow-hidden shimmer-border`}>
                  {/* Card Header */}
                  <div className={`relative p-8 sm:p-12 bg-gradient-to-br ${service.gradient}`}>
                    <div className="flex items-start gap-6">
                      <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${service.iconGradient} flex items-center justify-center shadow-lg flex-shrink-0`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-bold text-white font-display mb-2">
                          {service.title}
                        </h3>
                        <p className="text-lg text-white/80">{service.subtitle}</p>
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-8 sm:p-12 space-y-10">
                    {/* Overview */}
                    <div>
                      <h4 className="text-xl font-bold text-white font-display mb-4">
                        {service.overview.heading}
                      </h4>
                      <p className="text-zinc-300 leading-relaxed text-base sm:text-lg">
                        {service.overview.content}
                      </p>
                    </div>

                    {/* Key Benefits Grid */}
                    <div>
                      <h4 className="text-lg font-semibold text-white font-display mb-6 flex items-center gap-2">
                        <Zap className="h-5 w-5 text-brand-400" />
                        Key Benefits
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {service.benefits.map((benefit) => {
                          const BenefitIcon = benefit.icon;
                          return (
                            <div
                              key={benefit.title}
                              className="glass-light rounded-xl p-5 border border-white/5"
                            >
                              <BenefitIcon className="h-8 w-8 text-brand-400 mb-3" />
                              <h5 className="font-semibold text-white mb-1">
                                {benefit.title}
                              </h5>
                              <p className="text-sm text-zinc-400">{benefit.desc}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-lg font-semibold text-white font-display mb-4 flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-emerald-400" />
                          Features & Capabilities
                        </h4>
                        <ul className="space-y-3">
                          {service.features.map((feature) => (
                            <li
                              key={feature}
                              className="flex items-start gap-3 text-zinc-300"
                            >
                              <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Use Cases */}
                      <div>
                        <h4 className="text-lg font-semibold text-white font-display mb-4 flex items-center gap-2">
                          <Lightbulb className="h-5 w-5 text-amber-400" />
                          Industry Use Cases
                        </h4>
                        <ul className="space-y-3">
                          {service.useCases.map((useCase) => (
                            <li
                              key={useCase}
                              className="flex items-start gap-3 text-zinc-300"
                            >
                              <span className="text-amber-400 flex-shrink-0 mt-0.5">•</span>
                              <span>{useCase}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="pt-6 border-t border-white/10">
                      <a
                        href="#contact"
                        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-brand-700 px-8 py-4 text-base font-semibold text-white neon-glow hover:from-brand-400 hover:to-brand-600 transition-all duration-300 hover:scale-105"
                      >
                        Get Started with {service.title}
                        <ArrowRight className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
