import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_LOCALES = ['en', 'fr'];
const DEFAULT_LOCALE = 'en';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Nếu truy cập vào `/` (root) thì redirect sang `/en`
  if (pathname === '/') {
    const locale = DEFAULT_LOCALE;
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  // Nếu đã có locale thì cho qua
  const isMissingLocale = PUBLIC_LOCALES.every(
    (locale) => !pathname.startsWith(`/${locale}`)
  );

  if (isMissingLocale) {
    return NextResponse.redirect(new URL(`/${DEFAULT_LOCALE}${pathname}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/((?!_next|favicon.ico|api|static).*)'], // áp dụng cho tất cả route trừ static files
};
