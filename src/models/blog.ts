export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  blurb: string;
  text: string;
  createdAt: Date;
  lastModifiedAt: Date;
}

export type BlogPostInfo = Omit<BlogPost, "text">;

export const mapRowToBlogInfo = (row: any): BlogPostInfo => ({
  id: row.id,
  slug: row.slug,
  title: row.title,
  subtitle: row.subtitle,
  blurb: row.blurb,
  createdAt: row.createdAt,
  lastModifiedAt: row.lastModifiedAt,
});

export const mapRowToBlogPost = (row: any): BlogPost => ({
  ...mapRowToBlogInfo(row),
  text: row.text,
});

export type BlogData = Promise<BlogPostInfo[]>;

export type BlogPostData = Promise<BlogPost | null>;
