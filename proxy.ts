import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
    const url = request.nextUrl.clone();
    const hostname = request.headers.get('host') || '';

    // Bypass middleware for API routes, static files, Next.js internal paths, etc.
    if (
        url.pathname.startsWith('/api') ||
        url.pathname.startsWith('/_next') ||
        url.pathname.includes('.') ||
        url.pathname.startsWith('/images/') ||
        url.pathname.startsWith('/favicon')
    ) {
        return NextResponse.next();
    }

    let agentSubdomain = null;
    let baseDomain = '';

    // Extract the subdomain based on known production or development environments
    if (hostname.includes('questrealtymi.com')) {
        const parts = hostname.split('.');
        if (parts.length >= 3 && parts[parts.length - 3] !== 'www') {
            agentSubdomain = parts[parts.length - 3];
            baseDomain = 'questrealtymi.com';
        }
    } else if (hostname.includes('questsold.com')) {
        const parts = hostname.split('.');
        if (parts.length >= 3 && parts[parts.length - 3] !== 'www') {
            agentSubdomain = parts[parts.length - 3];
            baseDomain = 'questsold.com';
        }
    } else if (hostname.includes('localhost:3000')) {
        const parts = hostname.split('.');
        if (parts.length >= 2 && parts[0] !== 'localhost') {
            agentSubdomain = parts[0];
            baseDomain = 'localhost';
        }
    }

    let response = NextResponse.next();

    if (agentSubdomain) {
        // Only rewrite if we are on exactly the root slash.
        // We only want to rewrite '/' to the agent's profile page. 
        if (url.pathname === '/') {
            url.pathname = `/agent/${agentSubdomain}`;
            response = NextResponse.rewrite(url);
        }

        // Always ensure the referrer cookie is preserved for 30 days
        // Set cookie across the wildcard domain so subdomains and root domains can access it
        const cookieDomain = baseDomain === 'localhost' ? 'localhost' : `.${baseDomain}`;

        response.cookies.set('agentReferrer', agentSubdomain, {
            domain: cookieDomain,
            path: '/',
            maxAge: 60 * 60 * 24 * 30, // 30 days
            httpOnly: true,            // secure for server side reading
            sameSite: 'lax'
        });
    }

    return response;
}
