import { mockFunc } from "../../utils";
import { type BlogPost, type BlogPostInfo } from "../models/blog";

export const getBlogData = (): Promise<BlogPostInfo[]> => mockFunc([]);

export const getBlogPostData = (_id: string): Promise<BlogPost | null> =>
  mockFunc(null);
