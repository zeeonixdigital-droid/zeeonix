import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/admin/auth';
import { getLeadsFromDB } from '@/lib/db';
import AdminSidebar from '@/components/admin/AdminSidebar';
import LeadsTable from '@/components/admin/LeadsTable';

export default async function LeadsPage() {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');

  const leads = await getLeadsFromDB();

  return (
    <div className="flex min-h-screen bg-brand-navy">
      <AdminSidebar />
      <main className="flex-1 ml-60 p-8">
        <div className="mb-6">
          <h1 className="font-display text-2xl font-bold text-brand-white">
            Leads & CRM
          </h1>
          <p className="text-brand-muted text-sm mt-1">
            {leads.length} total enquiries -- Neon database se live data
          </p>
        </div>
        <LeadsTable initialLeads={leads as any} />
      </main>
    </div>
  );
}