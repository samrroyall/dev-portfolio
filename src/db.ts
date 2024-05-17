import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { Elysia } from "elysia";

if (!process.env.DB_PATH) {
  throw new Error("No value provided for DB_PATH");
}

if (!process.env.DB_ACCESS_TOKEN) {
  throw new Error("No value provided for DB_ACCESS_TOKEN");
}

const client = createClient({
  url: process.env.DB_PATH!,
  authToken: process.env.DB_ACCESS_TOKEN!,
});

const db = drizzle(client);

const dbPlugin = new Elysia()
  .onStop(() => {
    client.close();
  })
  .decorate({ db });

export default dbPlugin;
