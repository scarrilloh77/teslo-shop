import { NextResponse, type NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/checkout')) {
    const session = await getToken({ req, secret: process.env.NEXTAUH_SECRET });

    if (!session) {
      const requestedPage = req.nextUrl.pathname;
      const url = req.nextUrl.clone();
      url.pathname = `/auth/login`;
      url.search = `p=${requestedPage}`;
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }
  if (
    req.nextUrl.pathname.startsWith('/admin') ||
    req.nextUrl.pathname.includes('/api/admin')
  ) {
    const session: any = await getToken({
      req,
      secret: process.env.NEXTAUH_SECRET,
    });

    const requestedPage = req.nextUrl.pathname;

    if (!session) {
      const url = req.nextUrl.clone();
      url.pathname = `/auth/login`;
      url.search = `p=${requestedPage}`;

      if (requestedPage.includes('/api')) {
        return new Response(JSON.stringify({ message: 'No autorizado' }), {
          status: 401,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }

      return NextResponse.redirect(url);
    }

    const validRoles = ['admin', 'super-user', 'SEO'];

    if (
      !validRoles.includes(session.user.role) &&
      req.nextUrl.pathname.includes('/api/admin')
    ) {
      return new Response(JSON.stringify({ message: 'No autorizado' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    if (!validRoles.includes(session.user.role)) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/checkout/:path*', '/admin/:path*', '/api/admin/:path*'],
};
