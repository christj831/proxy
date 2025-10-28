// Simple HTTP-to-HTTPS proxy for Supabase
// Deploy this on Vercel/Netlify/Heroku for free

const express = require('express');
const fetch = require('node-fetch');
const app = express();

const SUPABASE_URL = 'https://fkpimtcxncgwtdsfyrjb.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZrcGltdGN4bmNnd3Rkc2Z5cmpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2OTQyODEsImV4cCI6MjA2ODI3MDI4MX0.vZWZNOGRekiuudIQM1RM9dNAJy8dRcjXU6pglwcyPm4';

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// Proxy endpoint
app.get('/api/supabase/*', async (req, res) => {
  try {
    // Get the path after /api/supabase/
    const supabasePath = req.url.replace('/api/supabase/', '');
    const targetUrl = `${SUPABASE_URL}/${supabasePath}`;
    
    console.log(`Proxying: ${targetUrl}`);
    
    // Forward request to Supabase with proper auth
    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    
    // Return as plain JSON
    res.json(data);
    
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Supabase HTTP Proxy',
    usage: 'GET /api/supabase/rest/v1/xxlocation_db?select=latitude,longitude&location_id=eq.5'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});

module.exports = app;

