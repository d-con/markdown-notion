const { markdownToBlocks } = require('@tryfabric/martian');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'POST required' });
  }

  try {
    const { markdown } = req.body;  // Already parsed object!
    
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
