import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  // Statik dosyalar için yolları tanımlayın
  const staticFiles = [
    "/_next/static",
    "/_next/image",
    "/favicon.ico",
    "/images",
    "/css",
    "/vendor",
    "/js",
    "/scss",
  ];

  // Statik dosya isteklerini hariç tutmak için kontrol
  if (staticFiles.some((path) => req.nextUrl.pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const publicApis = ["/api/auth/sign-in", "/api/auth/sign-up"];

  // Public API yollari kontrolu
  if (publicApis.some((path) => req.nextUrl.pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // API istekleri için token doğrulaması yapın
  if (req.nextUrl.pathname.startsWith("/api")) {
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    try {
      const decoded = jose.decodeJwt(token);
      if (!decoded.tc_number) {
        return NextResponse.json(
          { success: false, message: "Unauthorized" },
          { status: 401 }
        );
      }

      const headers = new Headers(req.headers);
      headers.set("x-user-info", JSON.stringify(decoded));
      return NextResponse.next({ request: { headers } });
    } catch (error) {
      console.error("Token decoding error:", error);
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
  }

  // Token doğrulaması yaparak diğer yönlendirme işlemlerini gerçekleştirin
  if (token) {
    try {
      const decoded = jose.decodeJwt(token);
      if (decoded.tc_number) {
        if (req.nextUrl.pathname.startsWith("/sign-")) {
          return NextResponse.redirect(new URL("/", req.url));
        }
        return NextResponse.next();
      }
    } catch (error) {
      console.error("Token decoding error:", error);
      return NextResponse.rewrite(new URL("/sign-in", req.url));
    }
  }

  // Token yoksa ve istek sign-in ile başlamıyorsa sign-in sayfasına yönlendirin
  if (!req.nextUrl.pathname.startsWith("/sign-")) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*", "/form/:path*"],
};
