import { NextResponse, type NextRequest } from 'next/server';
import * as jose from 'jose';
import { getToken } from 'next-auth/jwt';

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  // if (req.nextUrl.pathname.startsWith('/checkout')) {
  //   const token = req.cookies.get('token')?.value || '';
  //   try {
  //     await jose.jwtVerify(
  //       token,
  //       new TextEncoder().encode(process.env.JWT_SECRET_SEED)
  //     );
  //     return NextResponse.next();
  //   } catch (error) {
  //     return NextResponse.redirect(
  //       new URL(`/auth/login?p=${req.nextUrl.pathname}`, req.url)
  //     );
  //   }
  // }
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
}

// El _middleware se ejecuta antes de servir las pages que se encuentran en el MISMO DIRECTORIO.
