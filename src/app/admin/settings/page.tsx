import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/admin/auth';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { User, Database, Bot, Mail, Shield, Globe } from 'lucide-react';

export default async function AdminSettingsPage() {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');

  return (
    <div className="flex min-h-screen bg-brand-navy">
      <AdminSidebar />
      <main className="flex-1 ml-60 p-8">
        <div className="mb-6">
          <h1 className="font-display text-2xl font-bold text-brand-white">
            Settings
          </h1>
          <p className="text-brand-muted text-sm mt-1">
            System configuration and status
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <User size={16} className="text-blue-400" />
              </div>
              <h2 className="font-semibold text-brand-white">Admin Account</h2>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-brand-muted">Email</span>
                <span className="text-brand-white">{session.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-muted">Role</span>
                <span className="text-emerald-400 capitalize">{session.role}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-muted">Password</span>
                <span className="text-brand-muted">Set via .env.local</span>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <Database size={16} className="text-emerald-400" />
              </div>
              <h2 className="font-semibold text-brand-white">Database</h2>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-brand-muted">Provider</span>
                <span className="text-brand-white">Neon PostgreSQL</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-muted">Region</span>
                <span className="text-brand-white">Singapore</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-muted">Status</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Connected
                </span>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                <Bot size={16} className="text-violet-400" />
              </div>
              <h2 className="font-semibold text-brand-white">AI Chatbot</h2>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-brand-muted">Provider</span>
                <span className="text-brand-white">Groq API</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-muted">Model</span>
                <span className="text-brand-white">qwen/qwen3.8-27b</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-muted">Assistant</span>
                <span className="text-brand-white">Zara</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-muted">Languages</span>
                <span className="text-brand-white">15+</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-muted">Status</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Active
                </span>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                <Mail size={16} className="text-amber-400" />
              </div>
              <h2 className="font-semibold text-brand-white">
                Email Notifications
              </h2>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-brand-muted">Provider</span>
                <span className="text-brand-white">Resend</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-muted">Status</span>
                <span className="text-amber-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  Phase 7 -- Pending
                </span>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <Shield size={16} className="text-red-400" />
              </div>
              <h2 className="font-semibold text-brand-white">Security</h2>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-brand-muted">Auth Method</span>
                <span className="text-brand-white">JWT Tokens</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-muted">Session</span>
                <span className="text-brand-white">8 hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-muted">Rate Limiting</span>
                <span className="text-emerald-400">Active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-muted">HTTPS</span>
                <span className="text-amber-400">After deployment</span>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                <Globe size={16} className="text-cyan-400" />
              </div>
              <h2 className="font-semibold text-brand-white">Website</h2>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-brand-muted">Framework</span>
                <span className="text-brand-white">Next.js 14</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-muted">Domain</span>
                <span className="text-brand-white">zeeonix.com</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-muted">Hosting</span>
                <span className="text-amber-400">Phase 9 -- Pending</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-muted">Status</span>
                <span className="text-amber-400">Local only</span>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}