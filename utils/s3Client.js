const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

// 🔧 Hardcoded values
const REGION = "us-east-1";
const BUCKET = "team-skynet-s3-bucket";

// Initialize S3 client directly
const s3 = new S3Client({
    region: REGION
});

async function getPresignedUrl(jobId, fileName, fileType) {
  try {
    const s3Key = `${jobId}/${fileName}`;

    const command = new PutObjectCommand({
      Bucket: BUCKET,
      Key: s3Key,
      ContentType: fileType,
      ACL: 'private'
    });

    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 300 });
    console.log("✅ Generated presigned URL for:", s3Key);
    console.log(signedUrl);
    return signedUrl;
  } catch (err) {
    console.error("❌ Failed to generate presigned URL:");
    console.error(err);
    throw err; 
  }
}

module.exports = { getPresignedUrl };