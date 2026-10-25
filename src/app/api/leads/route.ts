import { NextRequest, NextResponse } from 'next/server';
import { getAdminSessionFromRequest } from '@/lib/admin/auth';
import { getLeadsFromDB, getDashboardStatsFromDB } from '@/lib/db';

export async function GET(req: NextRequest) {
  const session = await getAdminSessionFromRequest(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');

  try {
    if (type === 'stats') {
      const stats = await getDashboardStatsFromDB();
      return NextResponse.json(stats);
    }

    const leads = await getLeadsFromDB();
    return NextResponse.json({ leads, total: leads.length });

  } catch (error) {
    console.error('[LEADS API ERROR]', error);
    return NextResponse.json(
      { error: 'Failed to fetch leads.' },
      { status: 500 }
    );
  }
}