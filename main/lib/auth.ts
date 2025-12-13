import { betterAuth } from "better-auth";
import { Pool } from "pg";
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      age: {
        type: "number",
        input: true,
        required: true,
      },
      gender: {
        type: "string",
        input: true,
        required: true,
      },
      interests: {
        type: "string[]",
        input: true,
        required: true,
      },
      role: {
        type: "string",
        input: true,
        required: true,
      },
    },
  },
});
