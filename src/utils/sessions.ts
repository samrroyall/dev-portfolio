import { randomBytes } from "crypto";
import { and, eq, gt, lt } from "drizzle-orm";
import { type LibSQLDatabase } from "drizzle-orm/libsql";
import { type Cookie } from "elysia";
import { sessions } from "../models/db";

export const cleanupSessions = async (db: LibSQLDatabase) =>
  db.delete(sessions).where(lt(sessions.expiry, new Date()));

export const createNewSession = async (
  db: LibSQLDatabase,
  session: Cookie<string | undefined>,
): Promise<void> => {
  if (!process.env.COOKIE_EXPIRY_MS) {
    throw new Error("No value provided for COOKIE_EXPIRY_MS");
  }

  const expiryMs = parseInt(process.env.COOKIE_EXPIRY_MS);

  if (isNaN(expiryMs)) {
    throw new Error("Invalid number value provided for COOKIE_EXPIRY_MS");
  }

  session.value = randomBytes(16).toString("hex");
  session.expires = new Date(Date.now() + expiryMs);
  session.httpOnly = true;

  await db
    .insert(sessions)
    .values({ sessionId: session.value, expiry: session.expires });
};

export const validateSession = async (
  db: LibSQLDatabase,
  sessionId: string | undefined,
): Promise<boolean> => {
  if (!sessionId || sessionId.length < 32) {
    return false;
  }

  const result = await db
    .select()
    .from(sessions)
    .where(
      and(
        eq(sessions.sessionId, sessionId.slice(0, 32)),
        gt(sessions.expiry, new Date()),
      ),
    );

  void cleanupSessions(db);

  return result.length > 0;
};
