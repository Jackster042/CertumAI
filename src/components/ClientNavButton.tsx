"use client";

import { Button } from "@/components/ui/button";
import { SignInButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function ClientNavButton() {
  const { isSignedIn, isLoaded } = useUser();

  // During loading, show sign in button to prevent flash
  if (!isLoaded) {
    return (
      <SignInButton forceRedirectUrl="/app">
        <Button variant="outline">Sign in</Button>
      </SignInButton>
    );
  }

  if (!isSignedIn) {
    return (
      <SignInButton forceRedirectUrl="/app">
        <Button variant="outline">Sign in</Button>
      </SignInButton>
    );
  }

  return (
    <Button asChild>
      <Link href="/app">Dashboard</Link>
    </Button>
  );
}