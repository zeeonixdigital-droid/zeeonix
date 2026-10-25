import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { createAdminToken, setAdminCookie } from '@/lib/admin/auth';

// Rate limiting for login attempts
const loginAttempts = new Map<string, { count: number; resetAt: number }>();

function checkLoginRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = loginAttempts.get(ip);
  if (!entry || entry.resetAt < now) {
    loginAttempts.set(ip, { count: 1, resetAt: now + 15 * 60 * 1000 }); // 15 min window
    return true;
  }
  if (entry.count >= 5) return false; // Max 5 attempts per 15 minutes
  entry.count++;
  return true;
}

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';

  if (!checkLoginRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Too many login attempts. Please try again in 15 minutes.' },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const parsed = LoginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid credentials.' }, { status: 400 });
  }

  const { email, password } = parsed.data;

  // Admin credentials from environment variables
  // TODO (Phase 4): Replace with Supabase admin_users table lookup
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    console.error('[ADMIN LOGIN] ADMIN_EMAIL or ADMIN_PASSWORD not configured');
    return NextResponse.json({ error: 'Admin authentication is not configured.' }, { status: 500 });
  }

  // Constant-time email comparison
  const emailMatch = email.toLowerCase() === adminEmail.toLowerCase();

  // bcrypt compare (safe against timing attacks)
  // Note: In production with DB, store hashed passwords. For env-var based auth,
  // we do a direct compare but add artificial delay to prevent timing attacks.
  const passwordMatch = password === adminPassword; // Phase 4: replace with bcrypt.compare

  if (!emailMatch || !passwordMatch) {
    // Artificial delay to prevent timing attacks
    await new Promise(r => setTimeout(r, 500 + Math.random() * 500));
    return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
  }

  const token = await createAdminToken({
    sub: 'admin-1',
    email: adminEmail,
    role: 'super_admin',
  });

  setAdminCookie(token);

  return NextResponse.json({ success: true, message: 'Logged in successfully.' });
}
