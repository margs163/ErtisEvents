// app/api/generate/route.ts
import { NextRequest, NextResponse } from "next/server";
import { InferenceClient } from "@huggingface/inference";
import dotenv from "dotenv";
dotenv.config();

export async function POST(req: NextRequest) {
  const body = await req.json();

  return NextResponse.json({ error: "Method deprecated" }, { status: 403 });

  // const client = new InferenceClient(process.env.HUGGINGFACE_ACCESS_TOKEN);

  // const blob = await client.textToImage({
  //   provider: "nebius",
  //   model: "black-forest-labs/FLUX.1-dev",
  //   inputs: body.text,
  //   parameters: { num_inference_steps: 20, width: 680, height: 360 },
  // });

  // const arrayBuffer = await blob.arrayBuffer();
  // const buffer = Buffer.from(arrayBuffer);

  // return new NextResponse(buffer, {
  //   headers: { "Content-Type": "image/png" },
  // });
}
