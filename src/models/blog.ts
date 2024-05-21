export interface BlogPost {
  slug: string;
  title: string;
  subtitle: string;
  blurb: string;
  date: string;
  text: string;
}

export type BlogPostInfo = Omit<BlogPost, "text">;

export type BlogData = Promise<BlogPostInfo[]>;

export type BlogPostData = Promise<BlogPost | null>;
