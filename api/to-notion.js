const {markdownToBlocks} = require('@tryfabric/martian');

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
    
    // Debug logging
    console.log('Blocks type:', typeof blocks);
    console.log('Blocks is array:', Array.isArray(blocks));
    console.log('Blocks length:', blocks?.length);
    
    // Test JSON serialization
    try {
      const testSerialization = JSON.stringify({ children: blocks });
      console.log('Serialization successful, size:', testSerialization.length);
    } catch (jsonError) {
      console.error('JSON serialization failed:', jsonError.message);
      return res.status(500).json({ 
        error: 'Failed to serialize blocks to JSON', 
        details: jsonError.message 
      });
    }
    
    res.json({ children: blocks });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
};
