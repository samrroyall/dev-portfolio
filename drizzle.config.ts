import { type Config } from "drizzle-kit";

if (!process.env.DB_PATH) {
  throw new Error("No value provided for DB_PATH");
}

if (!process.env.DB_ACCESS_TOKEN) {
  throw new Error("No value provided for DB_ACCESS_TOKEN");
}

const config = {
  dialect: "sqlite",
  driver: "turso",
  schema: "./src/models/db/*",
  out: "./src/drizzle",
  dbCredentials: {
    url: process.env.DB_PATH!,
    authToken: process.env.DB_ACCESS_TOKEN!,
  },
} satisfies Config;

export default config;
