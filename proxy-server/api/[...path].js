// Catch-all route for /api/supabase/*
const SUPABASE_URL = 'https://fkpimtcxncgwtdsfyrjb.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZrcGltdGN4bmNnd3Rkc2Z5cmpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2OTQyODEsImV4cCI6MjA2ODI3MDI4MX0.vZWZNOGRekiuudIQM1RM9dNAJy8dRcjXU6pglwcyPm4';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  try {
    // Get the path from query params
    const pathParts = req.query.path || [];
    const pathString = Array.isArray(pathParts) ? pathParts.join('/') : pathParts;
    
    // Get query string
    const queryString = req.url.split('?')[1] || '';
    
    // Build target URL
    const targetUrl = `${SUPABASE_URL}/${pathString}${queryString ? '?' + queryString : ''}`;
    
    console.log('Proxying request to:', targetUrl);
    
    // Forward to Supabase
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    
    console.log('Response status:', response.status);
    
    return res.status(response.status).json(data);
    
  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(500).json({ 
      error: error.message,
      path: req.query.path,
      url: req.url
    });
  }
}

