import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/admin/auth';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { SERVICE_GROUPS } from '@/lib/services-data';
import { CheckCircle } from 'lucide-react';

export default async function AdminServicesPage() {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');

  return (
    <div className="flex min-h-screen bg-brand-navy">
      <AdminSidebar />
      <main className="flex-1 ml-60 p-8">
        <div className="mb-6">
          <h1 className="font-display text-2xl font-bold text-brand-white">
            Services Management
          </h1>
          <p className="text-brand-muted text-sm mt-1">
            {SERVICE_GROUPS.length} service categories configured
          </p>
        </div>

        <div className="space-y-4">
          {SERVICE_GROUPS.map(group => (
            <div key={group.id} className="card">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-semibold text-brand-white">
                    {group.title}
                  </h2>
                  <p className="text-brand-muted text-xs mt-0.5">
                    {group.tagline}
                  </p>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  Active
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {group.services.map(svc => (
                  <div key={svc.id} className="flex items-start gap-2 p-3 rounded-lg bg-brand-dark border border-brand-border">
                    <CheckCircle size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-brand-white text-xs font-medium">{svc.name}</p>
                      <p className="text-brand-muted text-xs mt-0.5 line-clamp-1">{svc.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 rounded-lg bg-brand-card border border-brand-border">
          <p className="text-brand-muted text-xs">
            Services edit karne ke liye: src/lib/services-data.ts file use karein.
            UI editor next update mein aayega.
          </p>
        </div>
      </main>
    </div>
  );
}