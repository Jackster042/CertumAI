import { ThemeToggle } from "@/components/ThemeToggle";
import { SignInButton, UserButton } from "@clerk/nextjs";

export default function HomePage() {
  // console.log(env.DATABASE_URL);
  return (
    <>
      <SignInButton />
      <UserButton />
      <ThemeToggle />
    </>
  );
}
