"use server";

import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import prisma from "./prisma";
import { s3 } from "./amazon";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { EventType, UserType } from "./types";
import { v4 as uuidv4 } from "uuid";
import agent from "./recommendationAgent";
import { clientHF } from "./imageGen";

const bucket_name = process.env.S3_BUCKET_NAME!;

export async function fetchAllEvents() {
  try {
    const events = await prisma.event.findMany();
    return { data: events };
  } catch (error) {
    return { error: error };
  }
}

export async function getImageUrl(key: string) {
  const command = new GetObjectCommand({
    Bucket: bucket_name,
    Key: key,
  });

  return await getSignedUrl(s3, command, { expiresIn: 3600 });
}

export async function getMultipleImageUrls(keys: string[]) {
  try {
    if (!keys || !Array.isArray(keys)) {
      return { error: "keys are not an array" };
    }

    const urls = await Promise.all(
      keys.map(async (key: string) => {
        const command = new GetObjectCommand({
          Bucket: "aieltstalk",
          Key: key,
        });
        const url = await getSignedUrl(s3, command, { expiresIn: 7200 });
        return { key, url };
      })
    );

    const urlMap = Object.fromEntries(
      urls.map((item, index) => [index, item.url])
    );
    return { data: urlMap };
  } catch (error) {
    return { error: error };
  }
}

export async function fetchEventAndImages() {
  const events = await fetchAllEvents();

  if (events?.error) {
    return { erorr: events?.error };
  }

  if (events?.data) {
    const mappedKeys = events.data.map((item) => item.img);
    const mappedUrls = await getMultipleImageUrls(mappedKeys);

    if (mappedUrls?.error) {
      return { error: mappedUrls.error };
    }

    if (mappedUrls?.data) {
      return { events: events.data, urls: mappedUrls.data };
    }
  }
}

export async function uploadImageToS3(file: File) {
  if (!file) throw new Error("No file provided");

  const bucketName = process.env.S3_BUCKET_NAME!;
  const key = `posters/${file.name}`; // customize folder/filename

  // Convert file to ArrayBuffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: buffer,
    ContentType: file.type, // important for images
  });

  await s3.send(command);

  // Return the public URL of the uploaded file
  // return `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
  return key;
}

type InputDataType = {
  title: string;
  description: string;
  shortDescription: string;
  date: string;
  category: string;
  availableSeats: string;
  tags: string[];
  imageFile: File | null;
  imagePreview: string;
};

export async function handleFormSubmission(data: InputDataType) {
  try {
    if (data.imageFile) {
      const key = await uploadImageToS3(data.imageFile);

      const record = await prisma.event.create({
        data: {
          id: uuidv4(),
          title: data.title,
          date: new Date(data.date),
          category: data.category,
          tags: data.tags,
          rating: 4.9,
          availableSeats: parseInt(data.availableSeats),
          shortDescription: data.shortDescription,
          description: data.description,
          img: key,
        },
      });

      return { data: record };
    }
  } catch (error) {
    return { error: error };
  }
}

export async function getRecommendations(userData: UserType) {
  try {
    const response = await agent.invoke({
      messages: [
        {
          role: "user",
          content: JSON.stringify({
            age: userData.age,
            gender: userData.gender,
            interests: userData.interests,
          }),
        },
      ],
    });

    const ids = response.structuredResponse.recommended_event_ids;

    const events = await prisma.event.findMany({
      where: {
        id: { in: ids },
      },
    });

    const s3urls = await getMultipleImageUrls(events.map((item) => item.img));

    if (s3urls.error) {
      return { error: s3urls.error };
    }
    if (s3urls.data) {
      const mappedEvents = events.map((item, index) => ({
        ...item,
        s3Url: s3urls.data[index],
      }));
      return mappedEvents;
    }

    return events;
  } catch (error) {
    return { error: error };
  }
}

export async function generateImage(input: string) {
  const res = await fetch("http://localhost:3000/api/generate", {
    method: "POST",
    body: JSON.stringify({ text: input }),
  });
  const blob = await res.blob();
  return blob;
}
