export interface BlogPost {
  id: number;
  title: string;
  subtitle: string;
  date: string;
  text: string;
}

export type BlogPostInfo = Omit<BlogPost, "text">;

export type BlogData = Promise<BlogPostInfo[]>;

export type BlogPostData = Promise<BlogPost | null>;
