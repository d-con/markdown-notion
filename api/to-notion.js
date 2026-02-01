const {markdownToBlocks} = require('@tryfabric/martian');

module.exports = async (req, res) => {
     const { markdown } = req.body;  // Already parsed object!
    
  markdownToBlocks(markdown);
    const blocks = await markdownToBlocks(markdown);

    res.status(200).json({ blocks });
}
