import { desc, eq } from "drizzle-orm";
import { type LibSQLDatabase } from "drizzle-orm/libsql";
import { type BlogPost, type BlogPostInfo } from "../models/blog";
import { blogposts } from "../models/db";

export const createBlogPost = async (
  db: LibSQLDatabase,
  data: Omit<BlogPost, "id" | "createdAt" | "lastModifiedAt">,
): Promise<void> => {
  await db.transaction(async (tx) => {
    await tx.insert(blogposts).values({
      ...data,
      createdAt: new Date(),
      lastModifiedAt: new Date(),
    });
  });
};

export const deleteBlogPost = async (
  db: LibSQLDatabase,
  blogPostId: number,
): Promise<void> => {
  await db.transaction(async (tx) => {
    await tx.delete(blogposts).where(eq(blogposts.id, blogPostId));
  });
};

export const getBlogPost = async (
  db: LibSQLDatabase,
  blogPostId: number,
): Promise<BlogPost | null> => {
  const result = await db
    .select()
    .from(blogposts)
    .where(eq(blogposts.id, blogPostId));

  return result[0] ?? null;
};

export const getBlogPostBySlug = async (
  db: LibSQLDatabase,
  blogPostSlug: string,
): Promise<BlogPost | null> => {
  const result = await db
    .select()
    .from(blogposts)
    .where(eq(blogposts.slug, blogPostSlug));

  return result[0] ?? null;
};

export const getBlogPosts = async (
  db: LibSQLDatabase,
): Promise<BlogPostInfo[]> =>
  await db
    .select({
      id: blogposts.id,
      slug: blogposts.slug,
      title: blogposts.title,
      subtitle: blogposts.subtitle,
      blurb: blogposts.blurb,
      createdAt: blogposts.createdAt,
      lastModifiedAt: blogposts.lastModifiedAt,
    })
    .from(blogposts)
    .orderBy(desc(blogposts.createdAt));

export const modifyBlogPost = async (
  db: LibSQLDatabase,
  blogPostId: number,
  data: Omit<BlogPost, "id" | "createdAt" | "lastModifiedAt">,
): Promise<void> => {
  await db.transaction(async (tx) => {
    await tx
      .update(blogposts)
      .set({
        ...data,
        lastModifiedAt: new Date(),
      })
      .where(eq(blogposts.id, blogPostId));
  });
};
