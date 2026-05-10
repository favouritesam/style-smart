import { NextRequest, NextResponse } from 'next/server';

/**
 * Middleware for Route Protection
 * Checks if user is authenticated before allowing access to protected routes
 * Redirects unauthenticated users to login page
 */

// Define which routes require authentication
const protectedRoutes = [
    '/wardrobe',
    '/daily-outfit',
    '/recommendations',
    '/profile',
    '/onboarding',
];

// Define public routes that don't require authentication
const publicRoutes = ['/', '/login', '/register'];

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check if user has auth token in cookies or localStorage
    // Note: We're checking cookies here, but you should sync with localStorage on client
    const token = request.cookies.get('auth-token')?.value;

    // Check if route is protected
    const isProtectedRoute = protectedRoutes.some((route) =>
        pathname.startsWith(route)
    );

    // If accessing protected route without token, redirect to login
    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // If accessing login/register with valid token, redirect to dashboard
    if ((pathname === '/login' || pathname === '/register') && token) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

// Configure which routes should be checked by middleware
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
