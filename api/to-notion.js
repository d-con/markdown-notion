const { markdownToBlocks } = require('@tryfabric/martian');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Vercel gives raw Buffer - convert to string first
    const rawBody = req.body.toString('utf8');
    
    let body;
    try {
      body = JSON.parse(rawBody);
    } catch (e) {
      return res.status(400).json({ 
        error: 'Invalid JSON', 
        rawBody: rawBody.substring(0, 100) // debug first 100 chars
      });
    }

    const { markdown } = body;
    
    if (!markdown || typeof markdown !== 'string') {
      return res.status(400).json({ error: 'markdown required' });
    }

    const blocks = markdownToBlocks(markdown);
    res.json({ children: blocks });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
};
