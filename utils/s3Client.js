const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
require('dotenv').config();

const s3 = new S3Client({
    region: process.env.AWS_REGION
  });

const BUCKET = process.env.S3_BUCKET_NAME;

async function getPresignedUrl(fileName, fileType) {
  try {
    const command = new PutObjectCommand({
      Bucket: BUCKET,
      Key: `simple-resume/${fileName}`,
      ContentType: fileType,
      ACL: 'private'
    });

    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 300 });
    console.log("✅ Generated presigned URL:");
    console.log(signedUrl);
    return signedUrl;
  } catch (err) {
    console.error("❌ Failed to generate presigned URL:");
    console.error(err);
    throw err; 
  }
}

module.exports = { getPresignedUrl };