# syntax = docker/dockerfile:1

ARG BUN_VERSION=1.1.2
FROM oven/bun:${BUN_VERSION} as base

LABEL fly_launch_runtime="Bun"

WORKDIR /app

FROM base as build

RUN apt-get update -qq && \
    apt-get install -y build-essential pkg-config python-is-python3

COPY --link bun.lockb package.json ./
RUN bun install --ci

COPY --link . .

FROM base as final

COPY --from=build /app /app

EXPOSE 3000
CMD [ "bun", "run", "start" ]
