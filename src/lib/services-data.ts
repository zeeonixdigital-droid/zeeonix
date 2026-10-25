import type { ServiceItem, ServiceCategory } from '@/types';

export interface ServiceGroup {
  id: ServiceCategory;
  title: string;
  tagline: string;
  icon: string;
  color: string;
  services: ServiceItem[];
}

export const SERVICE_GROUPS: ServiceGroup[] = [
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    tagline: 'Grow your audience and drive qualified leads online.',
    icon: 'TrendingUp',
    color: 'from-blue-600 to-cyan-500',
    services: [
      { id: 'seo', name: 'SEO', description: 'Rank higher on Google and get organic traffic.', icon: 'Search', features: ['Keyword research', 'On-page optimisation', 'Link building', 'Monthly reporting'], category: 'digital-marketing', isActive: true },
      { id: 'social-media', name: 'Social Media Marketing', description: 'Build an engaged community across platforms.', icon: 'Share2', features: ['Content calendar', 'Post scheduling', 'Community management', 'Growth strategy'], category: 'digital-marketing', isActive: true },
      { id: 'google-ads', name: 'Google Ads', description: 'Targeted pay-per-click campaigns that convert.', icon: 'BarChart2', features: ['Campaign setup', 'Keyword targeting', 'Ad copy creation', 'Performance tracking'], category: 'digital-marketing', isActive: true },
      { id: 'meta-ads', name: 'Meta Ads', description: 'Facebook and Instagram advertising for real results.', icon: 'Target', features: ['Audience research', 'Creative design', 'A/B testing', 'ROAS optimisation'], category: 'digital-marketing', isActive: true },
      { id: 'lead-generation', name: 'Lead Generation', description: 'Consistent pipeline of qualified prospects.', icon: 'Users', features: ['Lead magnet creation', 'Funnel setup', 'CRM integration', 'Nurture sequences'], category: 'digital-marketing', isActive: true },
      { id: 'email-marketing', name: 'Email Marketing', description: 'Campaigns that nurture and convert your list.', icon: 'Mail', features: ['Template design', 'Automation flows', 'List segmentation', 'Open-rate optimisation'], category: 'digital-marketing', isActive: true },
    ],
  },
  {
    id: 'website-development',
    title: 'Website Development',
    tagline: 'Fast, secure, and conversion-focused websites.',
    icon: 'Globe',
    color: 'from-violet-600 to-purple-500',
    services: [
      { id: 'business-website', name: 'Business Website', description: 'Professional website that represents your brand.', icon: 'Layout', features: ['Custom design', 'Mobile responsive', 'SEO-ready', 'Contact forms'], category: 'website-development', isActive: true },
      { id: 'landing-page', name: 'Landing Page', description: 'High-converting single-page experience.', icon: 'FileText', features: ['CTA optimisation', 'A/B testing ready', 'Fast load time', 'Analytics setup'], category: 'website-development', isActive: true },
      { id: 'portfolio-website', name: 'Portfolio Website', description: 'Showcase your work and attract clients.', icon: 'Briefcase', features: ['Gallery/showcase', 'Contact integration', 'Personal branding', 'Blog option'], category: 'website-development', isActive: true },
      { id: 'wordpress', name: 'WordPress Website', description: 'Easy-to-manage WordPress solution.', icon: 'Code', features: ['Theme customisation', 'Plugin setup', 'Admin training', 'Security hardening'], category: 'website-development', isActive: true },
      { id: 'website-redesign', name: 'Website Redesign', description: 'Modernise and improve your existing site.', icon: 'RefreshCw', features: ['UX audit', 'Modern redesign', 'Content migration', 'Performance tuning'], category: 'website-development', isActive: true },
    ],
  },
  {
    id: 'graphic-design',
    title: 'Graphic Design',
    tagline: 'Visual identity that makes you memorable.',
    icon: 'Palette',
    color: 'from-pink-600 to-rose-500',
    services: [
      { id: 'logo-branding', name: 'Logos & Branding', description: 'Brand identity that stands out and lasts.', icon: 'Star', features: ['Logo design', 'Brand guidelines', 'Colour palette', 'Typography system'], category: 'graphic-design', isActive: true },
      { id: 'social-creatives', name: 'Social Media Creatives', description: 'Scroll-stopping visuals for every platform.', icon: 'Image', features: ['Platform-sized templates', 'Consistent style', 'Story & post formats', 'Fast turnaround'], category: 'graphic-design', isActive: true },
      { id: 'ad-creatives', name: 'Advertisement Design', description: 'Ad creatives designed to drive clicks.', icon: 'Megaphone', features: ['Digital ad formats', 'Print-ready files', 'Multiple variants', 'Brand-aligned'], category: 'graphic-design', isActive: true },
      { id: 'banners', name: 'Banners & Thumbnails', description: 'Eye-catching visuals for YouTube and web.', icon: 'Monitor', features: ['YouTube thumbnails', 'Web banners', 'Event covers', 'Custom sizes'], category: 'graphic-design', isActive: true },
    ],
  },
  {
    id: 'video-editing',
    title: 'Video Editing',
    tagline: 'Polished video content for every platform.',
    icon: 'Video',
    color: 'from-orange-600 to-amber-500',
    services: [
      { id: 'reels-shorts', name: 'Reels & Shorts', description: 'Viral-ready short-form content.', icon: 'Play', features: ['Vertical format', 'Captions & subtitles', 'Music sync', 'Hook optimisation'], category: 'video-editing', isActive: true },
      { id: 'youtube-videos', name: 'YouTube Videos', description: 'Long-form content edited to retain viewers.', icon: 'Youtube', features: ['Colour grading', 'Transitions', 'Thumbnail design', 'End screens'], category: 'video-editing', isActive: true },
      { id: 'promo-videos', name: 'Promotional Videos', description: 'Business promos that convert viewers.', icon: 'Film', features: ['Script consultation', 'Motion graphics', 'Voiceover sync', 'CTA integration'], category: 'video-editing', isActive: true },
      { id: 'product-videos', name: 'Product Videos', description: 'Showcase your product at its best.', icon: 'Package', features: ['Product showcase', 'Feature highlights', 'Before/after cuts', 'E-commerce ready'], category: 'video-editing', isActive: true },
    ],
  },
  {
    id: 'ai-services',
    title: 'AI Services',
    tagline: 'Intelligent automation that works while you sleep.',
    icon: 'Bot',
    color: 'from-teal-600 to-emerald-500',
    services: [
      { id: 'ai-chatbot', name: 'AI Chatbot', description: 'Custom chatbot trained on your business.', icon: 'MessageSquare', features: ['Custom training', 'Multi-language', 'CRM integration', '24/7 availability'], category: 'ai-services', isActive: true },
      { id: 'ai-customer-support', name: 'AI Customer Support', description: 'Automate tier-1 support queries.', icon: 'Headphones', features: ['FAQ automation', 'Ticket routing', 'Escalation rules', 'Analytics'], category: 'ai-services', isActive: true },
      { id: 'ai-lead-qualification', name: 'AI Lead Qualification', description: 'Qualify leads automatically before your team calls.', icon: 'Filter', features: ['Qualification criteria', 'Scoring model', 'CRM sync', 'Instant alerts'], category: 'ai-services', isActive: true },
      { id: 'ai-sales-assistant', name: 'AI Sales Assistant', description: 'AI that nurtures leads toward a decision.', icon: 'Zap', features: ['Conversation flows', 'Product knowledge', 'Follow-up sequences', 'Handoff to human'], category: 'ai-services', isActive: true },
      { id: 'workflow-automation', name: 'Business Workflow Automation', description: 'Eliminate repetitive tasks with smart automation.', icon: 'GitBranch', features: ['Process mapping', 'Automation build', 'Integration setup', 'Ongoing support'], category: 'ai-services', isActive: true },
    ],
  },
  {
    id: 'content-writing',
    title: 'Content Writing',
    tagline: 'Words that rank, engage, and convert.',
    icon: 'PenTool',
    color: 'from-indigo-600 to-blue-500',
    services: [
      { id: 'website-copy', name: 'Website Copy', description: 'Clear, persuasive copy for every page.', icon: 'FileEdit', features: ['Homepage', 'About & services', 'SEO-optimised', 'CTA writing'], category: 'content-writing', isActive: true },
      { id: 'blog-articles', name: 'Blog Articles', description: 'Authority-building long-form content.', icon: 'BookOpen', features: ['Keyword research', 'Expert tone', 'Internal linking', 'Meta descriptions'], category: 'content-writing', isActive: true },
      { id: 'product-descriptions', name: 'Product Descriptions', description: 'Descriptions that sell on e-commerce platforms.', icon: 'ShoppingBag', features: ['Benefit-focused', 'SEO-optimised', 'Scannable format', 'Platform-ready'], category: 'content-writing', isActive: true },
      { id: 'social-captions', name: 'Social Media Captions', description: 'Engaging captions for every platform.', icon: 'MessageCircle', features: ['Platform-native tone', 'Hashtag strategy', 'Brand voice', 'CTAs included'], category: 'content-writing', isActive: true },
    ],
  },
  {
    id: 'ecommerce',
    title: 'E-commerce Services',
    tagline: 'Online stores built to sell from day one.',
    icon: 'ShoppingCart',
    color: 'from-green-600 to-teal-500',
    services: [
      { id: 'store-setup', name: 'Online Store Setup', description: 'Launch your store on the right platform.', icon: 'Store', features: ['Platform selection', 'Theme setup', 'Payment gateway', 'Shipping config'], category: 'ecommerce', isActive: true },
      { id: 'product-listing', name: 'Product Listing', description: 'Optimised listings that convert browsers.', icon: 'List', features: ['Image optimisation', 'SEO titles', 'Variant setup', 'Bulk upload'], category: 'ecommerce', isActive: true },
      { id: 'store-optimisation', name: 'Store Optimisation', description: 'Improve your conversion rate and revenue.', icon: 'TrendingUp', features: ['UX audit', 'Checkout optimisation', 'Speed improvements', 'CRO testing'], category: 'ecommerce', isActive: true },
      { id: 'ecom-marketing', name: 'E-commerce Marketing', description: 'Drive traffic and sales to your store.', icon: 'Crosshair', features: ['Product ads', 'Retargeting', 'Email sequences', 'Influencer outreach'], category: 'ecommerce', isActive: true },
    ],
  },
  {
    id: 'virtual-assistant',
    title: 'Virtual Assistant',
    tagline: 'Skilled support to free up your time.',
    icon: 'UserCheck',
    color: 'from-purple-600 to-violet-500',
    services: [
      { id: 'data-entry', name: 'Data Entry', description: 'Accurate data entry and database management.', icon: 'Database', features: ['Spreadsheet management', 'CRM updates', 'Data cleaning', 'Quality checks'], category: 'virtual-assistant', isActive: true },
      { id: 'email-management', name: 'Email Management', description: 'Inbox zero, handled professionally.', icon: 'Inbox', features: ['Inbox organisation', 'Response drafting', 'Follow-up tracking', 'Filter setup'], category: 'virtual-assistant', isActive: true },
      { id: 'research', name: 'Research', description: 'Thorough research delivered on time.', icon: 'Search', features: ['Market research', 'Competitor analysis', 'Lead lists', 'Summary reports'], category: 'virtual-assistant', isActive: true },
      { id: 'admin-assistance', name: 'Administrative Assistance', description: 'General admin to keep your business running.', icon: 'Clipboard', features: ['Scheduling', 'Document prep', 'Coordination', 'Reporting'], category: 'virtual-assistant', isActive: true },
    ],
  },
  {
    id: 'app-development',
    title: 'App & Software Development',
    tagline: 'Custom tools built around your workflow.',
    icon: 'Code2',
    color: 'from-red-600 to-orange-500',
    services: [
      { id: 'web-application', name: 'Web Applications', description: 'Full-stack web apps tailored to your needs.', icon: 'Globe', features: ['Custom design', 'Database setup', 'Authentication', 'API development'], category: 'app-development', isActive: true },
      { id: 'business-dashboard', name: 'Business Dashboards', description: 'Real-time dashboards for your key metrics.', icon: 'BarChart', features: ['Data visualisation', 'KPI tracking', 'Role-based access', 'Export options'], category: 'app-development', isActive: true },
      { id: 'internal-tools', name: 'Internal Tools', description: 'Streamline operations with custom-built tools.', icon: 'Tool', features: ['Process automation', 'Staff interface', 'Integrations', 'Training included'], category: 'app-development', isActive: true },
      { id: 'api-integrations', name: 'API Integrations', description: 'Connect your apps and automate data flow.', icon: 'Link', features: ['Third-party APIs', 'Webhook setup', 'Error handling', 'Documentation'], category: 'app-development', isActive: true },
    ],
  },
  {
    id: 'online-business-setup',
    title: 'Online Business Setup',
    tagline: 'Everything you need to launch online, done for you.',
    icon: 'Rocket',
    color: 'from-cyan-600 to-sky-500',
    services: [
      { id: 'digital-presence', name: 'Digital Presence Setup', description: 'Get your business visible on Google and social media.', icon: 'Globe2', features: ['Google Business Profile', 'Social profiles', 'Brand consistency', 'Directory listings'], category: 'online-business-setup', isActive: true },
      { id: 'business-landing', name: 'Business Landing Page', description: 'A fast-launch page to start capturing leads.', icon: 'Layout', features: ['Quick turnaround', 'SEO-ready', 'Lead capture form', 'Mobile-first'], category: 'online-business-setup', isActive: true },
      { id: 'lead-capture-system', name: 'Lead Capture System', description: 'Automated system to collect and manage enquiries.', icon: 'Funnel', features: ['Form setup', 'CRM integration', 'Email automation', 'Lead scoring'], category: 'online-business-setup', isActive: true },
      { id: 'marketing-automation', name: 'Marketing Automation', description: 'Set up automated flows that work 24/7.', icon: 'Repeat', features: ['Email sequences', 'Social scheduling', 'Lead nurturing', 'Reporting'], category: 'online-business-setup', isActive: true },
    ],
  },
];

export const BUDGET_OPTIONS = [
  { value: 'under-500', label: 'Under ₹500' },
  { value: '500-2000', label: '₹500 - ₹2,000' },
  { value: '2000-5000', label: '₹2,000 - ₹5,000' },
  { value: '5000-15000', label: '₹5,000 - ₹15,000' },
  { value: '15000-50000', label: '₹15,000 - ₹50,000' },
  { value: 'above-50000', label: 'Above ₹50,000' },
  { value: 'custom', label: 'Custom / Not sure' },
];

export const DEADLINE_OPTIONS = [
  { value: 'urgent', label: 'Urgent (within 1 week)' },
  { value: '2-weeks', label: '2 weeks' },
  { value: '1-month', label: '1 month' },
  { value: '2-3-months', label: '2-3 months' },
  { value: 'flexible', label: 'Flexible / Ongoing' },
];

export const CONTACT_METHOD_OPTIONS = [
  { value: 'email', label: 'Email' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'phone', label: 'Phone call' },
  { value: 'video-call', label: 'Video call' },
];

export const COUNTRIES = [
  'India', 'United States', 'United Kingdom', 'Canada', 'Australia',
  'UAE', 'Saudi Arabia', 'Singapore', 'Bangladesh', 'Pakistan', 'Nepal',
  'Other',
];
