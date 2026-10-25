'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard, Users, Settings, LogOut, Zap,
  Briefcase, Bell, ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV = [
  { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/leads', icon: Users, label: 'Leads & CRM' },
  { href: '/admin/services-admin', icon: Briefcase, label: 'Services' },
  { href: '/admin/settings', icon: Settings, label: 'Settings' },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <aside className="fixed top-0 left-0 h-full w-60 bg-brand-dark border-r border-brand-border flex flex-col z-40">
      {/* Logo */}
      <div className="p-5 border-b border-brand-border">
        <Link href="/admin/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-blue to-brand-violet flex items-center justify-center">
            <Zap size={16} className="text-white" strokeWidth={2.5} />
          </div>
          <div>
            <p className="font-display font-bold text-sm text-brand-white leading-tight">Zeeonix</p>
            <p className="text-xs text-brand-muted">Admin Portal</p>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {NAV.map(item => {
          const Icon = item.icon;
          const active = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                active
                  ? 'bg-brand-blue/15 text-brand-white border border-brand-blue/25'
                  : 'text-brand-muted hover:text-brand-white hover:bg-brand-card'
              )}
            >
              <Icon size={16} className={active ? 'text-brand-blue' : ''} />
              {item.label}
              {active && <ChevronRight size={14} className="ml-auto text-brand-blue" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-brand-border">
        <Link href="/" target="_blank" className="flex items-center gap-2 text-xs text-brand-muted hover:text-brand-white mb-3 transition-colors">
          View Website
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-brand-muted hover:text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut size={15} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
