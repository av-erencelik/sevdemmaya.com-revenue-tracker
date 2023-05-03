import { post, user } from "./schema";
import { InferModel } from "drizzle-orm";

export type User = InferModel<typeof user>; // return type when queried
export type NewUser = InferModel<typeof user, "insert">; // insert type
export type Post = InferModel<typeof post>; // return type when queried
export type NewPost = InferModel<typeof post, "insert">; // insert type
export type PostWithUser = {
  post: Post;
  user: {
    username: string;
  } | null;
}; // select type with joined user
