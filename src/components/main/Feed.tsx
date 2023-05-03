import { Button } from "../ui/Button";
import { Loader2 } from "lucide-react";
import { useGetFeed } from "@/lib/posts";
import PostCard from "./PostCard";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

const Feed = () => {
  const { data, size, setSize, error, isLoading, mutate, isValidating } = useGetFeed();
  // concatted arrays in data because every page returns as individual array and we need to concat them to actually use
  const posts = data ? data.flat(1) : [];
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < 10);
  return (
    <LayoutGroup>
      <AnimatePresence>
        <motion.div layout className="flex w-full flex-col items-center gap-3 md:w-[750px]">
          {posts?.map(({ post, user }, index) => {
            return <PostCard key={post.slug} post={post} user={user} />;
          })}
          <Button onClick={() => setSize(size + 1)} disabled={isReachingEnd || isValidating}>
            {isValidating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
              </>
            ) : (
              "Load More"
            )}
          </Button>
        </motion.div>
      </AnimatePresence>
    </LayoutGroup>
  );
};

export default Feed;
