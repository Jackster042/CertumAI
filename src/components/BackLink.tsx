import { ArrowLeftIcon } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function BackLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Button
      asChild
      variant="ghost"
      size="sm"
      className={cn("-ml-3", className)}
    >
      <Link
        href={href}
        className="flex items-center gap-2 text-sm text-muted-foreground"
      >
        <ArrowLeftIcon />
        {children}
      </Link>
    </Button>
  );
}
