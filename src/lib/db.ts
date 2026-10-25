import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

export const sql = neon(process.env.DATABASE_URL);

export async function getLeadsFromDB() {
  const rows = await sql`
    SELECT * FROM leads 
    ORDER BY created_at DESC
  `;
  return rows;
}

export async function addLeadToDB(data: {
  enquiry_id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  country: string;
  services: string[];
  description: string;
  budget: string;
  deadline: string;
  contact_method: string;
}) {
  const rows = await sql`
    INSERT INTO leads (
      enquiry_id, name, email, phone, company,
      country, services, description, budget,
      deadline, contact_method, status, source
    ) VALUES (
      ${data.enquiry_id},
      ${data.name},
      ${data.email},
      ${data.phone},
      ${data.company},
      ${data.country},
      ${data.services},
      ${data.description},
      ${data.budget},
      ${data.deadline},
      ${data.contact_method},
      'new',
      'website'
    )
    RETURNING *
  `;
  return rows[0];
}

export async function updateLeadStatusInDB(
  id: string,
  status: string,
  notes?: string
) {
  const rows = await sql`
    UPDATE leads 
    SET status = ${status},
        notes = COALESCE(${notes ?? null}, notes),
        updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `;
  return rows[0];
}

export async function getLeadByIdFromDB(id: string) {
  const rows = await sql`
    SELECT * FROM leads WHERE id = ${id}
  `;
  return rows[0] || null;
}

export async function getDashboardStatsFromDB() {
  const rows = await sql`
    SELECT
      COUNT(*) FILTER (WHERE true) as total_leads,
      COUNT(*) FILTER (WHERE status = 'new') as new_leads,
      COUNT(*) FILTER (WHERE status = 'qualified') as qualified_leads,
      COUNT(*) FILTER (WHERE status = 'won') as won_deals,
      COUNT(*) FILTER (WHERE status = 'proposal_sent') as pending_quotes
    FROM leads
  `;
  return {
    total_leads: Number(rows[0].total_leads),
    new_leads: Number(rows[0].new_leads),
    qualified_leads: Number(rows[0].qualified_leads),
    won_deals: Number(rows[0].won_deals),
    pending_quotes: Number(rows[0].pending_quotes),
  };
}