# Dev Portfolio UI

This portfolio website is built using the Elysia framework on the Bun JS 
runtime. Mock data is stored on a local SQLite database, and production data 
is stored on Turso. HTMX and TailwindCSS provide simple interactivity and 
styling, all within TSX components.

Data on the interests page is pulled from Vercel serverless functions, 
[here](https://github.com/samrroyall/dev-portfolio-functions), which currently 
provide data from the Strava and Spotify APIs.

Blog posts are generated dynamically from markdown text, using MarkedJS, and 
code blocks are highlighted using PrismJS.

The site also features a robust Admin panel, allowing for creation, 
modification, and deletion of blog posts and home page data.

## Project Structure

```
.
├── local.db
└── src
    ├── components
    │   ├── pages
    │   └── shared
    ├── data
    │   ├── api
    │   │   └── interests
    │   └── mocks
    │       └── interests
    ├── drizzle
    ├── index.tsx
    ├── models
    │   ├── auth.ts
    │   ├── blog.ts
    │   ├── components.ts
    │   ├── db
    │   ├── handlers.ts
    │   ├── home.ts
    │   ├── interests
    │   └── routes.ts
    ├── plugins
    │   ├── db.ts
    │   ├── handlers.tsx
    │   ├── routes.tsx
    │   └── sentry.ts
    └── utils
        ├── auth.ts
        ├── blog.ts
        ├── email.ts
        ├── homesections.ts
        ├── other.ts
        └── sessions.ts
```

- `local.db` - Contains mock data for the blog and home pages

- `components/`
    - `pages/` - Contains page components
    - `shared/` - Contains non-page components

- `data/`
    - `api/interests/` - Contains logic regarding pulling API data for the interests page
    - `mocks/interests/` - Contains mock data for the interests page

- `drizzle/` - Contains database migration files

- `index.tsx` - The entry-point of the application

- `models/`
    - `auth.ts` - Contains models and mappers regarding admin authentication
    - `blog.ts` - Contains models and mappers regarding the blog page and blog posts
    - `components.ts` - Contains models regarding components generally
    - `db/` - Contains schema definitions for DB tables
    - `handlers.ts` - Contains models regarding handlers generally
    - `home.ts` - Contains models and mappers regarding the home page
    - `interests.ts` - Contains models and mappers regarding the interests page
    - `routes.ts` - Contains models regarding routes generally

- `plugins/`
    - `db.ts` - Contains the DB plugin for the application
    - `handlers.ts` - Contains the route handlers for the application
    - `routes.ts` - Contains the public and admin routes for the application
    - `sentry.ts` - Contains the Sentry logging plugin for the application

- `utils/`
    - `auth.ts` - Contains application logic regarding admin authentication
    - `blog.ts` - Contains DB queries for the blog page
    - `email.ts` - Contains application logic for the contact form
    - `homesections.ts` - Contains DB queries for the home page
    - `other.ts` - Contains miscellaneous utility functions
    - `sessions.ts` - Contains application logic regarding session creation, management, and verification

## Usage

### Prerequisites 

Before you can the application locally, ensure you have [Bun](https://bun.sh/) 
installed.

**Optional:**

If you want to run the application with Docker, ensure you have 
[Docker Desktop](https://www.docker.com/products/docker-desktop/) installed.

### Environment Variables

Next, copy the `.env.template` file to `.env` and update the values.

### Run the application

Run `bun run start` to start the app. The app will be available at 
`http://localhost:3000`. To run the app with live reloading while developing, 
run `bun run dev`.

To run the app with Docker, run `docker-compose up --build` and the app API 
will be available at `http://localhost:3000`.
