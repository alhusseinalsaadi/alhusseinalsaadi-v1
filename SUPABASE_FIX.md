# Supabase Connection Pooler Fix for Vercel Deployment

## Problem
Vercel serverless functions cannot connect to Supabase using direct database connection (port 5432).

Error on Vercel:
```
Can't reach database server at `db.uqfevhxhawhqckvgpfkm.supabase.co:5432`
```

## Root Cause
- Direct PostgreSQL connections (port 5432) are stateful and maintain persistent connections
- Vercel serverless functions run in ephemeral containers that timeout
- This causes connection pool exhaustion on Supabase

## Solution: Use Connection Pooler

Supabase includes **pgBouncer connection pooling** available on port 6543. This pools and reuses connections properly for serverless.

### Step-by-Step Fix:

1. **Login to Supabase Dashboard**
   - Go to https://app.supabase.com
   - Select your project: `alhusseinalsaadi`

2. **Get Connection Pooler String**
   - Click "Connect" button (top right)
   - Change from "Direct Connection" tab to "Connection pooler" tab
   - Copy the entire connection string (looks like):
   ```
   postgresql://postgres.xxxxxx:[PASSWORD]@db.xxxxxx.supabase.co:6543/postgres?schema=public
   ```
   - Note: Port changes from **5432** to **6543**

3. **Update Vercel Environment Variables**
   - Go to https://vercel.com/dashboard
   - Select project: `alhusseinalsaadi`
   - Settings → Environment Variables
   - Find or create `DATABASE_URL`
   - Paste the connection pooler string (with port 6543, not 5432)
   - Save and redeploy

4. **Verify Local Dev Still Works**
   - No changes needed to `.env.local` (direct connection works locally)
   - Local dev will continue using port 5432
   - Only Vercel will use the pooler (port 6543)

### Testing

After updating Vercel:
1. Wait for automatic redeploy (or trigger manually)
2. Visit: `https://alhusseinalsaadi.sa/api/diagnose`
3. Should see:
   ```json
   {
     "prismaTests": {
       "countTest": { "success": true, "totalPosts": 13 }
     }
   }
   ```
4. Check blog: `https://alhusseinalsaadi.sa/blog`
5. Should display all 13 articles

## Important Notes
- Use Connection Pooler (port 6543) for Vercel/production
- Keep Direct Connection (port 5432) for local development
- Both use the same database, just different connection methods
- Pooler is available on all Supabase plans (free and paid)
