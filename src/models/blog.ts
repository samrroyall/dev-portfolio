export interface BlogPost {
  slug: string;
  title: string;
  subtitle: string;
  blurb: string;
  text: string;
  date: string;
}

export type BlogPostData = Promise<BlogPost | null>;

export const mapRowToBlogPost = (row: any): BlogPost => ({
  slug: row.slug,
  title: row.title,
  subtitle: row.subtitle,
  blurb: row.blurb,
  text: row.text,
  date: new Date(row.createdAt).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }),
});

export type BlogPostInfo = Omit<BlogPost, "text">;

export type BlogData = Promise<BlogPostInfo[]>;

export const mapRowToBlogInfo = (row: any): BlogPostInfo => ({
  slug: row.slug,
  title: row.title,
  subtitle: row.subtitle,
  blurb: row.blurb,
  date: new Date(row.createdAt).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }),
});
