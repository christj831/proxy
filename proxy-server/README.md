# Supabase HTTP Proxy

This is a simple proxy server that converts HTTP requests to HTTPS for Supabase.
Needed because DITO network blocks SSL/HTTPS connections.

## Quick Deploy to Vercel (Free!)

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Deploy:**
```bash
cd proxy-server
vercel
```

3. **Follow prompts:**
   - Create Vercel account (free)
   - Link project
   - Deploy!

4. **You'll get a URL like:**
   `https://your-proxy.vercel.app`

## Or Deploy to Other Platforms:

### Heroku:
```bash
heroku create
git push heroku main
```

### Netlify:
- Drag and drop the folder to Netlify.com

### Railway:
- Connect your GitHub repo to Railway.app

## Usage:

Once deployed, update your Arduino code to use HTTP:

```cpp
// Instead of:
// https://fkpimtcxncgwtdsfyrjb.supabase.co/rest/v1/xxlocation_db

// Use:
// http://your-proxy.vercel.app/api/supabase/rest/v1/xxlocation_db
```

## Security Note:

This proxy includes your API key. For production:
1. Use environment variables for the key
2. Add rate limiting
3. Add IP whitelisting if possible
4. Use Supabase RLS policies

For your IoT device, this is fine since the anon key is already public.

