import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/admin/auth';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This layout wraps /admin/* EXCEPT /admin/login
  // The login page handles its own rendering
  return <>{children}</>;
}
