"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/Button";
import { postSchema } from "@/types/schemas";
import { PostData } from "@/types/types";
import { usePost } from "@/lib/posts";
import { Loader2 } from "lucide-react";
import { Textarea } from "../ui/Textarea";
import { useSWRConfig } from "swr";
import { unstable_serialize } from "swr/infinite";
const PostForm = () => {
  const { mutate } = useSWRConfig();
  const { error, trigger, isMutating } = usePost();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostData>({
    resolver: zodResolver(postSchema),
  });
  const onSubmit = async (data: PostData) => {
    await trigger(data);
    mutate(unstable_serialize((page) => "/api/post?page=1"));
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex w-[300px] flex-col gap-1">
        <Textarea placeholder="Share a post" {...register("text")} errorMessage={errors.text?.message} />
        <Button type="submit" variant="default">
          {isMutating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
            </>
          ) : (
            "Share"
          )}
        </Button>
      </div>
      <p className="mt-1 px-1 pb-2 text-center text-sm text-destructive">
        {error !== undefined ? (error instanceof Error ? error.message : "An error occurred") : ""}
      </p>
    </form>
  );
};

export default PostForm;
