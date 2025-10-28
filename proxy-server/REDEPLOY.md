# Redeploy Instructions

I've fixed the proxy structure for Vercel serverless functions.

## Quick Redeploy:

1. **Go to your Vercel dashboard**
2. **Find your project** (proxy-liart-ten)
3. **Click "Redeploy"**

OR

4. **Delete and recreate:**
   - Delete the old project
   - Create new project
   - Upload the `proxy-server` folder again

## File Structure Should Be:
```
proxy-server/
├── api/
│   └── [...path].js    (NEW - handles /api/supabase/*)
├── vercel.json         (UPDATED)
└── package.json
```

## Test After Deploy:

Visit: `https://proxy-liart-ten.vercel.app/api/supabase/rest/v1/xxlocation_db?select=latitude,longitude&location_id=eq.5`

Should return JSON with your data!

## If Still 404:

The simplest fix - create a single endpoint file:

Create `api/supabase.js`:
```javascript
export default async function(req, res) {
  const url = 'https://fkpimtcxncgwtdsfyrjb.supabase.co' + req.url.replace('/api/supabase', '');
  const response = await fetch(url, {
    headers: {
      'apikey': 'YOUR_KEY',
      'Authorization': 'Bearer YOUR_KEY'
    }
  });
  res.json(await response.json());
}
```

Then use URL: `/api/supabase/rest/v1/...`

