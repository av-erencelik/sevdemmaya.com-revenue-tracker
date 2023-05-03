import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/app-beta";
import { insertPostSchema, postSchema } from "@/types/schemas";
import slugify from "slugify";
import { checkPostSlug, getPosts, sharePost } from "@/server/posts";
import { NewPost } from "@/db/dbtypes";

export const runtime = "edge";

export async function POST(req: Request) {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json("UNAUTHORIZED", { status: 401, statusText: "You need to login before sharing a post" });
  }

  const body = await req.json();
  const bodyValidation = postSchema.safeParse(body);
  if (!bodyValidation.success) {
    const { errors } = bodyValidation.error;
    return NextResponse.json({ errors }, { status: 403, statusText: errors[0].message });
  }

  const { text } = body;
  const slug = slugify(text);
  const post: NewPost = {
    slug: slug,
    text,
    userId,
  };
  const isSlugUnique = await checkPostSlug(slug, userId);
  if (!isSlugUnique) {
    post.slug = `${slug}-${Date.now()}`;
  }
  const postValidation = insertPostSchema.safeParse(post);
  if (postValidation.success) {
    const response = await sharePost(post);
    if (response.err) {
      return NextResponse.json("Something went wrong", { status: 500, statusText: "Something went wrong" });
    }
  } else {
    const { errors } = postValidation.error;
    return NextResponse.json({ errors }, { status: 403, statusText: errors[0].message });
  }
  return NextResponse.json("Post Created");
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page");
  const { err, data } = await getPosts(Number(page));
  if (err) {
    return NextResponse.json("Something went wrong", { status: 500, statusText: "Something went wrong" });
  }
  return NextResponse.json(data);
}
