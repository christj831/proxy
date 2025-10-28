# Simple Supabase Proxy for Vercel

Ultra-simple proxy that definitely works with Vercel serverless functions.

## Deploy:

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Drag and drop the **proxy-server-simple** folder
4. Deploy!

## Usage:

Your URL will be: `https://your-project.vercel.app/api/proxy`

## Test in Browser:

```
https://your-project.vercel.app/api/proxy?url=rest/v1/xxlocation_db&query=select=latitude,longitude&location_id=eq.5
```

Should return JSON data!

## Arduino Code Update:

Use this URL format in your Arduino:

```cpp
const char* proxyHost = "your-project.vercel.app";
String path = "/api/proxy?url=rest/v1/" + String(tableName) + "&query=select=latitude,longitude&location_id=eq." + String(targetLocationId);
String url = "https://" + String(proxyHost) + path;
```

## Why This Version Works:

- ✅ Uses simple query parameters (no complex routing)
- ✅ Single file: `api/proxy.js`
- ✅ No rewrite rules needed
- ✅ Works with all Vercel plans

