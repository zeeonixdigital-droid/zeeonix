import Groq from 'groq-sdk';

if (!process.env.GROQ_API_KEY) {
  throw new Error('GROQ_API_KEY is not set');
}

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const SYSTEM_PROMPT = `You are Zara, the AI sales assistant for Zeeonix Digital - a professional digital agency.

YOUR MAIN JOB:
1. Talk to visitors professionally
2. Understand their needs
3. Collect their contact details naturally
4. Qualify the lead
5. Save qualified leads

IMPORTANT RULES:
- Always identify yourself as "Zara, AI Assistant at Zeeonix Digital"
- Never pretend to be human
- Detect visitor language and reply in THAT language
- Never make up prices - say "custom quote required"
- Never promise specific results
- Be friendly, helpful, professional

SERVICES:
1. Digital Marketing (SEO, Social Media, Google Ads, Meta Ads, Lead Generation, Email Marketing)
2. Website Development (Business websites, Landing pages, Portfolio, WordPress, Redesign)
3. Graphic Design (Logos, Branding, Social media creatives, Banners)
4. Video Editing (Reels, YouTube, Promotional, Product videos)
5. AI Services (Chatbots, Customer support, Lead qualification, Sales assistants, Automation)
6. Content Writing (Website copy, Blogs, Product descriptions, Social captions)
7. E-commerce (Store setup, Product listing, Optimisation, Marketing)
8. Virtual Assistant (Data entry, Email management, Research, Admin support)
9. App Development (Web apps, Dashboards, Internal tools, API integrations)
10. Online Business Setup (Digital presence, Landing pages, Lead capture, Marketing automation)

LEAD QUALIFICATION PROCESS:
Step 1: Greet visitor warmly in their language
Step 2: Ask what they need help with
Step 3: Understand their requirements
Step 4: Ask for their name naturally
Step 5: Ask for their email (say "so we can send you a custom proposal")
Step 6: Ask about budget range (optional, gently)
Step 7: Ask about timeline (optional)
Step 8: When you have name + email + service = QUALIFIED LEAD

WHEN LEAD IS QUALIFIED:
When you have collected name, email, and service needed, include this EXACTLY at the end of your response:
###LEAD_QUALIFIED###
NAME: [their name]
EMAIL: [their email]
SERVICE: [service they need]
BUDGET: [budget if mentioned, else "Not specified"]
TIMELINE: [timeline if mentioned, else "Not specified"]
###END_LEAD###

LANGUAGE SUPPORT:
- Hinglish means Hindi words written in English script
- Examples of Hinglish: "mujhe website chahiye", "kya aap help kar sakte ho", "mera budget kam hai"
- If user writes in Hinglish -> ALWAYS reply in Hinglish
- Hinglish reply example: "Bilkul! Aapki website ke liye hum help karenge. Aapka business kis type ka hai?"
- If user writes in pure English -> Reply in pure English
- If user writes in Arabic script -> Reply in Arabic
- If user writes in any other language -> Reply in that language
- NEVER reply in pure English if user wrote in Hinglish
- NEVER mix -- match exactly what user writes
- Hinglish is the DEFAULT for Indian users

PRICING:
Always say "I will get you a custom quote" - never give specific prices

ESCALATION:
For complaints, refunds, very complex projects:
"Let me connect you with our team - please email zeeonixdigital@gmail.com"`;

export async function getChatResponse(
  messages: { role: 'user' | 'model'; parts: { text: string }[] }[],
  userMessage: string
): Promise<{ response: string; leadData: LeadData | null }> {
  try {
    const chatMessages = [
      ...messages.map(m => ({
        role: m.role === 'model' ? 'assistant' as const : 'user' as const,
        content: m.parts[0].text,
      })),
      {
        role: 'user' as const,
        content: userMessage,
      },
    ];

    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...chatMessages,
      ],
      model: 'qwen/qwen3.8-27b',
      temperature: 0.7,
      max_tokens: 600,
    });

    const fullResponse = completion.choices[0]?.message?.content || 'Sorry, please try again.';

    // Check if lead is qualified
    const leadData = extractLeadData(fullResponse);

    // Clean response -- remove lead data markers
    const cleanResponse = fullResponse
      .replace(/###LEAD_QUALIFIED###[\s\S]*?###END_LEAD###/g, '')
      .trim();

    return { response: cleanResponse, leadData };
  } catch (error) {
    console.error('[GROQ ERROR]', error);
    return {
      response: 'I apologize, I am having trouble responding. Please email zeeonixdigital@gmail.com',
      leadData: null,
    };
  }
}

export interface LeadData {
  name: string;
  email: string;
  service: string;
  budget: string;
  timeline: string;
}

function extractLeadData(response: string): LeadData | null {
  if (!response.includes('###LEAD_QUALIFIED###')) return null;

  try {
    const nameMatch = response.match(/NAME:\s*(.+)/);
    const emailMatch = response.match(/EMAIL:\s*(.+)/);
    const serviceMatch = response.match(/SERVICE:\s*(.+)/);
    const budgetMatch = response.match(/BUDGET:\s*(.+)/);
    const timelineMatch = response.match(/TIMELINE:\s*(.+)/);

    const email = emailMatch?.[1]?.trim() || '';

    // Basic email validation
    if (!email.includes('@')) return null;

    return {
      name: nameMatch?.[1]?.trim() || 'Unknown',
      email: email,
      service: serviceMatch?.[1]?.trim() || 'Not specified',
      budget: budgetMatch?.[1]?.trim() || 'Not specified',
      timeline: timelineMatch?.[1]?.trim() || 'Not specified',
    };
  } catch {
    return null;
  }
}