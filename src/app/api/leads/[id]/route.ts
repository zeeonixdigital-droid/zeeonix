import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getAdminSessionFromRequest } from '@/lib/admin/auth';
import { updateLeadStatusInDB, getLeadByIdFromDB } from '@/lib/db';

const UpdateSchema = z.object({
  status: z.enum([
    'new', 'contacted', 'qualified', 'proposal_sent',
    'negotiation', 'awaiting_payment', 'won', 'lost', 'on_hold'
  ]),
  notes: z.string().max(1000).optional(),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await getAdminSessionFromRequest(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid body.' }, { status: 400 });
  }

  const parsed = UpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed.' }, { status: 422 });
  }

  try {
    const updated = await updateLeadStatusInDB(
      id,
      parsed.data.status,
      parsed.data.notes
    );

    if (!updated) {
      return NextResponse.json({ error: 'Lead not found.' }, { status: 404 });
    }

    return NextResponse.json({ lead: updated });

  } catch (error) {
    console.error('[LEAD UPDATE ERROR]', error);
    return NextResponse.json(
      { error: 'Failed to update lead.' },
      { status: 500 }
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await getAdminSessionFromRequest(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 });
  }

  try {
    const lead = await getLeadByIdFromDB(id);
    if (!lead) {
      return NextResponse.json({ error: 'Lead not found.' }, { status: 404 });
    }
    return NextResponse.json({ lead });

  } catch (error) {
    console.error('[LEAD GET ERROR]', error);
    return NextResponse.json(
      { error: 'Failed to fetch lead.' },
      { status: 500 }
    );
  }
}