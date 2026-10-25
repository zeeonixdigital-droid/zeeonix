// ─── Service Types ───────────────────────────────────────────────────────────
export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  features: string[];
  category: ServiceCategory;
  isActive: boolean;
}

export type ServiceCategory =
  | 'digital-marketing'
  | 'website-development'
  | 'graphic-design'
  | 'video-editing'
  | 'ai-services'
  | 'content-writing'
  | 'ecommerce'
  | 'virtual-assistant'
  | 'app-development'
  | 'online-business-setup';

// ─── Lead / Enquiry Types ────────────────────────────────────────────────────
export type LeadStatus =
  | 'new'
  | 'contacted'
  | 'qualified'
  | 'proposal_sent'
  | 'negotiation'
  | 'awaiting_payment'
  | 'won'
  | 'lost'
  | 'on_hold';

export interface Lead {
  id: string;
  enquiry_id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  country: string;
  services: string[];
  description: string;
  budget: string;
  deadline: string;
  contact_method: string;
  status: LeadStatus;
  source: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface EnquiryFormData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  country: string;
  services: string[];
  description: string;
  budget: string;
  deadline: string;
  contact_method: string;
  consent: boolean;
}

// ─── Chat Types ───────────────────────────────────────────────────────────────
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

// ─── Admin Types ──────────────────────────────────────────────────────────────
export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'super_admin' | 'admin';
}

export interface DashboardStats {
  total_leads: number;
  new_leads: number;
  qualified_leads: number;
  won_deals: number;
  pending_quotes: number;
}
