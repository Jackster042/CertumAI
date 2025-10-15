"use client";

import { Button } from "@/components/ui/button";
import { SignInButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import dynamic from "next/dynamic";

// Client component with auth logic
function AuthenticatedNavButton() {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded || !isSignedIn) {
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

// Dynamic import with no SSR for client-only rendering
const NavButtonClient = dynamic(() => Promise.resolve(AuthenticatedNavButton), {
  loading: () => (
    <SignInButton forceRedirectUrl="/app">
      <Button variant="outline">Sign in</Button>
    </SignInButton>
  ),
  ssr: false
});

export default NavButtonClient;