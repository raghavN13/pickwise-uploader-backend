const express = require('express');
const router = express.Router();
const { getPresignedUrl } = require('../utils/s3Client');

router.post('/generate-presigned-url', async (req, res) => {
    console.log("Incoming request body: ", req.body);
  const { fileName, fileType } = req.body;

  if (!fileName || !fileType) {
    return res.status(400).json({ error: 'Missing fileName or fileType' });
  }

  try {
    const url = await getPresignedUrl(fileName, fileType);
    res.json({ uploadUrl: url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate presigned URL' });
  }
});



module.exports = router;