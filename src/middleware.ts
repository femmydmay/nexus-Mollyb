import { NextResponse, NextRequest } from "next/server";

import { verifyJWT } from "./lib/token";
import { getErrorResponse } from "./lib/helpers";



interface AuthenticatedRequest extends NextRequest {
  user: {
    id: string;
  };
}

let redirectToLogin = false;

export async function middleware(req: NextRequest) {
  let token: string | undefined;

  if (req.cookies.has("token")) {
    token = req.cookies.get("token")?.value;
  } else if (req.headers.get("Authorization")?.startsWith("Bearer ")) {
    token = req.headers.get("Authorization")?.substring(7);
  }

  if (req.nextUrl.pathname.startsWith("/login") && (!token || redirectToLogin))
    return;


  if (
    !token &&
    (req.nextUrl.pathname.startsWith("/api/listings") || req.method !== "GET")
  ) {
    return getErrorResponse(
      401,
      "You are not logged in. Please provide a token to gain access."
    );
  }


  if (
    !token &&
    (req.nextUrl.pathname.startsWith("/api/plans") || req.method !== "GET")
  ) {
    return getErrorResponse(
      401,
      "You are not logged in. Please provide a token to gain access."
    );
  }



  if (
    !token &&
    (req.nextUrl.pathname.startsWith("/api/subscriptions") ||
      req.method !== "GET")
  ) {
    return getErrorResponse(
      401,
      "You are not logged in. Please provide a token to gain access."
    );
  }

  if (
    !token &&
    (req.nextUrl.pathname.startsWith("/api/users") && req.method !== "GET")
  ) {
    return getErrorResponse(
      401,
      "You are not logged in. Please provide a token to gain access."
      );
    }
    

  const response = NextResponse.next();


  try {
    if (token) {
      
      const { sub } = await verifyJWT<{ sub: string }>(token);


      
      response.headers.set("X-USER-ID", sub);


      
      (req as AuthenticatedRequest).user = { id: sub };
 
    
      
    }
  } catch (error) {

    
    redirectToLogin = true;
    if (req.nextUrl.pathname.startsWith("/api")) {
      return getErrorResponse(401, "Token is invalid or user doesn't exists");
    }

    return NextResponse.redirect(
      new URL(`/login?${new URLSearchParams({ error: "badauth" })}`, req.url)
    );
  }

   if (!token && req.nextUrl.pathname.startsWith("/admin")) {
     return NextResponse.redirect(new URL("/login", req.url));
   }
  
  if (!token && req.nextUrl.pathname.startsWith("/dashboard")) {
  return NextResponse.redirect(new URL("/login", req.url));
  }
  const authUser = (req as AuthenticatedRequest).user;

  
  
  if (req.url.startsWith("/login") && !authUser) {
    
  
     return;
   }
  // if (!authUser) {
  //   return NextResponse.redirect(
  //     new URL(
  //       `/login?${new URLSearchParams({
  //         error: "badauth",
  //         forceLogin: "true",
  //       })}`,
  //       req.url
  //     )
  //   );
  // }

  
 
  if (req.url.includes("/login") && authUser) {
    return NextResponse.redirect(new URL("/dashboard/profile", req.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    '/login',
    '/admin/:path*',
    "/api/users/:path*",
    "/api/plans/:path*",
    "/api/subscriptions/:path*",
    "/api/listings/create",
    "/api/listings/top-listing",
    "/api/uploads",
    '/api/email/:path*',

  ],
};  
