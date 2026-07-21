# Manual Update: Vercel Environment Variable

## Copy This Connection String

```
postgresql://postgres:2F_hyd41A6NNgYK0Y12fkWxKoe@db.uqfevhxhawhqckvgpfkm.supabase.co:6543/postgres?schema=public
```

**Key difference from current:**
- Old: port `5432` (doesn't work with Vercel)
- New: port `6543` (Connection Pooler - works with serverless)

---

## Update Vercel (2 steps, 1 minute total)

### Step 1: Open Vercel Dashboard
Go to: https://vercel.com/dashboard/projects/alhusseinalsaadi-v1/settings/environment-variables

### Step 2: Update DATABASE_URL
- Find `DATABASE_URL` in the list
- Click to edit it
- Clear current value
- Paste the connection string above (with port 6543)
- Click "Save"
- ✓ Deployment will start automatically

---

## After Update

**Wait 2-3 minutes** for Vercel to redeploy, then test:

1. **Check deployment status:**
   https://vercel.com/dashboard/projects/alhusseinalsaadi-v1/deployments

2. **Test database connection:**
   https://alhusseinalsaadi.sa/api/diagnose
   
   Should show:
   ```
   "success": true
   "totalPosts": 13
   ```

3. **Check blog page:**
   https://alhusseinalsaadi.sa/blog
   
   Should display all 13 articles ✓

---

## Troubleshooting

If you see "Can't reach database server" after update:
1. Wait another 1-2 minutes (Vercel might still be building)
2. Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
3. Check deployment logs for errors

If articles still don't appear after database connects:
- All 13 articles are confirmed in database with category="blog" and published=true
- Should display within 1 minute of successful connection
