const express = require("express");
const router = express.Router();
const { getPresignedUrl } = require("../utils/s3Client");

router.post("/generate-presigned-url", async (req, res) => {
  const { jobId, fileName, fileType } = req.body;

  if (!jobId || !fileName || !fileType) {
    return res
      .status(400)
      .json({ error: "Missing jobId, fileName or fileType" });
  }

  try {
    const result = await getPresignedUrl(jobId, fileName, fileType);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate presigned URL" });
  }
});

module.exports = router;
