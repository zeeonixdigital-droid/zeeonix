const FROM_EMAIL = process.env.FROM_EMAIL || 'zeeonixdigital@gmail.com';
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || 'zeeonixdigital@gmail.com';
const BREVO_API_KEY = process.env.BREVO_API_KEY || '';

async function sendEmail(subject: string, htmlContent: string, toEmail: string, toName: string) {
  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'api-key': BREVO_API_KEY,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      sender: { name: 'Zeeonix Digital', email: FROM_EMAIL },
      to: [{ email: toEmail, name: toName }],
      subject: subject,
      htmlContent: htmlContent,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Brevo API error: ${response.status} -- ${error}`);
  }

  return response.json();
}

export async function sendLeadNotificationEmail(lead: {
  enquiry_id: string;
  name: string;
  email: string;
  phone: string;
  services: string[];
  description: string;
  budget: string;
  deadline: string;
  source: string;
}) {
  try {
    await sendEmail(
      `New Lead: ${lead.name} -- ${lead.enquiry_id}`,
      `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #2563EB, #7C3AED); padding: 30px; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">New Lead Received!</h1>
          <p style="color: rgba(255,255,255,0.8); margin: 5px 0 0 0;">Zeeonix Digital CRM</p>
        </div>
        <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 12px 0; color: #64748b; width: 40%;">Enquiry ID</td>
              <td style="padding: 12px 0; font-weight: bold; color: #2563EB;">${lead.enquiry_id}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 12px 0; color: #64748b;">Name</td>
              <td style="padding: 12px 0; font-weight: bold;">${lead.name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 12px 0; color: #64748b;">Email</td>
              <td style="padding: 12px 0;">${lead.email}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 12px 0; color: #64748b;">Phone</td>
              <td style="padding: 12px 0;">${lead.phone}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 12px 0; color: #64748b;">Services</td>
              <td style="padding: 12px 0;">${lead.services.join(', ')}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 12px 0; color: #64748b;">Budget</td>
              <td style="padding: 12px 0;">${lead.budget}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 12px 0; color: #64748b;">Deadline</td>
              <td style="padding: 12px 0;">${lead.deadline}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 12px 0; color: #64748b;">Source</td>
              <td style="padding: 12px 0;">${lead.source}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #64748b;">Description</td>
              <td style="padding: 12px 0;">${lead.description}</td>
            </tr>
          </table>
          <div style="margin-top: 25px; text-align: center;">
            <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/admin/dashboard"
               style="background: linear-gradient(135deg, #2563EB, #7C3AED); color: white; padding: 12px 30px; border-radius: 8px; text-decoration: none; font-weight: bold;">
              View in Dashboard
            </a>
          </div>
          <p style="color: #94a3b8; font-size: 12px; text-align: center; margin-top: 20px;">
            Zeeonix Digital -- AI Powered Agency
          </p>
        </div>
      </div>
      `,
      NOTIFICATION_EMAIL,
      'Zeeonix Admin'
    );
    console.log('[EMAIL SENT] Lead notification:', lead.enquiry_id);
    return true;
  } catch (error) {
    console.error('[EMAIL ERROR] Lead notification:', error);
    return false;
  }
}

export async function sendCustomerConfirmationEmail(customer: {
  name: string;
  email: string;
  enquiry_id: string;
  services: string[];
}) {
  try {
    await sendEmail(
      `Enquiry Received -- ${customer.enquiry_id} | Zeeonix Digital`,
      `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #2563EB, #7C3AED); padding: 30px; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Thank You, ${customer.name}!</h1>
          <p style="color: rgba(255,255,255,0.8); margin: 5px 0 0 0;">We have received your enquiry</p>
        </div>
        <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px;">
          <p style="color: #334155; font-size: 16px;">
            Thank you for contacting Zeeonix Digital. We have received your enquiry and our team will review it shortly.
          </p>
          <div style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <h3 style="color: #1e293b; margin: 0 0 15px 0;">Your Enquiry Details</h3>
            <p style="margin: 5px 0; color: #64748b;">
              <strong>Enquiry ID:</strong>
              <span style="color: #2563EB; font-weight: bold;">${customer.enquiry_id}</span>
            </p>
            <p style="margin: 5px 0; color: #64748b;">
              <strong>Services:</strong> ${customer.services.join(', ')}
            </p>
          </div>
          <div style="background: #eff6ff; border-left: 4px solid #2563EB; padding: 15px; border-radius: 0 8px 8px 0; margin: 20px 0;">
            <p style="margin: 0; color: #1e40af; font-size: 14px;">
              <strong>What happens next?</strong><br/>
              Our team will review your requirements and contact you with a custom proposal.
            </p>
          </div>
          <p style="color: #64748b; font-size: 14px;">
            Questions? Email us at
            <a href="mailto:${FROM_EMAIL}" style="color: #2563EB;">${FROM_EMAIL}</a>
          </p>
          <p style="color: #94a3b8; font-size: 12px; text-align: center; margin-top: 20px; border-top: 1px solid #e2e8f0; padding-top: 15px;">
            Zeeonix Digital -- AI Powered Digital Agency
          </p>
        </div>
      </div>
      `,
      customer.email,
      customer.name
    );
    console.log('[EMAIL SENT] Confirmation to customer:', customer.email);
    return true;
  } catch (error) {
    console.error('[EMAIL ERROR] Customer confirmation:', error);
    return false;
  }
}