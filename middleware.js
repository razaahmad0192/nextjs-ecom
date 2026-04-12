import { NextResponse } from "next/server";
import { USER_DASHBOARD, WEBSITE_LOGIN } from "./routes/WebsiteRoute";
import { jwtVerify } from "jose";
import { ADMIN_DASHBOARD } from "./routes/AdminPanelRoute";

export async function middleware(request) {
    try {
        const pathName = request.nextUrl.pathname;
        const hasToken = request.cookies.has('access_token');

        if (!hasToken) {

            // If the user is not authenticated and tries to access a protected route, redirect them to the login page
            if (!pathName.startsWith('/auth')) {
                return NextResponse.redirect(new URL(WEBSITE_LOGIN, request.url));
            }

            return NextResponse.next(); // Allow access to authentication routes
 
        }
        // verify token
        const accessToken = request.cookies.get('access_token')?.value;
        const { payload } = await jwtVerify(accessToken, new TextEncoder().encode(process.env.SECRET_KEY));
        const role = payload?.user?.role
        // console.table(payload)
        // console.log(payload.user.role)
        // prevent logged in users from accessing the auth routes
        if (pathName.startsWith('/auth')) {
            return NextResponse.redirect(new URL(role === 'admin' ? ADMIN_DASHBOARD : USER_DASHBOARD, request.nextUrl));
        }


        // protect admin route
        if (pathName.startsWith('/admin') && role !== 'admin') {
             return NextResponse.redirect(new URL(WEBSITE_LOGIN, request.url));
        }

        // protect user route
        if (pathName.startsWith('/my-account') && role !== 'user') {
             return NextResponse.redirect(new URL(WEBSITE_LOGIN, request.url));
        }

        return NextResponse.next(); // Allow access to the requested route
    } catch (error) {
        console.log(error)
        return NextResponse.redirect(new URL(WEBSITE_LOGIN, request.url));
    }
}

export const config = {
    matcher:[
        '/admin/:path*',
        '/my-account/:path*',
        '/auth/:path*'
    ]
}