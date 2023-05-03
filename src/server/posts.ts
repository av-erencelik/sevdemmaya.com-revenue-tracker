import "server-only";
import db from "@/db/db";
import { NewPost } from "@/db/dbtypes";
import { post, user } from "@/db/schema";
import { eq, and, desc } from "drizzle-orm/expressions";
export const checkPostSlug = async (slug: string, userId: string) => {
  const postWithSameSlug = await db
    .select({ slug: post.slug })
    .from(post)
    .where(and(eq(post.userId, userId), eq(post.slug, slug)));
  return postWithSameSlug.length > 0;
};
export const sharePost = async (newPost: NewPost) => {
  try {
    const response = await db.insert(post).values(newPost);
    return { err: null, response };
  } catch (err) {
    return { err, response: null };
  }
};

export const getPosts = async (page: number) => {
  try {
    const postFeed = await db
      .select({
        post: post,
        user: {
          username: user.username,
        },
      })
      .from(post)
      .orderBy(desc(post.created_at))
      .limit(10)
      .offset((page - 1) * 10)
      .leftJoin(user, eq(post.userId, user.userId));
    return { err: null, data: postFeed };
  } catch (err) {
    console.log(err);
    return { err, data: null };
  }
};
