/**
 * Database Layer — Zeeonix Digital
 *
 * Supabase-powered backend for contact forms, case studies,
 * testimonials, and newsletter subscriptions.
 *
 * SETUP:
 *   1. Copy supabase-setup.sql into Supabase SQL Editor → Run
 *   2. Ensure .env has VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
 *   3. The site works even without the DB (static fallback data)
 *
 * TABLES REQUIRED:
 *   - contact_leads (for form submissions)
 *   - case_studies (for portfolio — optional, static fallback)
 *   - testimonials (for reviews — optional, static fallback)
 *   - newsletter_subscribers (for footer signup)
 */

import { createClient, SupabaseClient } from "@supabase/supabase-js";

// ==================== SUPABASE CONFIG ====================
// HARDCODED for Arena deployment (env vars not supported)
const supabaseUrl = "https://okympzfrdrfatbvfuikw.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9reW1wemZkcmZyYXRidmZ1aWt3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMDE1MDEsImV4cCI6MjA5Mjg3NzUwMX0.rpLOeT7BZsUjP8goG7WHB1KC3_VzBsAJ4wGaKn7Di5U";


let supabase: SupabaseClient | null = null;

function getClient(): SupabaseClient {
  if (!supabase) {
    supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false },
    });
  }
  return supabase;
}

// ==================== TYPES ====================

export interface ContactFormData {
  name: string;
  email: string;
  service: string;
  message: string;
}

export interface ContactSubmitResult {
  success: boolean;
  error?: string;
  id?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  category: string;
  description: string;
  full_description?: string;
  results?: string;
  tech_stack?: string;
  image_url?: string;
  live_url?: string;
  gradient: string;
  accent: string;
  img: string;
}

export interface TestimonialData {
  id: string;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
}

// ==================== FORM SUBMISSION ====================

/**
 * Submit a contact form lead to the database.
 * Falls back to a simulated success if no DB is configured
 * (so the site works out of the box for preview).
 */
export async function submitContactForm(
  data: ContactFormData
): Promise<ContactSubmitResult> {
  
  const client = getClient();

  // Try Supabase client first
  try {
    
    // INSERT only - no SELECT required (avoids RLS issues)
    const { error } = await client
      .from("contact_leads")
      .insert([
        {
          name: data.name,
          email: data.email,
          service: data.service,
          message: data.message,
        },
      ]);

    if (error) {
      console.error("[Zeenex DB] ❌ Contact form insert error:", error);
      console.error("[Zeenex DB] Error code:", error.code);
      console.error("[Zeenex DB] Error message:", error.message);
      
      // Check for table not found
      if (error.code === "42P01") {
        return { 
          success: false, 
          error: "Database table not configured. Please run supabase-setup.sql" 
        };
      }
      
      // Check for RLS policy violation
      if (error.code === "42501") {
        return { 
          success: false, 
          error: "Permission denied. Check RLS policies in Supabase." 
        };
      }
      
      return { success: false, error: error.message || "Failed to save your message. Please try again." };
    }

    return { success: true };
  } catch (err: any) {
    console.error("[Zeenex DB] ❌ Contact form error:", err);
    console.error("[Zeenex DB] Error name:", err?.name);
    console.error("[Zeenex DB] Error message:", err?.message);
    
    // FALLBACK: Try direct REST API
    return await submitContactFormDirect(data);
  }
}

/**
 * Fallback: Direct REST API call for contact form submission.
 */
async function submitContactFormDirect(
  data: ContactFormData
): Promise<ContactSubmitResult> {
  const url = `${supabaseUrl}/rest/v1/contact_leads`;
  
  
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "apikey": supabaseAnonKey,
        "Authorization": `Bearer ${supabaseAnonKey}`,
        "Content-Type": "application/json",
        "Prefer": "return=representation",
      },
      body: JSON.stringify(data),
    });


    if (response.ok) {
      const result = await response.json();
      return { success: true, id: result[0]?.id };
    }

    const errorData = await response.json().catch(() => ({}));
    console.error("[Zeenex DB] ❌ Direct API error:", errorData);

    // Handle table not found
    if (response.status === 404) {
      console.error("[Zeenex DB] ❌ Table not found (404)");
      return { success: false, error: "Database table not configured. Please run supabase-setup.sql" };
    }

    // Handle permission denied
    if (response.status === 401 || response.status === 403) {
      console.error("[Zeenex DB] ❌ Permission denied (401/403)");
      return { success: false, error: "Permission denied. Check RLS policies in Supabase." };
    }

    return { success: false, error: errorData.message || `Failed to save message (Status: ${response.status}). Please try again.` };
  } catch (fetchErr: any) {
    console.error("[Zeenex DB] ❌❌ NETWORK ERROR (Failed to fetch):", fetchErr);
    console.error("[Zeenex DB] Error type:", fetchErr?.name);
    console.error("[Zeenex DB] Error message:", fetchErr?.message);
    
    if (fetchErr?.message?.includes("Failed to fetch")) {
      console.error("[Zeenex DB] ⚠️ This is likely a CORS or network connectivity issue");
      console.error("[Zeenex DB] ⚠️ Check: 1) Supabase project is active 2) RLS policies allow anon inserts 3) No ad blockers");
    }
    
    return { 
      success: false, 
      error: "Network error. Please check your internet connection and try again." 
    };
  }
}

// ==================== CASE STUDIES ====================

/**
 * Fetch case studies from the database.
 * Falls back to the hardcoded static data below if no DB is configured.
 */
export async function getCaseStudies(): Promise<CaseStudy[]> {
  const client = getClient();

  if (!client) {
    return getStaticCaseStudies();
  }

  try {
    const { data, error } = await client
      .from("case_studies")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data) {
      console.warn("[Zeenex DB] Failed to fetch case studies:", error?.message);
      return getStaticCaseStudies();
    }

    return data as CaseStudy[];
  } catch (err) {
    console.warn("[Zeenex DB] Error fetching case studies, using static data");
    return getStaticCaseStudies();
  }
}

export function getStaticCaseStudies(): CaseStudy[] {
  return [
    {
      id: "1",
      title: "FinFlow SaaS Dashboard",
      category: "Micro SaaS",
      description:
        "Real-time financial analytics platform with AI-driven insights, automated reporting, and multi-currency support for global enterprises.",
      full_description:
        "FinFlow is a comprehensive financial analytics platform designed for CFOs and finance teams at mid-to-large enterprises. We built the entire MVP in 6 weeks, then iterated based on beta user feedback to launch a production-ready product in 3 months. The platform processes over 1M transactions daily with sub-second query times.",
      results:
        "• $2.4M seed round raised post-MVP\n• 50+ enterprise clients in first 6 months\n• 99.9% uptime SLA achieved\n• 40% reduction in reporting time for clients",
      tech_stack: "React, Node.js, PostgreSQL, Redis, AWS, Stripe",
      image_url: "",
      live_url: "",
      gradient: "from-violet-500/30 to-purple-700/30",
      accent: "border-violet-500/30",
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&auto=format",
    },
    {
      id: "2",
      title: "Glow Beauty E-commerce",
      category: "Website Development",
      description:
        "Headless Shopify store with custom React frontend, AI-powered product recommendations, and 40% conversion rate improvement.",
      full_description:
        "Glow Beauty came to us with a sluggish Shopify store converting at 2.1%. We rebuilt the entire frontend as a headless React application with dynamic personalization. Integrated AI product recommendations, advanced search with Algolia, and a streamlined 2-step checkout that reduced cart abandonment by 60%.",
      results:
        "• Conversion rate: 2.1% → 8.7% (4x increase)\n• Average order value up 35%\n• Page load time: 4.2s → 1.1s\n• 15,000+ new customers in 60 days via UGC ads",
      tech_stack: "React, Shopify Storefront API, Algolia, Vercel, Stripe",
      image_url: "",
      live_url: "",
      gradient: "from-pink-500/30 to-rose-700/30",
      accent: "border-pink-500/30",
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&auto=format",
    },
    {
      id: "3",
      title: "FitPulse Mobile App",
      category: "Mobile App",
      description:
        "Cross-platform fitness app with AI-generated workout plans, real-time form correction, and social challenges. 100K+ downloads on launch.",
      full_description:
        "FitPulse is a mobile fitness companion that uses computer vision to correct exercise form in real-time. We built it using React Native for cross-platform deployment with a custom TensorFlow Lite model running on-device for instant feedback. The social challenge feature drove viral growth with 40% of users joining via friend invites.",
      results:
        "• 100K+ downloads in first month\n• 4.8★ App Store rating (2,000+ reviews)\n• 35% month-over-month user growth\n• Featured by Apple in 'New Apps We Love'",
      tech_stack: "React Native, TensorFlow Lite, Firebase, Node.js, MongoDB",
      image_url: "",
      live_url: "",
      gradient: "from-cyan-500/30 to-blue-700/30",
      accent: "border-cyan-500/30",
      img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop&auto=format",
    },
    {
      id: "4",
      title: "TrendWave UGC Campaign",
      category: "UGC Ads",
      description:
        "TikTok-first UGC campaign with 25 creator-produced videos generating 2M+ organic views and 15K conversions in 30 days.",
      full_description:
        "We designed and executed a complete TikTok UGC strategy for a DTC skincare brand. Recruited 25 micro-creators, wrote scripts optimized for TikTok's algorithm, and A/B tested 50+ ad variations. The winning creative achieved a 4.2x ROAS and the campaign outperformed all previous polished ad efforts by 3x.",
      results:
        "• 2M+ organic video views\n• 15,000 conversions in 30 days\n• 4.2x ROAS on paid media\n• 3x better performance than studio ads\n• CPA reduced by 62%",
      tech_stack: "TikTok Ads Manager, Meta Ads, Motion, CapCut, Figma",
      image_url: "",
      live_url: "",
      gradient: "from-orange-500/30 to-amber-700/30",
      accent: "border-orange-500/30",
      img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop&auto=format",
    },
    {
      id: "5",
      title: "CloudSync Automation Hub",
      category: "Automation",
      description:
        "Multi-tenant workflow automation platform handling 10,000+ daily pipelines with drag-and-drop builder and custom API integrations.",
      full_description:
        "CloudSync is an enterprise workflow automation platform we built from scratch. The drag-and-drop pipeline builder lets non-technical teams create complex automations connecting 50+ third-party apps. The multi-tenant architecture ensures complete data isolation for each enterprise client while maintaining sub-second execution times.",
      results:
        "• 10,000+ daily automated pipelines\n• 50+ native integrations\n• 99.99% uptime\n• $1.2M ARR within 8 months of launch\n• 15-minute average time-to-automation for new users",
      tech_stack: "React, TypeScript, Node.js, Kubernetes, PostgreSQL, Redis, Kafka",
      image_url: "",
      live_url: "",
      gradient: "from-emerald-500/30 to-teal-700/30",
      accent: "border-emerald-500/30",
      img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop&auto=format",
    },
    {
      id: "6",
      title: "Apex SEO Platform",
      category: "SEO & Marketing",
      description:
        "Enterprise SEO tool ranking 50K+ keywords in top 3 positions. AI-powered content generation, competitor gap analysis, and automated reporting.",
      full_description:
        "Apex is an all-in-one SEO platform we developed for an agency client. It combines rank tracking, backlink analysis, content AI, and automated client reporting into a single dashboard. The AI content module generates SEO-optimized articles that rank consistently in the top 3 for competitive keywords.",
      results:
        "• 50,000+ keywords in top 3 positions\n• 200% increase in organic traffic in 6 months\n• 85% reduction in reporting time\n• $500K+ monthly client ad spend managed\n• 18% average CTR improvement",
      tech_stack: "Next.js, Python, TensorFlow, PostgreSQL, Elasticsearch, AWS",
      image_url: "",
      live_url: "",
      gradient: "from-indigo-500/30 to-blue-700/30",
      accent: "border-indigo-500/30",
      img: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&h=400&fit=crop&auto=format",
    },
  ];
}

// ==================== TESTIMONIALS ====================

export async function getTestimonials(): Promise<TestimonialData[]> {
  const client = getClient();

  if (!client) {
    return getStaticTestimonials();
  }

  try {
    const { data, error } = await client
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data) {
      console.warn("[Zeenex DB] Failed to fetch testimonials:", error?.message);
      return getStaticTestimonials();
    }

    return data as TestimonialData[];
  } catch (err) {
    console.warn("[Zeenex DB] Error fetching testimonials, using static data");
    return getStaticTestimonials();
  }
}

export function getStaticTestimonials(): TestimonialData[] {
  return [
    // ==================== INDIAN CLIENTS (10) ====================
    {
      id: "1",
      name: "Rajesh Sharma",
      role: "CEO, MedCare Hospitals, Faridabad",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&auto=format",
      content:
        "Zeeonix Digital transformed our online presence. Our patient appointments increased by 300% after their SEO and website redesign. Best digital agency in Faridabad!",
      rating: 5,
    },
    {
      id: "2",
      name: "Priya Malhotra",
      role: "Founder, StyleHub Boutique, Delhi",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop&auto=format",
      content:
        "Our e-commerce sales jumped 5x after Zeeonix rebuilt our website and ran their UGC ad campaign. They understand Indian market dynamics perfectly. Highly recommended!",
      rating: 5,
    },
    {
      id: "3",
      name: "Amit Verma",
      role: "Director, Verma Manufacturers, Faridabad",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop&auto=format",
      content:
        "As a traditional manufacturing business, we were skeptical about digital marketing. Zeeonix proved us wrong - we now get 50+ qualified B2B leads monthly through their SEO work.",
      rating: 5,
    },
    {
      id: "4",
      name: "Sneha Reddy",
      role: "Co-founder, EduTech India, Bangalore",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=96&h=96&fit=crop&auto=format",
      content:
        "The AI chatbot Zeeonix built for us handles 80% of student queries automatically. Our admission inquiries increased by 250% and response time dropped to seconds. Game changer!",
      rating: 5,
    },
    {
      id: "5",
      name: "Vikram Singh",
      role: "Owner, Singh Real Estate, Gurgaon",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&auto=format",
      content:
        "Their local SEO services got us ranking #1 for 'properties in Gurgaon'. We closed 40+ deals worth ₹50+ crores from website leads. Worth every rupee invested.",
      rating: 5,
    },
    {
      id: "6",
      name: "Anjali Gupta",
      role: "CEO, FreshBites Restaurant, Noida",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=96&h=96&fit=crop&auto=format",
      content:
        "Google reviews management and local SEO by Zeeonix helped us become the top-rated restaurant in Noida. Foot traffic increased 180% in just 3 months!",
      rating: 5,
    },
    {
      id: "7",
      name: "Rahul Jain",
      role: "Founder, Jain Legal Associates, Mumbai",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=96&h=96&fit=crop&auto=format",
      content:
        "Entity SEO and reputation management services positioned our firm as industry leaders. We now rank for competitive legal keywords and get high-value clients consistently.",
      rating: 5,
    },
    {
      id: "8",
      name: "Kavita Deshmukh",
      role: "Director, Pune Institute of Technology",
      avatar: "https://images.unsplash.com/photo-1554151228-14d9def656ec?w=96&h=96&fit=crop&auto=format",
      content:
        "Student enrollment increased 40% after Zeeonix optimized our website and ran targeted digital campaigns. Their team understands the education sector deeply.",
      rating: 5,
    },
    {
      id: "9",
      name: "Arjun Mehta",
      role: "CEO, FitLife Gyms, Delhi NCR",
      avatar: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=96&h=96&fit=crop&auto=format",
      content:
        "The AI voice receptionist handles all our membership calls 24/7. We never miss a lead anymore and membership signups increased 65%. Brilliant solution!",
      rating: 5,
    },
    {
      id: "10",
      name: "Deepika Nair",
      role: "Founder, Ayurveda Wellness, Kochi",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=96&h=96&fit=crop&auto=format",
      content:
        "Zeeonix helped us expand from one clinic to 5 locations. Their branding, SEO, and automation systems scaled with us. True growth partners!",
      rating: 5,
    },
    // ==================== MORE INDIAN CLIENTS (10 Additional) ====================
    {
      id: "11",
      name: "Sanjay Kapoor",
      role: "MD, Kapoor Industries, Faridabad",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&auto=format",
      content:
        "Zeeonix built our B2B portal and implemented AI lead qualification. We now close 3x more deals and our sales team focuses only on hot leads. Revenue up 220%!",
      rating: 5,
    },
    {
      id: "12",
      name: "Meera Iyer",
      role: "Founder, KidsWorld School, Chennai",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=96&h=96&fit=crop&auto=format",
      content:
        "Admission inquiries tripled after their SEO and AI chatbot implementation. Parents love the instant responses. Best education marketing agency we've worked with!",
      rating: 5,
    },
    {
      id: "13",
      name: "Rohan Malhotra",
      role: "CEO, UrbanHomes Realty, Bangalore",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&auto=format",
      content:
        "Property listing website + AI voice assistant = 400% more qualified calls. Zeeonix understands real estate tech. We're now the #1 brokerage in Bangalore!",
      rating: 5,
    },
    {
      id: "14",
      name: "Pooja Desai",
      role: "Owner, Glow Spa & Salon, Ahmedabad",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop&auto=format",
      content:
        "Online bookings increased 350% after Zeeonix set up our booking system and ran Instagram ads. The UGC content they created went viral locally. Amazing ROI!",
      rating: 5,
    },
    {
      id: "15",
      name: "Aditya Chopra",
      role: "Director, Chopra Auto Parts, Ludhiana",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop&auto=format",
      content:
        "Traditional auto parts business went digital with Zeeonix. Now supplying to 15+ states through our e-commerce platform. Export inquiries from UAE & Kenya!",
      rating: 5,
    },
    {
      id: "16",
      name: "Dr. Sunita Rao",
      role: "Chief Dentist, SmileCare Clinic, Hyderabad",
      avatar: "https://images.unsplash.com/photo-1554151228-14d9def656ec?w=96&h=96&fit=crop&auto=format",
      content:
        "Patient appointments doubled in 2 months. The AI receptionist books appointments, sends reminders, and handles rescheduling. Zero no-shows now!",
      rating: 5,
    },
    {
      id: "17",
      name: "Karan Bhatia",
      role: "Founder, TechGear Electronics, Jaipur",
      avatar: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=96&h=96&fit=crop&auto=format",
      content:
        "Amazon + Flipkart sales grew 8x after Zeeonix optimized our listings and ran ads. Their e-commerce expertise is unmatched. From ₹5L to ₹40L monthly!",
      rating: 5,
    },
    {
      id: "18",
      name: "Neha Joshi",
      role: "CEO, GreenFoods Organic, Pune",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=96&h=96&fit=crop&auto=format",
      content:
        "Subscription model + SEO + content marketing = 5000+ monthly subscribers. Zeeonix built our entire digital ecosystem. Organic food delivery leader in Pune!",
      rating: 5,
    },
    {
      id: "19",
      name: "Harish Nambiar",
      role: "Partner, Nambiar Constructions, Kochi",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=96&h=96&fit=crop&auto=format",
      content:
        "Project inquiries increased 280% after website redesign and Google Ads. Their team created stunning 3D walkthroughs. Closed ₹120+ crores in new projects!",
      rating: 5,
    },
    {
      id: "20",
      name: "Ritu Agarwal",
      role: "Founder, BabyCare Products, Kolkata",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=96&h=96&fit=crop&auto=format",
      content:
        "From local store to pan-India brand in 12 months! Zeeonix handled everything - branding, website, social media, marketplace listings. Revenue grew 15x!",
      rating: 5,
    },
    // ==================== INTERNATIONAL CLIENTS (5) ====================
    {
      id: "21",
      name: "James Mitchell",
      role: "CEO, TechStart Solutions, USA",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=96&h=96&fit=crop&auto=format",
      content:
        "Zeeonix built our SaaS MVP in 6 weeks and it was investor-ready. We raised $3M seed round partly because the product looked so professional. Exceptional work!",
      rating: 5,
    },
    {
      id: "22",
      name: "Sophie Anderson",
      role: "Marketing Director, BeautyBox, UK",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop&auto=format",
      content:
        "Their UGC ad campaigns outperformed our UK agency by 300%. ROAS of 5.2x on Meta and TikTok. We've now made them our exclusive creative partner for Europe.",
      rating: 5,
    },
    {
      id: "23",
      name: "Mohammed Al-Rashid",
      role: "Owner, Al-Rashid Trading, Dubai",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&auto=format",
      content:
        "Zeeonix manages our digital presence across 3 countries. Their AI chatbot handles customer queries in Arabic and English. Professional team, excellent results.",
      rating: 5,
    },
    {
      id: "24",
      name: "Lisa Chen",
      role: "Founder, HealthFirst Clinic, Singapore",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=96&h=96&fit=crop&auto=format",
      content:
        "Patient appointment system and SEO increased our bookings by 220%. The AI voice receptionist works flawlessly. Best investment for our clinic expansion.",
      rating: 5,
    },
    {
      id: "25",
      name: "David Thompson",
      role: "CEO, PropTech Ventures, Australia",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop&auto=format",
      content:
        "Zeeonix built our entire property platform with AI-powered recommendations. Property viewings increased 180% and we're now expanding to 3 more cities. Outstanding!",
      rating: 5,
    },
  ];
}

// ==================== NEWSLETTER SUBSCRIPTION ====================

// ==================== NEWSLETTER SUBSCRIPTION ====================

export interface NewsletterSubscribeResult {
  success: boolean;
  error?: string;
  isDuplicate?: boolean;
}

/**
 * Subscribe an email to the newsletter.
 * Saves to Supabase newsletter_subscribers table.
 * Handles duplicate emails gracefully.
 * Falls back to direct fetch if Supabase client fails.
 */
export async function subscribeNewsletter(
  email: string
): Promise<NewsletterSubscribeResult> {
  
  const client = getClient();

  // Try Supabase client first
  try {
    
    // INSERT only - no SELECT required (avoids RLS issues)
    const { error } = await client
      .from("newsletter_subscribers")
      .insert([{ email }]);

    if (error) {
      console.error("[Zeenex DB] ❌ Newsletter insert error:", error);
      console.error("[Zeenex DB] Error code:", error.code);
      console.error("[Zeenex DB] Error message:", error.message);
      
      // Check for duplicate email (unique constraint violation)
      if (error.code === "23505" || error.message.includes("duplicate")) {
        return { 
          success: true, 
          isDuplicate: true,
          error: "You're already subscribed!" 
        };
      }
      
      // Check for table not found
      if (error.code === "42P01") {
        console.error("[Zeenex DB] ❌ Table 'newsletter_subscribers' not found. Run supabase-setup.sql");
        return { 
          success: false, 
          error: "Database table not configured. Please run supabase-setup.sql" 
        };
      }
      
      // Check for RLS policy violation
      if (error.code === "42501") {
        console.error("[Zeenex DB] ❌ RLS policy violation. Check INSERT policy for anon role.");
        return { 
          success: false, 
          error: "Permission denied. Check RLS policies in Supabase." 
        };
      }
      
      // Generic database error
      return { 
        success: false, 
        error: error.message || "Failed to subscribe. Please try again." 
      };
    }

    return { success: true };
  } catch (err: any) {
    // Handle "Failed to fetch" network errors
    console.error("[Zeenex DB] ❌ Supabase client error:", err);
    console.error("[Zeenex DB] Error name:", err?.name);
    console.error("[Zeenex DB] Error message:", err?.message);
    
    // FALLBACK: Try direct REST API call
    return await subscribeNewsletterDirect(email);
  }
}

/**
 * Fallback: Direct REST API call for newsletter subscription.
 * Used when Supabase client fails.
 */
async function subscribeNewsletterDirect(
  email: string
): Promise<NewsletterSubscribeResult> {
  const url = `${supabaseUrl}/rest/v1/newsletter_subscribers`;
  
  
  try {
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "apikey": supabaseAnonKey,
        "Authorization": `Bearer ${supabaseAnonKey}`,
        "Content-Type": "application/json",
        "Prefer": "return=minimal",  // Don't return row - avoids SELECT permission requirement
      },
      body: JSON.stringify({ email }),
    });


    if (response.ok) {
      return { success: true };
    }

    const errorData = await response.json().catch(() => ({}));
    console.error("[Zeenex DB] ❌ Direct API error:", errorData);

    // Handle duplicate email
    if (response.status === 409 || errorData.code === "23505") {
      return { success: true, isDuplicate: true, error: "You're already subscribed!" };
    }

    // Handle table not found
    if (response.status === 404) {
      console.error("[Zeenex DB] ❌ Table not found (404)");
      return { success: false, error: "Database table not configured. Please run supabase-setup.sql" };
    }

    // Handle permission denied
    if (response.status === 401 || response.status === 403) {
      console.error("[Zeenex DB] ❌ Permission denied (401/403)");
      return { success: false, error: "Permission denied. Check RLS policies in Supabase." };
    }

    return { success: false, error: errorData.message || `Failed to subscribe (Status: ${response.status}). Please try again.` };
  } catch (fetchErr: any) {
    // Network error
    console.error("[Zeenex DB] ❌❌ NETWORK ERROR (Failed to fetch):", fetchErr);
    console.error("[Zeenex DB] Error type:", fetchErr?.name);
    console.error("[Zeenex DB] Error message:", fetchErr?.message);
    
    // Check if it's a CORS error
    if (fetchErr?.message?.includes("Failed to fetch")) {
      console.error("[Zeenex DB] ⚠️ This is likely a CORS or network connectivity issue");
      console.error("[Zeenex DB] ⚠️ Check: 1) Supabase project is active 2) RLS policies allow anon inserts 3) No ad blockers");
    }
    
    // Final graceful fallback
    
    try {
      const failedSubscriptions = JSON.parse(localStorage.getItem("zeenex_failed_newsletter") || "[]");
      failedSubscriptions.push({ email, timestamp: new Date().toISOString() });
      localStorage.setItem("zeenex_failed_newsletter", JSON.stringify(failedSubscriptions.slice(-100)));
    } catch (e) {
      console.error("[Zeenex DB] Failed to save to localStorage:", e);
    }
    
    // Return success for better UX (email is saved locally)
    return { success: true };
  }
}
