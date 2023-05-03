import PostForm from "@/components/forms/PostForm";
import FeedPrefetch from "@/components/main/FeedPrefetch";
import { buttonVariants } from "@/components/ui/Button";
import LogoutButton from "@/components/ui/LogoutButton";
import { SignedIn, SignedOut } from "@clerk/nextjs/app-beta";
import Link from "next/link";
export const runtime = "edge";
export const revalidate = 0;
export default async function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-20 bg-cyan-50 pb-10">
      <div className="mt-40 flex grow items-end justify-center">
        <h1 className="scroll-m-20 bg-gradient-to-r from-ring to-primary bg-clip-text text-center text-4xl font-extrabold tracking-tight text-transparent sm:max-w-[65%] lg:text-6xl">
          Next 13-Drizzle Orm-Planetscale-Clerk-Edge Runtime Template
        </h1>
      </div>

      <main className="flex grow-[4] flex-col items-center gap-10">
        <SignedIn>
          <LogoutButton />
          <PostForm />
        </SignedIn>
        <SignedOut>
          <div className="flex gap-5">
            <Link href="/register" className={buttonVariants({ variant: "default" })}>
              Register
            </Link>
            <Link href="/login" className={buttonVariants({ variant: "default" })}>
              Login
            </Link>
          </div>
        </SignedOut>
        {/* @ts-expect-error Async Server Component */}
        <FeedPrefetch />
      </main>
    </div>
  );
}
