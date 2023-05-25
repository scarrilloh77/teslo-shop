import { NextResponse, type NextRequest } from 'next/server';
import * as jose from 'jose';

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/checkout')) {
    const token = req.cookies.get('token')?.value || '';
    try {
      await jose.jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET_SEED)
      );
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(
        new URL(`/auth/login?p=${req.nextUrl.pathname}`, req.url)
      );
    }
  }
}

// El _middleware se ejecuta antes de servir las pages que se encuentran en el MISMO DIRECTORIO.
