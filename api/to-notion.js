const { markdownToBlocks } = require('@tryfabric/martian');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Parse raw body (Vercel doesn't auto-parse JSON)
    let body;
    try {
      body = JSON.parse(req.body);
    } catch {
      return res.status(400).json({ error: 'Invalid JSON' });
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
