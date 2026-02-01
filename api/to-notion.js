module.exports = async (req, res) => {
  // DEBUG: Log everything we get
  console.log('Method:', req.method);
  console.log('Headers:', req.headers);
  console.log('Body type:', typeof req.body);
  console.log('Raw body:', req.body ? req.body.toString() : 'EMPTY');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'POST required' });
  }

  res.json({ 
    debug: {
      method: req.method,
      headers: req.headers['content-type'],
      bodyType: typeof req.body,
      rawBody: req.body ? req.body.toString('utf8') : 'EMPTY'
    }
  });
};
