import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { sec } from "better-auth/plugins/device-authorization";
import dotenv from "dotenv";

dotenv.config();

const access_key = process.env.R2_ACCESS_KEY_ID;
const secret_key = process.env.R2_SECRET_ACCESS_KEY;
const bucket_name = process.env.R2_BUCKET_NAME;
const endpoint = process.env.R2_ENDPOINT;

if (!access_key || !secret_key || !bucket_name || !endpoint) {
  throw new Error("Credentials not found");
}

export const s3 = new S3Client({
  region: "auto",
  endpoint: endpoint,
  credentials: {
    accessKeyId: access_key,
    secretAccessKey: secret_key,
  },
});
