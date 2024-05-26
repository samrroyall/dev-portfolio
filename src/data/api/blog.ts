import { desc, eq } from "drizzle-orm";
import { type LibSQLDatabase } from "drizzle-orm/libsql";
import {
  mapRowToBlogInfo,
  mapRowToBlogPost,
  type BlogData,
  type BlogPostData,
} from "../../models/blog";
import { blogposts } from "../../models/db";

export const getBlogData = async (db: LibSQLDatabase): BlogData => {
  const rows = await db
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

  return rows.map(mapRowToBlogInfo);
};

export const getBlogPostData = async (
  db: LibSQLDatabase,
  slug: string,
): BlogPostData => {
  const rows = await db
    .select()
    .from(blogposts)
    .where(eq(blogposts.slug, slug));

  return rows.length > 0 ? mapRowToBlogPost(rows[0]) : null;
};
