# Supabase PostgreSQL Connection Troubleshooting

## Diagnosis
- ✓ Supabase REST API is responding (healthy)
- ✗ PostgreSQL ports (5432 & 6543) are unreachable
- ✗ Cannot connect from Vercel OR locally
- **Likely issue: Database is suspended, firewall blocked, or not running**

---

## Troubleshooting Checklist

### 1. Check Database Status
Go to: https://app.supabase.com

1. Select project "alhusseinalsaadi's Project"
2. Click **"Database"** in left sidebar
3. Look for:
   - ✓ Green "Online" status or similar
   - ✗ "Paused", "Suspended", or "Offline" status
   - ✗ Error messages or warnings

**If paused/suspended:**
- Click resume/start button
- Wait 1-2 minutes for database to start
- Then try connection again

---

### 2. Check Network Restrictions
Go to: https://app.supabase.com → Settings → Database

Look for:
- **IP Whitelist** - Is Vercel IP (or 0.0.0.0/0) whitelisted?
- **SSL Enforcement** - Is it too strict?
- **Firewall Rules** - Are there any blocking rules?

**If IP whitelist exists:**
- Add `0.0.0.0/0` to allow all IPs (for testing)
- Or get Vercel IP range and whitelist it

---

### 3. Check Connection String
Go to: https://app.supabase.com → Database → Connection Pooler

Verify the connection string shows:
```
Host: db.uqfevhxhawhqckvgpfkm.supabase.co
Port: 6543 (for pooler) or 5432 (direct)
Database: postgres
User: postgres
Password: (should be set)
```

---

### 4. Check Database Logs
Go to: https://app.supabase.com → Settings → Database Logs

Look for:
- Connection errors
- Authentication failures
- Any recent errors

---

## Quick Recovery Steps

If database is paused/suspended:

1. Go to Database page
2. Click "Resume" or similar button
3. Wait 2 minutes for startup
4. Test connection: https://alhusseinalsaadi.sa/api/diagnose
5. Should show database connection success

---

## Alternative: Database Reset

If nothing works:
1. Go to Settings → Database
2. Look for "Reset" or "Restart" option
3. Confirm reset
4. Wait 2-3 minutes
5. Try connection again

---

## Last Resort: Check Supabase Status
Visit: https://status.supabase.com

- If there's a service outage, Supabase team is working on it
- Check back in 15-30 minutes

---

## What to Report Back

Once you check these, let me know:
1. Database status (Online/Paused/Other)?
2. Any IP whitelist restrictions?
3. Any error messages in logs?
4. Did you reset/resume anything?
