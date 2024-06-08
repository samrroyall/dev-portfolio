import "dotenv/config";
import { type Config } from "drizzle-kit";

const useMocks = process.env.USE_MOCKS === "true";

if (useMocks && !process.env.LOCAL_DB_PATH) {
  throw new Error("No value provided for LOCAL_DB_PATH");
}

if (!useMocks && !process.env.TURSO_DB_PATH) {
  throw new Error("No value provided for TURSO_DB_PATH");
}

if (!useMocks && !process.env.TURSO_DB_ACCESS_TOKEN) {
  throw new Error("No value provided for TURSO_DB_ACCESS_TOKEN");
}

const config = {
  dialect: "sqlite",
  driver: "turso",
  schema: "./src/models/db/*",
  out: "./src/drizzle",
  dbCredentials: {
    url: useMocks ? process.env.LOCAL_DB_PATH! : process.env.TURSO_DB_PATH!,
    authToken: useMocks ? "access-token" : process.env.TURSO_DB_ACCESS_TOKEN!,
  },
} satisfies Config;

export default config;
