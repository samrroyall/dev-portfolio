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
