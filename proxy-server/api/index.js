// Vercel serverless function
const SUPABASE_URL = 'https://fkpimtcxncgwtdsfyrjb.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZrcGltdGN4bmNnd3Rkc2Z5cmpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2OTQyODEsImV4cCI6MjA2ODI3MDI4MX0.vZWZNOGRekiuudIQM1RM9dNAJy8dRcjXU6pglwcyPm4';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const { path } = req.query;
  
  if (!path || path.length === 0) {
    return res.status(200).json({
      status: 'OK',
      message: 'Supabase Proxy',
      usage: '/api/supabase/rest/v1/xxlocation_db?select=latitude,longitude'
    });
  }
  
  try {
    // Build Supabase URL
    const supabasePath = Array.isArray(path) ? path.join('/') : path;
    const targetUrl = `${SUPABASE_URL}/${supabasePath}${req.url.includes('?') ? '?' + req.url.split('?')[1] : ''}`;
    
    console.log('Proxying to:', targetUrl);
    
    // Fetch from Supabase
    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    
    return res.status(response.status).json(data);
    
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: error.message });
  }
}

