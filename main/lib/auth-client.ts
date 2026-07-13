import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import type { auth } from "./auth";

const baseUrl = process.env.BETTER_AUTH_URL;

if (!baseUrl) {
  throw new Error("base url undefined");
}

export const authClient = createAuthClient({
  baseURL: baseUrl,
  plugins: [inferAdditionalFields<typeof auth>()],
});
