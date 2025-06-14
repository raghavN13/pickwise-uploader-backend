const { S3Client, ListBucketsCommand } = require("@aws-sdk/client-s3");
require('dotenv').config();

// Create S3 Client
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.AWS_SESSION_TOKEN
  }
});

// Sanity check function
async function checkAWSCredentials() {
  try {
    const result = await s3.send(new ListBucketsCommand({}));
    console.log("✅ Successfully connected to AWS!");
    console.log("Buckets:", result.Buckets.map(b => b.Name));
  } catch (error) {
    console.error("❌ AWS Credentials error:");
    console.error(error);
  }
}

checkAWSCredentials();