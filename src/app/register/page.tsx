import SignUpForm from "@/components/forms/SignUpForm";
import Image from "next/image";
import React from "react";
export const runtime = "edge";
export const revalidate = 0;
const SignUpPage = () => {
  return (
    <main className="flex min-h-[100vh] flex-col items-center justify-center gap-10 bg-cyan-50">
      <div className="flex flex-col items-center">
        <Image src="/images/logo.png" alt="logo" height={25} width={25} />
        <h1 className="mt-2 scroll-m-20 text-2xl font-semibold tracking-tight text-primary">Register</h1>
      </div>

      <SignUpForm />
    </main>
  );
};

export default SignUpPage;
