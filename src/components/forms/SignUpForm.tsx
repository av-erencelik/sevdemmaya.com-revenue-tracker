"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/Button";
import { useAuth } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSignUpClerk } from "@/lib/auth";
import { signUpSchema } from "@/types/schemas";
import { SignUpFormData } from "@/types/types";
import { InputGroup } from "./InputGroup";

const SignUpForm = () => {
  const router = useRouter();

  const { isSignedIn } = useAuth();

  const { trigger, isMutating, error } = useSignUpClerk();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });
  const onSubmit = (data: SignUpFormData) => trigger(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-80 flex-col gap-2">
      <InputGroup
        type="text"
        placeholder="Username"
        {...register("username")}
        errorMessage={errors.username?.message}
      />
      <InputGroup errorMessage={errors.email?.message} type="email" placeholder="Email" {...register("email")} />
      <InputGroup
        errorMessage={errors.password?.message}
        type="password"
        placeholder="Password"
        {...register("password")}
      />
      <Button type="submit" variant="default" disabled={isMutating}>
        {isMutating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
          </>
        ) : (
          "Register"
        )}
      </Button>

      <p className="mt-1 px-1 text-center text-xs text-destructive">
        {error !== undefined ? (error instanceof Error ? error.message : "An error occurred") : ""}
      </p>
    </form>
  );
};

export default SignUpForm;
