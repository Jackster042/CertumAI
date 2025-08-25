import { ThemeToggle } from "@/components/ThemeToggle";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { env } from "@/app/data/env/server";

export default function HomePage() {
  console.log(env.DATABASE_URL);
  return (
    <>
      <SignInButton />
      <UserButton />
      <ThemeToggle />
    </>
  );
}
