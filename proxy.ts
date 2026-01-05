import { NextResponse, NextRequest } from 'next/server' // This function can be marked `async` if using `await` inside
import { getDataFromToken } from './helpers/getDataFromToken';
import User from './models/UserModel';
import { connect } from '@/db/config';


connect();

export async function proxy(request: NextRequest) {

  const path = request.nextUrl.pathname;
  const isAdminPath = path.startsWith('/dashboard/shop')

  const isPublicPath = path === '/login' || path === '/signup' || path === '/'
  const token = request.cookies.get('token')?.value || '';
  if(token !== ''){
    const userId = await getDataFromToken(request);
    const user = await User.findById(userId).select("-password -_id -__v")

    // if user is worker and trying to go admin url 
    if(!user.isOwner && isAdminPath && token){
      return NextResponse.redirect(new URL('/dashboard/worker', request.nextUrl))
    }

    // if user is admin and trying to go worker url  
    if(user.isOwner && !isAdminPath && token){
      return NextResponse.redirect(new URL('/dashboard/shop', request.nextUrl))
    }

  }

  // if user try to go to login or shop and he already log in then go to dashboard
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
  }

  // if user is not login and trying to go to the dashboard 
  if (!isPublicPath && !token) {
    const loginUrl = new URL('/login', request.nextUrl)
    loginUrl.searchParams.set('error', 'unauthorized')
    return NextResponse.redirect(loginUrl)
  }
}

export const config = {
  matcher: [
    '/',
    '/dashboard/:path*',
    '/login',
    '/signup'
  ],
}