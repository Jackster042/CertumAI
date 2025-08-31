import { ThemeToggle } from "@/components/ThemeToggle";
import { PricingTable } from "@/services/clerk/components/PricingTable";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { Loader2Icon } from "lucide-react";
import { Suspense } from "react";

export default function HomePage() {
  // console.log(env.DATABASE_URL);
  return (
    <>
      <div className="p-4 space-y-4">
        <div className="flex items-center gap-4">
          <SignInButton />
          <UserButton />
          <ThemeToggle />
        </div>
        <PricingTable />
      </div>
    </>
  );
}
