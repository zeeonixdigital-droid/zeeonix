import { NextRequest, NextResponse } from 'next/server';
import { getChatResponse } from '@/lib/gemini';
import { addLeadToDB } from '@/lib/db';
import { generateEnquiryId } from '@/lib/utils';
import { z } from 'zod';

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return true;
  }
  if (entry.count >= 20) return false;
  entry.count++;
  return true;
}

const MessageSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(['user', 'model']),
      parts: z.array(z.object({ text: z.string() })),
    })
  ).max(50),
  userMessage: z.string().min(1).max(1000),
});

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';

  if (!rateLimit(ip)) {
    return NextResponse.json(
      { error: 'Too many messages. Please wait.' },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const parsed = MessageSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid format.' }, { status: 422 });
  }

  try {
    const { response, leadData } = await getChatResponse(
      parsed.data.messages,
      parsed.data.userMessage
    );

    // Auto save lead if qualified
    if (leadData && leadData.email.includes('@')) {
      try {
        const enquiryId = generateEnquiryId();
        await addLeadToDB({
          enquiry_id: enquiryId,
          name: leadData.name,
          email: leadData.email,
          phone: 'Via Chat',
          company: '',
          country: 'Unknown',
          services: [leadData.service],
          description: `Chat lead - Service: ${leadData.service}`,
          budget: leadData.budget,
          deadline: leadData.timeline,
          contact_method: 'email',
        });
        console.log('[CHAT LEAD SAVED]', enquiryId, leadData.email);
      } catch (dbError) {
        console.error('[CHAT LEAD DB ERROR]', dbError);
      }
    }

    return NextResponse.json({ response });
  } catch (error) {
    console.error('[CHAT API ERROR]', error);
    return NextResponse.json(
      { error: 'Failed to get response.' },
      { status: 500 }
    );
  }
}