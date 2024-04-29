export interface BlogPost {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  text: string;
}

export type BlogPostInfo = Omit<BlogPost, "text">;

export type BlogData = Promise<BlogPostInfo[]>;
