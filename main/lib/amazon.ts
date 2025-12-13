import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";

dotenv.config();

const access_key = process.env.AWS_ACCESS_KEY_ID!;
const secret_key = process.env.AWS_SECRET_ACCESS_KEY!;
const bucket_name = process.env.S3_BUCKET_NAME!;
const region = process.env.AWS_REGION!;

export const s3 = new S3Client({
  region: region,
  credentials: {
    accessKeyId: access_key,
    secretAccessKey: secret_key,
  },
  forcePathStyle: false,
});
