import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('access_token'); // Lấy token từ cookie hoặc localStorage

  if (!token) {
    // Nếu không có token, chuyển hướng đến trang login
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  return NextResponse.next(); // Nếu có token, tiếp tục yêu cầu
}
// Cấu hình để áp dụng middleware cho các route cụ thể
export const config = {
  matcher: ['/exam/:path*', '/checking'], // Áp dụng cho các route liên quan đến exam
};
