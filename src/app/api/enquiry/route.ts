import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { generateEnquiryId } from '@/lib/utils';
import { addLeadToDB } from '@/lib/db';
import {
  sendLeadNotificationEmail,
  sendCustomerConfirmationEmail,
} from '@/lib/email';

export const runtime = 'nodejs';

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function rateLimit(ip: string, limit = 3, windowMs = 60_000): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (entry.count >= limit) return false;
  entry.count++;
  return true;
}

const EnquirySchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254).toLowerCase(),
  phone: z.string().min(7).max(20).regex(/^[+\d\s\-()]+$/),
  company: z.string().max(100).optional().default(''),
  country: z.string().min(1).max(100),
  services: z.array(z.string().max(100)).min(1).max(20),
  description: z.string().trim().min(20).max(2000),
  budget: z.string().min(1).max(50),
  deadline: z.string().min(1).max(50),
  contact_method: z.string().min(1).max(20),
  consent: z.literal(true),
});

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (!rateLimit(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait before trying again.' },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body.' },
      { status: 400 }
    );
  }

  const parsed = EnquirySchema.safeParse(body);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0];
    return NextResponse.json(
      { error: firstError?.message ?? 'Validation failed.' },
      { status: 422 }
    );
  }

  const data = parsed.data;
  const enquiryId = generateEnquiryId();

  // Step 1 -- Save to database
  try {
    await addLeadToDB({
      enquiry_id: enquiryId,
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company || '',
      country: data.country,
      services: data.services,
      description: data.description,
      budget: data.budget,
      deadline: data.deadline,
      contact_method: data.contact_method,
    });
  } catch (error) {
    console.error('[ENQUIRY DB ERROR]', error);
    return NextResponse.json(
      { error: 'Failed to save enquiry. Please try again.' },
      { status: 500 }
    );
  }

  console.log('[NEW ENQUIRY SAVED TO DB]', enquiryId);

  // Step 2 -- Send emails (failures do not affect saved enquiry)
  const [adminEmailResult, customerEmailResult] = await Promise.allSettled([
    sendLeadNotificationEmail({
      enquiry_id: enquiryId,
      name: escapeHtml(data.name),
      email: data.email,
      phone: escapeHtml(data.phone),
      services: data.services.map(escapeHtml),
      description: escapeHtml(data.description),
      budget: escapeHtml(data.budget),
      deadline: escapeHtml(data.deadline),
      source: 'website-form',
    }),
    sendCustomerConfirmationEmail({
      name: escapeHtml(data.name),
      email: data.email,
      enquiry_id: enquiryId,
      services: data.services.map(escapeHtml),
    }),
  ]);

  if (adminEmailResult.status === 'rejected') {
    console.error('[ADMIN EMAIL FAILED]', adminEmailResult.reason);
  }
  if (customerEmailResult.status === 'rejected') {
    console.error('[CUSTOMER EMAIL FAILED]', customerEmailResult.reason);
  }

  return NextResponse.json(
    {
      success: true,
      enquiryId,
      message:
        'Your enquiry has been received. Our team will review it and contact you shortly.',
    },
    { status: 201 }
  );
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed.' },
    { status: 405 }
  );
}