# Zeeonix Digital -- Website & AI Sales Automation Platform

A full-stack, production-oriented website and lead management system for Zeeonix Digital agency.

---

## Table of Contents
1. [What Has Been Built](#what-has-been-built)
2. [Project Structure](#project-structure)
3. [Quick Start (Local Development)](#quick-start-local-development)
4. [Environment Variables](#environment-variables)
5. [GitHub Setup](#github-setup)
6. [Deployment to Vercel](#deployment-to-vercel)
7. [Custom Domain & DNS](#custom-domain--dns)
8. [Admin Portal](#admin-portal)
9. [Development Phases](#development-phases)
10. [Known Limitations](#known-limitations)
11. [Security Checklist](#security-checklist)
12. [Testing Checklist](#testing-checklist)

---

## What Has Been Built

### Phase 1-2: Frontend & Pages (COMPLETE)
- Home page with Hero, Services Overview, Why Us, How It Works, FAQ, Contact Form
- Services listing page + 10 individual service category pages (auto-generated)
- About, Portfolio, Pricing, FAQ, Contact pages
- Privacy Policy and Terms & Conditions
- Custom 404 page
- Responsive navbar and footer
- SEO: sitemap.xml, robots.txt, Open Graph metadata, semantic HTML
- Dark navy/blue/violet design system with Tailwind CSS

### Phase 3: Lead Capture (COMPLETE)
- Enquiry form with full client + server-side validation (Zod)
- Rate limiting (5 requests/minute per IP)
- Spam protection, duplicate prevention
- Unique enquiry ID generation (format: ZX-XXXXX-XXXX)
- Consent checkbox tied to Privacy Policy
- Success/error state with user feedback

### Phase 4a: Admin Auth (COMPLETE - env-var based)
- Secure admin login with JWT sessions (8-hour expiry)
- HttpOnly, Secure cookies
- Login rate limiting (5 attempts per 15 minutes)
- Protected admin routes with server-side auth checks

### Phase 5: Admin Dashboard & CRM (COMPLETE - in-memory)
- Dashboard with stats: total leads, new, qualified, proposals, won
- Leads table with search and status filtering
- Click-to-expand lead detail view
- Inline status update (New -> Contacted -> Qualified -> Won etc.)
- 9 lead statuses with colour-coded badges

---

## Project Structure

```
zeeonix/
|- src/
|  |- app/                   # Next.js App Router pages
|  |  |- page.tsx            # Home page
|  |  |- layout.tsx          # Root layout + metadata
|  |  |- about/
|  |  |- contact/
|  |  |- faq/
|  |  |- portfolio/
|  |  |- pricing/
|  |  |- privacy-policy/
|  |  |- terms/
|  |  |- services/
|  |  |  |- page.tsx         # Services listing
|  |  |  |- [category]/      # Individual service pages (auto-generated)
|  |  |- admin/
|  |  |  |- login/           # Admin login
|  |  |  |- dashboard/       # Dashboard with stats
|  |  |  |- leads/           # CRM lead management
|  |  |- api/
|  |     |- enquiry/         # POST /api/enquiry -- save lead
|  |     |- admin/login/     # POST /api/admin/login
|  |     |- admin/logout/    # POST /api/admin/logout
|  |     |- leads/           # GET /api/leads, PATCH /api/leads/[id]
|  |- components/
|  |  |- layout/             # Navbar, Footer
|  |  |- sections/           # Hero, ServicesOverview, WhyUs, HowItWorks, FAQ, Contact
|  |  |- admin/              # AdminSidebar, LeadsTable
|  |- lib/
|  |  |- services-data.ts    # All service definitions, options
|  |  |- utils.ts            # Helper functions
|  |  |- admin/
|  |     |- auth.ts          # JWT session management
|  |     |- lead-store.ts    # In-memory lead store (Phase 4: -> Supabase)
|  |- styles/
|  |  |- globals.css         # Tailwind + design tokens
|  |- types/
|     |- index.ts            # TypeScript interfaces
|- .env.example              # All required env vars (no real values)
|- .gitignore
|- next.config.js
|- tailwind.config.ts
|- tsconfig.json
|- package.json
```

---

## Quick Start (Local Development)

### Requirements
- Node.js 18 or higher (check: `node --version`)
- npm 9 or higher (check: `npm --version`)

### Steps

```bash
# 1. Go to project folder
cd zeeonix

# 2. Install dependencies
npm install

# 3. Copy environment file and fill in values
cp .env.example .env.local

# 4. Edit .env.local -- at minimum set:
#    ADMIN_EMAIL=your@email.com
#    ADMIN_PASSWORD=YourStrongPassword!
#    JWT_SECRET=your-random-32-char-secret

# 5. Start development server
npm run dev

# 6. Open browser:
#    Website:  http://localhost:3000
#    Admin:    http://localhost:3000/admin/login
```

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in values. NEVER commit `.env.local`.

### Required right now (Phases 1-5):
```
JWT_SECRET=         # Random string, minimum 32 characters
ADMIN_EMAIL=        # Your admin login email
ADMIN_PASSWORD=     # Your admin login password (strong!)
```

### Required in Phase 4 (database):
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

### Required in Phase 6 (AI chatbot):
```
ANTHROPIC_API_KEY=
```

### Required in Phase 7 (email notifications):
```
RESEND_API_KEY=
NOTIFICATION_EMAIL=
FROM_EMAIL=
```

---

## GitHub Setup

**Step 1: Create GitHub account**
Go to https://github.com and sign up (free).

**Step 2: Create a new repository**
- Click "New repository"
- Name: `zeeonix-digital` (or any name)
- Set to Private (recommended for business projects)
- Do NOT initialise with README (we already have one)
- Click "Create repository"

**Step 3: Push code to GitHub**
```bash
cd zeeonix

# Initialise git
git init

# Add all files
git add .

# First commit
git commit -m "Initial: Phase 1-5 complete -- website + admin dashboard"

# Connect to your GitHub repo (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/zeeonix-digital.git

# Push
git branch -M main
git push -u origin main
```

---

## Deployment to Vercel

Vercel is recommended for Next.js. Free "Hobby" tier is for personal use only.
For business use, you need the "Pro" plan (~$20/month) or use an alternative.

**Alternatives for commercial free/low-cost hosting:**
- Railway.app -- free tier allows commercial use (check current terms)
- Render.com -- free tier, check current commercial terms
- Netlify -- Starter plan allows commercial use with limits

### Vercel deployment steps:

**Step 1:** Go to https://vercel.com and sign in with GitHub.

**Step 2:** Click "New Project" and import your `zeeonix-digital` repository.

**Step 3:** Set environment variables in Vercel dashboard:
- Go to Project Settings -> Environment Variables
- Add each variable from your `.env.local` one by one

**Step 4:** Click "Deploy". Vercel will build and deploy automatically.

**Step 5:** Every `git push` to `main` branch will auto-redeploy.

---

## Custom Domain & DNS

### Step 1: Find your domain registrar
This is where you bought the domain (e.g., GoDaddy, Namecheap, Google Domains, BigRock).
Log in and go to DNS settings for your domain.

### Step 2: Add your domain to Vercel
- In Vercel: Project -> Settings -> Domains
- Type your domain: `zeeonix.com` and `www.zeeonix.com`
- Vercel will show you the DNS records to add

### Step 3: Add DNS records at your registrar

For root domain (`zeeonix.com`):
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600 (or Auto)
```

For www subdomain:
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600 (or Auto)
```

### Step 4: Wait for propagation
DNS changes take 5 minutes to 48 hours to work globally. Usually works within 1 hour.

### Step 5: HTTPS/SSL
Vercel automatically provisions an SSL certificate (Let's Encrypt) once DNS is configured. No action needed.

### Step 6: Verify
Visit `https://zeeonix.com` -- you should see your website with a padlock icon.

---

## Admin Portal

Access: `https://zeeonix.com/admin/login`

Login with the email and password you set in `ADMIN_EMAIL` and `ADMIN_PASSWORD`.

### Features:
- **Dashboard**: Overview stats, recent leads table
- **Leads & CRM**: Full lead list, search, filter by status, expand for details, update lead status
- **Sign out**: Clears session securely

### Lead Status Flow:
```
New -> Contacted -> Qualified -> Proposal Sent -> Negotiation -> Won
                                                              -> Lost
                                                              -> On Hold
                                                 Awaiting Payment -> Won
```

---

## Development Phases

| Phase | Description | Status |
|-------|-------------|--------|
| 1 | Requirements & Architecture | COMPLETE |
| 2 | Website design & frontend | COMPLETE |
| 3 | Backend & lead-capture forms | COMPLETE |
| 4 | Database (Supabase) & auth | NEXT |
| 5 | Admin dashboard & CRM | COMPLETE (in-memory) |
| 6 | AI sales assistant (Claude API) | PENDING |
| 7 | Email & automation integrations | PENDING |
| 8 | Testing & security audit | PENDING |
| 9 | GitHub & hosting deployment | PENDING |
| 10 | Custom domain, HTTPS & launch | PENDING |

### Phase 4 (Next): Supabase Database
1. Create free Supabase project at https://supabase.com
2. Run the SQL migration (will be provided)
3. Add Supabase env vars to `.env.local`
4. Replace in-memory lead-store with Supabase client calls
5. Leads will persist across server restarts

---

## Known Limitations

1. **Leads are not persisted** -- in-memory store resets on server restart. Phase 4 (Supabase) fixes this.
2. **Single admin user** -- credentials are env-var based. Phase 4 will add a proper admin_users table.
3. **No email notifications** -- Phase 7 (Resend) will send emails when new leads arrive.
4. **No AI chatbot** -- Phase 6 will add the Claude-powered sales assistant.
5. **Service detail pages** use static data from `services-data.ts`. Admin editing via UI comes in Phase 5 extension.
6. **Portfolio is illustrative** -- add real client projects with their permission.
7. **Newsletter form** on footer is not connected -- requires an email provider (Phase 7).
8. **WhatsApp/Instagram integration** -- Phase 8. Requires Meta Business verification.
9. **Contact details** in footer/contact page show `[placeholder]` -- replace with your real details.
10. **n8n automation** -- optional Phase 7 addition. Requires separate server/hosting.

---

## Security Checklist

- [x] Server-side input validation (Zod)
- [x] JWT HttpOnly cookies (not accessible by JS)
- [x] Secure cookies in production
- [x] Rate limiting on login (5 attempts / 15 min)
- [x] Rate limiting on enquiry form (5 per minute per IP)
- [x] Admin routes protected server-side
- [x] API routes return 401 without valid session
- [x] Security headers (X-Frame-Options, CSP, etc.)
- [x] No secrets in source code
- [x] .gitignore covers .env files
- [x] robots.txt blocks /admin and /api
- [ ] HTTPS (auto-configured by Vercel after domain setup)
- [ ] Supabase row-level security (Phase 4)
- [ ] Bcrypt password hashing in DB (Phase 4)
- [ ] Webhook signature verification (Phase 7)
- [ ] CAPTCHA/hCaptcha on enquiry form (optional Phase 8)

---

## Testing Checklist

### Frontend
- [ ] Home page loads correctly on desktop
- [ ] Home page loads correctly on mobile
- [ ] All navigation links work
- [ ] Services overview cards link to correct pages
- [ ] Individual service pages display correctly
- [ ] About, Portfolio, Pricing, FAQ, Contact pages load

### Forms
- [ ] Enquiry form: required field validation shows errors
- [ ] Enquiry form: email format validation
- [ ] Enquiry form: phone format validation
- [ ] Enquiry form: service selection (must pick at least one)
- [ ] Enquiry form: consent checkbox required
- [ ] Enquiry form: success state shows enquiry ID
- [ ] Enquiry form: rate limit blocks rapid resubmissions

### Admin
- [ ] Admin login at /admin/login
- [ ] Wrong password shows error
- [ ] Correct credentials redirect to /admin/dashboard
- [ ] /admin/dashboard without login redirects to /admin/login
- [ ] Dashboard shows correct stats
- [ ] Leads page lists enquiries
- [ ] Lead status can be updated via dropdown
- [ ] Lead details expand on row click
- [ ] Logout clears session and redirects

### After Deployment
- [ ] HTTPS working (padlock in browser)
- [ ] Custom domain loads correctly
- [ ] Forms submit and save correctly
- [ ] Admin accessible at https://yourdomain.com/admin/login
- [ ] Sitemap accessible at https://yourdomain.com/sitemap.xml
- [ ] Robots.txt accessible at https://yourdomain.com/robots.txt

---

*Built with Next.js 14, TypeScript, Tailwind CSS, Zod, Jose (JWT)*
*Design: Dark navy / blue / violet agency theme*
*AI assistant, database, and email integrations: upcoming phases*
