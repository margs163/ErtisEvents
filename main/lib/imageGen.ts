import { InferenceClient } from "@huggingface/inference";
import dotenv from "dotenv";

export const clientHF = new InferenceClient(
  process.env.HUGGINGFACE_ACCESS_TOKEN
);
