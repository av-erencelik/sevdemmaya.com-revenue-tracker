"use client";
import { SWRConfig } from "swr";
import Feed from "./Feed";
import { PostWithUser } from "@/db/dbtypes";
import { unstable_serialize } from "swr/infinite";

const FeedContainer = ({ fallback }: { fallback: PostWithUser[] }) => {
  return (
    <SWRConfig value={{ fallback: { [unstable_serialize((page) => "/api/post?page=1")]: fallback } }}>
      <Feed />
    </SWRConfig>
  );
};

export default FeedContainer;
