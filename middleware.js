import { NextResponse } from "next/server";
import { USER_DASHBOARD, WEBSITE_LOGIN } from "./routes/WebsiteRoute";
import { jwtVerify } from "jose";
import { ADMIN_DASHBOARD } from "./routes/AdminPanelRoute";

export async function middleware(request) {
    try {
        const pathName = request.nextUrl.pathname;
        const hasToken = request.cookies.has("access_token");

        if (!hasToken) {
            // Redirect unauthenticated users away from protected routes.
            if (!pathName.startsWith("/auth")) {
                return NextResponse.redirect(new URL(WEBSITE_LOGIN, request.url));
            }

            return NextResponse.next();
        }

        const accessToken = request.cookies.get("access_token")?.value;
        const { payload } = await jwtVerify(
            accessToken,
            new TextEncoder().encode(process.env.SECRET_KEY)
        );
        const role = payload?.user?.role;

        // Logged-in users should not access auth pages.
        if (pathName.startsWith("/auth")) {
            const redirectTo = role === "admin" ? ADMIN_DASHBOARD : USER_DASHBOARD;
            return NextResponse.redirect(new URL(redirectTo, request.url));
        }

        if (pathName.startsWith("/admin") && role !== "admin") {
            return NextResponse.redirect(new URL(WEBSITE_LOGIN, request.url));
        }

        if (pathName.startsWith("/my-account") && role !== "user") {
            return NextResponse.redirect(new URL(WEBSITE_LOGIN, request.url));
        }

        return NextResponse.next();
    } catch (error) {
        console.log(error);
        return NextResponse.redirect(new URL(WEBSITE_LOGIN, request.url));
    }
}

export const config = {
    matcher: ["/admin/:path*", "/my-account/:path*", "/auth/:path*"],
};