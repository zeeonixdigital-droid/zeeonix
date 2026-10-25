import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/admin/auth';
import { getDashboardStatsFromDB, getLeadsFromDB } from '@/lib/db';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Users, TrendingUp, FileText, CheckCircle } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';

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

export default async function DashboardPage() {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');

  const [stats, allLeads] = await Promise.all([
    getDashboardStatsFromDB(),
    getLeadsFromDB(),
  ]);

  const recentLeads = allLeads.slice(0, 5);

  return (
    <div className="flex min-h-screen bg-brand-navy">
      <AdminSidebar />
      <main className="flex-1 ml-60 p-8">
        <div className="mb-8">
          <h1 className="font-display text-2xl font-bold text-brand-white">
            Dashboard
          </h1>
          <p className="text-brand-muted text-sm mt-1">
            Welcome back, {session.email}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {[
            { label: 'Total Leads', value: stats.total_leads, icon: Users, color: 'text-blue-400' },
            { label: 'New Leads', value: stats.new_leads, icon: TrendingUp, color: 'text-cyan-400' },
            { label: 'Qualified', value: stats.qualified_leads, icon: CheckCircle, color: 'text-violet-400' },
            { label: 'Proposals Sent', value: stats.pending_quotes, icon: FileText, color: 'text-amber-400' },
            { label: 'Won Deals', value: stats.won_deals, icon: CheckCircle, color: 'text-emerald-400' },
          ].map(stat => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="card p-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs text-brand-muted">{stat.label}</p>
                  <Icon size={16} className={stat.color} />
                </div>
                <p className="font-display text-3xl font-bold text-brand-white">
                  {stat.value}
                </p>
              </div>
            );
          })}
        </div>

        {/* Recent Leads */}
        <div className="card overflow-hidden p-0">
          <div className="flex items-center justify-between px-6 py-4 border-b border-brand-border">
            <h2 className="font-semibold text-brand-white">Recent Leads</h2>
            <Link href="/admin/leads" className="text-xs text-brand-blue hover:underline">
              View all
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-brand-border">
                  {['ID', 'Name', 'Email', 'Services', 'Status', 'Date'].map(h => (
                    <th key={h} className="text-left px-6 py-3 text-xs font-medium text-brand-muted">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentLeads.map((lead: Record<string, unknown>) => (
                  <tr
                    key={String(lead.id)}
                    className="border-b border-brand-border/50 hover:bg-brand-card/30 transition-colors"
                  >
                    <td className="px-6 py-3">
                      <span className="font-mono text-xs text-brand-accent">
                        {String(lead.enquiry_id)}
                      </span>
                    </td>
                    <td className="px-6 py-3 font-medium text-brand-white">
                      {String(lead.name)}
                    </td>
                    <td className="px-6 py-3 text-brand-muted">
                      {String(lead.email)}
                    </td>
                    <td className="px-6 py-3 text-brand-muted text-xs">
                      {(lead.services as string[]).slice(0, 2).join(', ')}
                    </td>
                    <td className="px-6 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${STATUS_BADGE[String(lead.status)] || ''}`}>
                        {String(lead.status).replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-brand-muted text-xs whitespace-nowrap">
                      {formatDate(String(lead.created_at))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {recentLeads.length === 0 && (
              <div className="text-center py-12 text-brand-muted text-sm">
                No leads yet. They will appear here when enquiries are submitted.
              </div>
            )}
          </div>
        </div>

        {/* Status */}
        <div className="mt-6 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
          <p className="text-emerald-400 text-xs font-medium mb-1">
            Database Connected
          </p>
          <p className="text-emerald-300/70 text-xs">
            Neon PostgreSQL connected -- leads are now permanently saved.
          </p>
        </div>
      </main>
    </div>
  );
}