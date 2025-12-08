// Vercel Serverless Function - Simple Proxy
// URL: https://your-project.vercel.app/api/proxy?url=rest/v1/xxlocation_db&query=select=latitude,longitude&location_id=eq.5

const SUPABASE_URL = 'https://fkpimtcxncgwtdsfyrjb.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZrcGltdGN4bmNnd3Rkc2Z5cmpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2OTQyODEsImV4cCI6MjA2ODI3MDI4MX0.vZWZNOGRekiuudIQM1RM9dNAJy8dRcjXU6pglwcyPm4';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Prefer');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  try {
    // Get query parameters
    const { url: path, query, prefer: preferHeader } = req.query;
    
    if (!path) {
      return res.status(200).json({
        status: 'OK',
        message: 'Supabase Proxy',
        usage: 'GET: /api/proxy?url=rest/v1/xxlocation_db&query=select=latitude,longitude\nPOST: /api/proxy?url=rest/v1/xxlocation_db with JSON body'
      });
    }
    
    // Build Supabase URL
    const targetUrl = `${SUPABASE_URL}/${path}${query ? '?' + query : ''}`;
    
    console.log('Proxying to:', targetUrl, 'Method:', req.method);
    
    // Prepare headers
    const headers = {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json'
    };
    
    // For POST requests, add Prefer header to return representation unless overridden
    if (preferHeader) {
      headers.Prefer = preferHeader;
    } else if (req.method === 'POST') {
      headers.Prefer = 'return=representation';
    }
    
    // Prepare fetch options
    const fetchOptions = {
      method: req.method,
      headers: headers
    };
    
    // Add body for POST requests
    if (req.body && req.method !== 'GET') {
      fetchOptions.body = JSON.stringify(req.body);
      console.log('POST body:', req.body);
    }
    
    // Fetch from Supabase
    const response = await fetch(targetUrl, fetchOptions);
    
    const data = await response.json();
    
    console.log('Response status:', response.status);
    
    return res.status(response.status).json(data);
    
  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(500).json({ 
      error: error.message
    });
  }
}


