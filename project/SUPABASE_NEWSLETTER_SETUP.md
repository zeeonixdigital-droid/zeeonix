# Zeenex Digital — Newsletter Supabase Setup Guide

## ✅ Status: LIVE & CONNECTED

The newsletter subscription form is now fully connected to your Supabase database.

---

## Configuration

### Environment Variables (`.env`)
```
VITE_SUPABASE_URL=https://okympzfrdrfatbvfuikw.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
✅ Configured and active.

### Database Table: `newsletter_subscribers`

**Required Schema:**
```sql
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to INSERT (subscribe)
CREATE POLICY "Allow anon insert newsletter"
  ON public.newsletter_subscribers
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow service_role to SELECT all subscribers
CREATE POLICY "Allow service_role select newsletter"
  ON public.newsletter_subscribers
  FOR SELECT
  TO service_role
  USING (true);
```

---

## How to Verify Setup

### 1. Check Table Exists
Go to Supabase Dashboard → Table Editor → Look for `newsletter_subscribers` table.

### 2. Check RLS Policies
Go to Supabase Dashboard → Authentication → Policies → `newsletter_subscribers`

You should see:
- ✅ INSERT policy for `anon` role
- ✅ SELECT policy for `service_role` (optional, for admin access)

### 3. Test Subscription
1. Open the live website
2. Scroll to footer
3. Enter a test email (e.g., `test@zeenex.digital`)
4. Click "Join"
5. Check Supabase Dashboard → Table Editor → `newsletter_subscribers` → Refresh

You should see the new email inserted.

### 4. Test Duplicate Handling
1. Try subscribing with the same email again
2. You should see: "You're already subscribed! ✓"
3. No duplicate row should be created

---

## Error Handling

The form now properly handles these scenarios:

| Scenario | User Message | Console Log |
|----------|-------------|-------------|
| ✅ Success | "Subscribed successfully! Check your inbox soon. ✓" | `[Zeenex DB] Newsletter subscriber added successfully` |
| ⚠️ Duplicate Email | "You're already subscribed! ✓" | `[Zeenex DB] Duplicate email detected` |
| ❌ Table Missing | "Database table not configured..." | `[Zeenex DB] Table 'newsletter_subscribers' not found` |
| ❌ RLS Policy Error | "Permission denied..." | `[Zeenex DB] RLS policy violation` |
| ❌ Network Error | "An unexpected error occurred..." | `[Zeenex DB] Newsletter unexpected error` |

---

## Debugging

### Open Browser Console
Press `F12` → Console tab → Look for `[Zeenex DB]` logs.

### Common Issues & Fixes

**Issue:** "Something went wrong. Try again."
- **Cause:** Database table doesn't exist or RLS policy missing
- **Fix:** Run `supabase-setup.sql` in Supabase SQL Editor

**Issue:** "Permission denied"
- **Cause:** RLS INSERT policy not configured for `anon` role
- **Fix:** Create the INSERT policy shown above

**Issue:** Form always shows success but no data in database
- **Cause:** `.env` file not loaded or credentials incorrect
- **Fix:** 
  1. Check `.env` exists in project root
  2. Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are correct
  3. Rebuild: `npm run build`

---

## Files Modified

| File | Changes |
|------|---------|
| `src/lib/db.ts` | Fixed `getClient()` to always return client when credentials exist. Updated `subscribeNewsletter()` with proper error handling, duplicate detection, and detailed console logging. |
| `src/components/Footer.tsx` | Added `newsletterMessage` state. Form now shows actual result from Supabase (success/error). Added loading spinner. Disabled form during submission. Shows duplicate email message. |

---

## Build Output

- **File:** `dist/index.html`
- **Size:** 646 KB (186 KB gzipped)
- **Status:** ✅ Production ready

---

## Quick Test Command

Open browser console on the live site and run:
```javascript
// Test newsletter subscription
fetch('https://okympzfrdrfatbvfuikw.supabase.co/rest/v1/newsletter_subscribers', {
  method: 'POST',
  headers: {
    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9reW1wemZkcmZyYXRidmZ1aWt3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMDE1MDEsImV4cCI6MjA5Mjg3NzUwMX0.rpLOeT7BZsUjP8goG7WHB1KC3_VzBsAJ4wGaKn7Di5U',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9reW1wemZkcmZyYXRidmZ1aWt3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMDE1MDEsImV4cCI6MjA5Mjg3NzUwMX0.rpLOeT7BZsUjP8goG7WHB1KC3_VzBsAJ4wGaKn7Di5U',
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
  },
  body: JSON.stringify({ email: 'test@zeenex.digital' })
})
.then(r => r.json())
.then(console.log)
.catch(console.error);
```

If you see `{ id: "...", email: "test@zeenex.digital", created_at: "..." }` → ✅ Working!

If you see an error → Check RLS policies.

---

## Support

For issues, check:
1. Browser console for `[Zeenex DB]` logs
2. Supabase Dashboard → Logs → Edge Functions
3. Supabase Dashboard → Database → `newsletter_subscribers` table
