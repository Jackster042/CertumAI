import arcjet, { shield, detectBot, slidingWindow } from "@arcjet/next";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { env } from "./app/data/env/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/",
  "/demo-landing",
  "/api/webhooks(.*)",
]);

const arj = arcjet({
  key: env.ARCJET_KEY!,
  rules: [
    // Shield protects your app from common attacks e.g. SQL injection
    shield({ mode: "LIVE" }),
    // Create a bot detection rule
    detectBot({
      mode: "LIVE", // Blocks requests. Use "DRY_RUN" to log only
      // Block all bots except the following
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
        "CATEGORY:MONITOR",
        "CATEGORY:PREVIEW",
      ],
    }),
    slidingWindow({
      mode: "LIVE",
      interval: "1m",
      max: 100,
    }),
  ],
});

export default clerkMiddleware(async (auth, req) => {
  try {
    // Only run Arcjet if ARCJET_KEY is available
    if (env.ARCJET_KEY) {
      const decision = await arj.protect(req);
      
      if (decision.isDenied()) {
        return new Response(null, { status: 429 });
      }
    }

    if (!isPublicRoute(req)) {
      await auth.protect();
    }
  } catch (error) {
    console.error('Middleware error:', error);
    // Continue without protection rather than crash
    if (!isPublicRoute(req)) {
      await auth.protect();
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
