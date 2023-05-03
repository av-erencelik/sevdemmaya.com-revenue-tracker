import useSWRInfinite from "swr/infinite";
import { PostWithUser } from "@/db/dbtypes";
import { PostData } from "@/types/types";
import { toast } from "react-toastify";
import { Fetcher } from "swr";
import useSWRMutation from "swr/mutation";

export const usePost = () => {
  const mutate = async (url: string, { arg }: { arg: PostData }) => {
    return await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(arg),
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        } else {
          toast.success("Post created", {
            className: "bg-cyan-200",
          });
        }
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  };
  return useSWRMutation("/api/post", mutate);
};

export const useGetFeed = () => {
  const getKey = (pageIndex: number, previousPageData: PostWithUser[]) => {
    if (previousPageData && !previousPageData.length) return null; // reached the end
    return `/api/post?page=${pageIndex + 1}`; // SWR key
  };
  const fetcher: Fetcher<PostWithUser[]> = async (url: string) => {
    return await fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(res.statusText);
        }
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  };
  return useSWRInfinite(getKey, fetcher, {
    revalidateOnFocus: false,
  });
};
