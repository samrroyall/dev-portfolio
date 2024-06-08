import { type LibSQLDatabase } from "drizzle-orm/libsql";
import { type Context, type RouteSchema } from "elysia";
import { type CookieSchema } from "./routes";

interface DbSchema {
  db: LibSQLDatabase;
}

interface SentrySchema {
  logger: {
    debug: (msg: string) => void;
    info: (msg: string) => void;
    warn: (msg: string) => void;
    error: (msg: string, err: any) => void;
  };
}

export type HandlerContext<Schema extends RouteSchema = RouteSchema> = Context<
  Schema & CookieSchema
> &
  DbSchema &
  SentrySchema;
