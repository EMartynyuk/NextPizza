import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import authConfig from "./lib/auth.js/auth.config";

const { auth } = NextAuth(authConfig);

// const publicRoutes = ["/"];
const authRoutes = ["/profile"];
const apiAuthPrefix = "/api/auth";
const DEFAULT_LOGIN_REDIRECT = "/not-auth";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  // const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.url));
    }
  }

  if (nextUrl.pathname === "/not-auth" && isLoggedIn) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return;
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
