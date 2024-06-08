import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { Elysia } from "elysia";
import config from "../../drizzle.config";

const client = createClient(config.dbCredentials);

const db = drizzle(client);

const dbPlugin = new Elysia()
  .onStop(() => {
    client.close();
  })
  .decorate({ db });

export default dbPlugin;
