import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "http://gcs.adelbr.tech"
      : "http://localhost:3000",
  fetchOptions: {
    timeout: 15000,
  },
});
