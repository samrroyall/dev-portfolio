import * as Sentry from "@sentry/bun";
import { Elysia } from "elysia";

const environment = process.env.ENV;

if (!environment) {
  throw new Error("No value provided for ENV");
}

const dsn = process.env.SENTRY_DSN;

if (!dsn) {
  throw new Error("No value provided for SENTRY_DSN");
}

Sentry.init({
  dsn,
  environment,
  tracesSampleRate: 1.0,
});

const loggerPlugin = new Elysia().decorate({
  logger: {
    debug: (msg: string) => Sentry.captureMessage(msg, "debug"),
    info: (msg: string) => Sentry.captureMessage(msg, "info"),
    warn: (msg: string) => Sentry.captureMessage(msg, "warning"),
    error: (msg: string, err: any) => {
      Sentry.captureMessage(msg, "error");
      Sentry.captureException(err);
    },
  },
});

export default loggerPlugin;
