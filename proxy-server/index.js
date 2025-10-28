// Simple HTTP-to-HTTPS proxy for Supabase
// Deploy this on Vercel for free

const SUPABASE_URL = 'https://fkpimtcxncgwtdsfyrjb.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZrcGltdGN4bmNnd3Rkc2Z5cmpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2OTQyODEsImV4cCI6MjA2ODI3MDI4MX0.vZWZNOGRekiuudIQM1RM9dNAJy8dRcjXU6pglwcyPm4';

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle OPTIONS
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  try {
    const { url } = req;
    
    // Root path - health check
    if (url === '/' || url === '') {
      res.status(200).json({
        status: 'OK',
        message: 'Supabase Proxy Running',
        usage: '/api/supabase/rest/v1/xxlocation_db?select=latitude,longitude&location_id=eq.5'
      });
      return;
    }
    
    // Proxy path
    if (url.startsWith('/api/supabase/')) {
      const supabasePath = url.replace('/api/supabase/', '');
      const targetUrl = `${SUPABASE_URL}/${supabasePath}`;
      
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
      
      res.status(response.status).json(data);
      return;
    }
    
    // 404 for other paths
    res.status(404).json({ error: 'Not found', path: url });
    
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ 
      error: error.message,
      details: 'Failed to proxy request to Supabase'
    });
  }
};

