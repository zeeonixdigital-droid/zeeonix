-- ============================================================
-- ZEENEX DIGITAL — Supabase Database Setup
-- ============================================================
-- Copy and paste this entire script into:
--   Supabase Dashboard → SQL Editor → New Query → Run
-- ============================================================

-- 1. CONTACT LEADS TABLE (stores form submissions)
CREATE TABLE IF NOT EXISTS public.contact_leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  service TEXT,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.contact_leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert contact leads
CREATE POLICY "Allow anon insert contact_leads"
  ON public.contact_leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow service_role to read all leads
CREATE POLICY "Allow service_role select contact_leads"
  ON public.contact_leads
  FOR SELECT
  TO service_role
  USING (true);


-- 2. CASE STUDIES TABLE
CREATE TABLE IF NOT EXISTS public.case_studies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  full_description TEXT,
  results TEXT,
  tech_stack TEXT,
  image_url TEXT,
  live_url TEXT,
  gradient TEXT,
  accent TEXT,
  img TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read case studies
CREATE POLICY "Allow public select case_studies"
  ON public.case_studies
  FOR SELECT
  TO anon
  USING (true);

-- Allow service_role to manage case studies
CREATE POLICY "Allow service_role all case_studies"
  ON public.case_studies
  FOR ALL
  TO service_role
  USING (true);


-- 3. TESTIMONIALS TABLE
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT,
  avatar TEXT,
  content TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public select testimonials"
  ON public.testimonials
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow service_role all testimonials"
  ON public.testimonials
  FOR ALL
  TO service_role
  USING (true);


-- 4. NEWSLETTER SUBSCRIBERS TABLE
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anon insert newsletter"
  ON public.newsletter_subscribers
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow service_role select newsletter"
  ON public.newsletter_subscribers
  FOR SELECT
  TO service_role
  USING (true);


-- ============================================================
-- SEED DATA: Insert sample case studies & testimonials
-- (Optional — remove if you want to start empty)
-- ============================================================

-- Seed case studies
INSERT INTO public.case_studies (title, category, description, full_description, results, tech_stack, gradient, accent, img)
VALUES
  (
    'FinFlow SaaS Dashboard',
    'Micro SaaS',
    'Real-time financial analytics platform with AI-driven insights, automated reporting, and multi-currency support for global enterprises.',
    'FinFlow is a comprehensive financial analytics platform designed for CFOs and finance teams at mid-to-large enterprises. We built the entire MVP in 6 weeks, then iterated based on beta user feedback to launch a production-ready product in 3 months.',
    '• $2.4M seed round raised post-MVP\n• 50+ enterprise clients in first 6 months\n• 99.9% uptime SLA achieved\n• 40% reduction in reporting time',
    'React, Node.js, PostgreSQL, Redis, AWS, Stripe',
    'from-violet-500/30 to-purple-700/30',
    'border-violet-500/30',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&auto=format'
  ),
  (
    'Glow Beauty E-commerce',
    'Website Development',
    'Headless Shopify store with custom React frontend, AI-powered product recommendations, and 40% conversion rate improvement.',
    'Glow Beauty came to us with a sluggish Shopify store converting at 2.1%. We rebuilt the entire frontend as a headless React application with dynamic personalization.',
    '• Conversion rate: 2.1% → 8.7% (4x increase)\n• Average order value up 35%\n• Page load time: 4.2s → 1.1s\n• 15,000+ new customers in 60 days',
    'React, Shopify Storefront API, Algolia, Vercel, Stripe',
    'from-pink-500/30 to-rose-700/30',
    'border-pink-500/30',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&auto=format'
  ),
  (
    'FitPulse Mobile App',
    'Mobile App',
    'Cross-platform fitness app with AI-generated workout plans, real-time form correction, and social challenges. 100K+ downloads on launch.',
    'FitPulse is a mobile fitness companion that uses computer vision to correct exercise form in real-time. We built it using React Native for cross-platform deployment.',
    '• 100K+ downloads in first month\n• 4.8★ App Store rating (2,000+ reviews)\n• 35% month-over-month user growth\n• Featured by Apple in New Apps We Love',
    'React Native, TensorFlow Lite, Firebase, Node.js, MongoDB',
    'from-cyan-500/30 to-blue-700/30',
    'border-cyan-500/30',
    'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop&auto=format'
  ),
  (
    'TrendWave UGC Campaign',
    'UGC Ads',
    'TikTok-first UGC campaign with 25 creator-produced videos generating 2M+ organic views and 15K conversions in 30 days.',
    'We designed and executed a complete TikTok UGC strategy for a DTC skincare brand. Recruited 25 micro-creators, wrote scripts optimized for TikTok algorithm.',
    '• 2M+ organic video views\n• 15,000 conversions in 30 days\n• 4.2x ROAS on paid media\n• 3x better performance than studio ads\n• CPA reduced by 62%',
    'TikTok Ads Manager, Meta Ads, Motion, CapCut, Figma',
    'from-orange-500/30 to-amber-700/30',
    'border-orange-500/30',
    'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop&auto=format'
  ),
  (
    'CloudSync Automation Hub',
    'Automation',
    'Multi-tenant workflow automation platform handling 10,000+ daily pipelines with drag-and-drop builder and 50+ integrations.',
    'CloudSync is an enterprise workflow automation platform we built from scratch. The drag-and-drop pipeline builder lets non-technical teams create complex automations.',
    '• 10,000+ daily automated pipelines\n• 50+ native integrations\n• 99.99% uptime\n• $1.2M ARR within 8 months\n• 15-min avg time-to-automation',
    'React, TypeScript, Node.js, Kubernetes, PostgreSQL, Redis, Kafka',
    'from-emerald-500/30 to-teal-700/30',
    'border-emerald-500/30',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop&auto=format'
  ),
  (
    'Apex SEO Platform',
    'SEO & Marketing',
    'Enterprise SEO tool ranking 50K+ keywords in top 3 positions. AI-powered content generation, competitor gap analysis, and automated reporting.',
    'Apex is an all-in-one SEO platform we developed for an agency client. It combines rank tracking, backlink analysis, content AI, and automated client reporting.',
    '• 50,000+ keywords in top 3 positions\n• 200% increase in organic traffic in 6 months\n• 85% reduction in reporting time\n• $500K+ monthly client ad spend managed',
    'Next.js, Python, TensorFlow, PostgreSQL, Elasticsearch, AWS',
    'from-indigo-500/30 to-blue-700/30',
    'border-indigo-500/30',
    'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&h=400&fit=crop&auto=format'
  )
ON CONFLICT DO NOTHING;

-- Seed testimonials
INSERT INTO public.testimonials (name, role, avatar, content, rating)
VALUES
  (
    'Sarah Chen',
    'CEO, Glow Beauty',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop&auto=format',
    'Zeenex rebuilt our entire e-commerce platform and our conversion rate jumped from 2.1% to 8.7% in 60 days. Their UGC ad campaign brought in 15,000 new customers. Best agency investment we have ever made.',
    5
  ),
  (
    'Marcus Rivera',
    'Founder, FinFlow',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&auto=format',
    'They built our SaaS MVP in 5 weeks and helped us raise $2M seed round. The product was so polished, investors thought we had been building for years. Absolute wizards at execution.',
    5
  ),
  (
    'Priya Kapoor',
    'CMO, FitPulse',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=96&h=96&fit=crop&auto=format',
    'The mobile app Zeenex built hit 100K downloads in the first month. Their SEO work also got us ranking #1 for 50+ competitive keywords. We have tripled our MRR since partnering with them.',
    5
  ),
  (
    'David Okonkwo',
    'VP Product, CloudSync',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&auto=format',
    'Enterprise-grade automation platform delivered on time and under budget. Their team integrated seamlessly with our internal engineers. The 24/7 support has been a game changer for our SLAs.',
    5
  ),
  (
    'Emma Larsson',
    'Founder, NordicTech',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop&auto=format',
    'We came to Zeenex with a napkin sketch and they turned it into a profitable SaaS business. Their branding work gave us a visual identity that competes with Fortune 500 companies. Forever grateful.',
    5
  )
ON CONFLICT DO NOTHING;
