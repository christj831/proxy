# Fix HTTP 308 Redirect Issue

Vercel automatically redirects HTTP to HTTPS. Since your Arduino can't do HTTPS (DITO blocks SSL), we have 2 options:

## Option 1: Use HTTPS URL (Recommended)

Change your Arduino code to use HTTPS URL - the proxy handles SSL for you:

In `gps_supabase_HTTP_PROXY.ino` line 91:
```cpp
// Change from:
String url = "http://" + String(proxyHost) + path;

// To:
String url = "https://" + String(proxyHost) + path;
```

And enable SSL in Arduino (line 109):
```cpp
// Change from:
modem.sendAT("+HTTPSSL=0");

// To:
modem.sendAT("+HTTPSSL=1");
```

**Why this works:**
- Your modem connects to Vercel (Vercel has valid SSL certs)
- Vercel's SSL works fine with most networks
- Vercel proxy then connects to Supabase

## Option 2: Deploy to Different Platform

If Vercel SSL also times out, deploy to platforms that allow HTTP:

### Railway.app:
```bash
1. Go to railway.app
2. New Project
3. Deploy from GitHub
4. No forced HTTPS!
```

### Heroku:
```bash
heroku create
git push heroku main
```

### Your Own Server:
```bash
node index.js
# Runs on HTTP port 3000
```

## Testing

After deploying, test with:
```
http://your-proxy.vercel.app/
```

Should return:
```json
{
  "status": "OK",
  "message": "Supabase HTTP Proxy"
}
```

