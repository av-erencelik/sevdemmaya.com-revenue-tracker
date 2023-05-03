import { PostWithUser } from "@/db/dbtypes";
import FeedContainer from "./FeedContainer";
export const runtime = "edge";
export const revalidate = 0;
import { getPosts } from "@/server/posts";

const prefetchPosts = async () => {
  const response = await getPosts(1);
  if (response.err !== null || response.data === null) {
    throw new Error("Something happened. Please, try again later.");
  } else {
    dateObjectsToIsoStringPosts(response.data);
    return response.data;
  }
  function dateObjectsToIsoStringPosts(posts: any) {
    return posts.forEach((post: any) => {
      post.post.created_at = post.post.created_at.toISOString();
      post.post.updated_at = post.post.updated_at.toISOString();
    });
  }
};

const FeedPrefetch = async () => {
  const postFeed = await prefetchPosts();
  return <FeedContainer fallback={postFeed} />;
};

export default FeedPrefetch;
