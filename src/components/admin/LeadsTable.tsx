'use client';
import { useState } from 'react';
import type { Lead, LeadStatus } from '@/types';
import { formatDate } from '@/lib/utils';
import { ChevronDown, Search, Filter } from 'lucide-react';

const STATUS_OPTIONS: { value: LeadStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All Statuses' },
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'qualified', label: 'Qualified' },
  { value: 'proposal_sent', label: 'Proposal Sent' },
  { value: 'negotiation', label: 'Negotiation' },
  { value: 'awaiting_payment', label: 'Awaiting Payment' },
  { value: 'won', label: 'Won' },
  { value: 'lost', label: 'Lost' },
  { value: 'on_hold', label: 'On Hold' },
];

const STATUS_BADGE: Record<string, string> = {
  new: 'bg-blue-500/15 text-blue-400 border-blue-500/25',
  contacted: 'bg-sky-500/15 text-sky-400 border-sky-500/25',
  qualified: 'bg-violet-500/15 text-violet-400 border-violet-500/25',
  proposal_sent: 'bg-amber-500/15 text-amber-400 border-amber-500/25',
  negotiation: 'bg-orange-500/15 text-orange-400 border-orange-500/25',
  awaiting_payment: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/25',
  won: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
  lost: 'bg-red-500/15 text-red-400 border-red-500/25',
  on_hold: 'bg-gray-500/15 text-gray-400 border-gray-500/25',
};

export default function LeadsTable({ initialLeads }: { initialLeads: Lead[] }) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  const filtered = leads.filter(l => {
    const matchSearch = search === '' ||
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.email.toLowerCase().includes(search.toLowerCase()) ||
      l.enquiry_id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || l.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleStatusChange = async (lead: Lead, newStatus: LeadStatus) => {
    setUpdating(lead.id);
    try {
      const res = await fetch(`/api/leads/${lead.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        const { lead: updated } = await res.json();
        setLeads(prev => prev.map(l => l.id === updated.id ? updated : l));
      }
    } catch {
      // silent fail -- user sees no change
    } finally {
      setUpdating(null);
    }
  };

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
          <input
            className="input-field pl-9 text-sm"
            placeholder="Search by name, email, or ID..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="relative">
          <Filter size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
          <select
            className="input-field pl-9 text-sm pr-8"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            {STATUS_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-border">
                {['ID', 'Name', 'Contact', 'Services', 'Budget', 'Status', 'Date', ''].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-medium text-brand-muted whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(lead => (
                <>
                  <tr
                    key={lead.id}
                    className="border-b border-brand-border/50 hover:bg-brand-card/30 transition-colors cursor-pointer"
                    onClick={() => setExpandedId(expandedId === lead.id ? null : lead.id)}
                  >
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs text-brand-accent">{lead.enquiry_id}</span>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-brand-white">{lead.name}</p>
                      {lead.company && <p className="text-xs text-brand-muted">{lead.company}</p>}
                    </td>
                    <td className="px-4 py-3 text-brand-muted text-xs">
                      <p>{lead.email}</p>
                      <p>{lead.phone}</p>
                    </td>
                    <td className="px-4 py-3 text-brand-muted text-xs">
                      {lead.services.slice(0, 2).join(', ')}
                      {lead.services.length > 2 && <span className="text-brand-muted"> +{lead.services.length - 2}</span>}
                    </td>
                    <td className="px-4 py-3 text-brand-muted text-xs whitespace-nowrap">{lead.budget}</td>
                    <td className="px-4 py-3">
                      <select
                        className={`text-xs px-2 py-1 rounded-full border cursor-pointer bg-transparent transition-colors ${STATUS_BADGE[lead.status] || ''}`}
                        value={lead.status}
                        disabled={updating === lead.id}
                        onClick={e => e.stopPropagation()}
                        onChange={e => handleStatusChange(lead, e.target.value as LeadStatus)}
                      >
                        {STATUS_OPTIONS.filter(o => o.value !== 'all').map(o => (
                          <option key={o.value} value={o.value} className="bg-brand-dark text-brand-white">
                            {o.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 text-brand-muted text-xs whitespace-nowrap">
                      {formatDate(lead.created_at)}
                    </td>
                    <td className="px-4 py-3">
                      <ChevronDown
                        size={14}
                        className={`text-brand-muted transition-transform ${expandedId === lead.id ? 'rotate-180' : ''}`}
                      />
                    </td>
                  </tr>
                  {expandedId === lead.id && (
                    <tr key={lead.id + '-detail'} className="bg-brand-card/20 border-b border-brand-border">
                      <td colSpan={8} className="px-6 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-brand-muted text-xs mb-1">Project Description</p>
                            <p className="text-brand-light">{lead.description}</p>
                          </div>
                          <div className="space-y-2">
                            <div>
                              <span className="text-brand-muted text-xs">Country: </span>
                              <span className="text-brand-light text-xs">{lead.country}</span>
                            </div>
                            <div>
                              <span className="text-brand-muted text-xs">Deadline: </span>
                              <span className="text-brand-light text-xs">{lead.deadline}</span>
                            </div>
                            <div>
                              <span className="text-brand-muted text-xs">Contact via: </span>
                              <span className="text-brand-light text-xs">{lead.contact_method}</span>
                            </div>
                            {lead.notes && (
                              <div>
                                <span className="text-brand-muted text-xs">Notes: </span>
                                <span className="text-brand-light text-xs">{lead.notes}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-brand-muted text-sm">
              {search || statusFilter !== 'all' ? 'No leads match your filters.' : 'No leads yet.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
