import type { Lead, LeadStatus } from '@/types';

/**
 * Temporary in-memory lead store.
 * Phase 4 will replace this with Supabase PostgreSQL.
 * Data resets on server restart -- use only for development.
 */

const leads: Lead[] = [
  {
    id: '1',
    enquiry_id: 'ZX-DEMO-001',
    name: 'Rahul Sharma',
    email: 'rahul@example.com',
    phone: '+91 98765 43210',
    company: 'Sharma Enterprises',
    country: 'India',
    services: ['digital-marketing', 'seo'],
    description: 'We need help improving our Google rankings and running Meta Ads for our clothing brand.',
    budget: '5000-15000',
    deadline: '1-month',
    contact_method: 'whatsapp',
    status: 'new',
    source: 'website',
    notes: '',
    created_at: new Date(Date.now() - 86400000).toISOString(),
    updated_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '2',
    enquiry_id: 'ZX-DEMO-002',
    name: 'Priya Patel',
    email: 'priya@startupco.in',
    phone: '+91 87654 32109',
    company: 'StartupCo',
    country: 'India',
    services: ['website-development', 'ai-services'],
    description: 'Looking for a professional business website and an AI chatbot for lead capture.',
    budget: '15000-50000',
    deadline: '2-3-months',
    contact_method: 'email',
    status: 'qualified',
    source: 'website',
    notes: 'High potential -- has clear budget and timeline.',
    created_at: new Date(Date.now() - 172800000).toISOString(),
    updated_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '3',
    enquiry_id: 'ZX-DEMO-003',
    name: 'Ahmed Al-Rashid',
    email: 'ahmed@businessuae.com',
    phone: '+971 50 123 4567',
    company: 'Al-Rashid Trading',
    country: 'UAE',
    services: ['ecommerce', 'digital-marketing'],
    description: 'Want to set up an online store and run Google Ads for our trading company.',
    budget: 'above-50000',
    deadline: '1-month',
    contact_method: 'video-call',
    status: 'proposal_sent',
    source: 'website',
    notes: 'Proposal sent on ' + new Date(Date.now() - 43200000).toISOString(),
    created_at: new Date(Date.now() - 259200000).toISOString(),
    updated_at: new Date(Date.now() - 43200000).toISOString(),
  },
];

let nextId = 4;

export function getAllLeads(): Lead[] {
  return [...leads].sort((a, b) =>
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export function getLeadById(id: string): Lead | undefined {
  return leads.find(l => l.id === id);
}

export function addLead(data: Omit<Lead, 'id' | 'updated_at'>): Lead {
  const lead: Lead = {
    ...data,
    id: String(nextId++),
    updated_at: new Date().toISOString(),
  };
  leads.unshift(lead);
  return lead;
}

export function updateLeadStatus(id: string, status: LeadStatus, notes?: string): Lead | null {
  const idx = leads.findIndex(l => l.id === id);
  if (idx === -1) return null;
  leads[idx] = {
    ...leads[idx],
    status,
    notes: notes ?? leads[idx].notes,
    updated_at: new Date().toISOString(),
  };
  return leads[idx];
}

export function getDashboardStats() {
  return {
    total_leads: leads.length,
    new_leads: leads.filter(l => l.status === 'new').length,
    qualified_leads: leads.filter(l => l.status === 'qualified').length,
    won_deals: leads.filter(l => l.status === 'won').length,
    pending_quotes: leads.filter(l => l.status === 'proposal_sent').length,
  };
}
