import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt, { JwtPayload } from 'jsonwebtoken'
 const AUTH_ROUTES=['/login','/register']
 const PUBLIC_ROUTES=['/','/about','/contact','/technicians','/services',]
// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
const pathName=request.nextUrl.pathname

const accessToken=request.cookies.get('accessToken')?.value

const decodedToken=accessToken? jwt.decode(accessToken) as JwtPayload :null

let userRole=null
if(decodedToken){
  userRole=decodedToken.role
}

if(accessToken && AUTH_ROUTES.includes(pathName)){
   if(userRole === "USER"){
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }else if(userRole === "ADMIN"){
            return NextResponse.redirect(new URL('/admin-dashboard', request.url));
        }else if(userRole === "AUTHOR"){
            return NextResponse.redirect(new URL('/author-dashboard', request.url));
        }else{
            return NextResponse.redirect(new URL('/', request.url));
        }
}


// Authenticate Private route.Authorization not include

const isPublicRoute=PUBLIC_ROUTES.some((route)=> pathName === route || pathName.startsWith(route+'/'))

const isAuthRoute=AUTH_ROUTES.some((route)=>pathName === route || pathName.startsWith(route + '/'))

if(!accessToken && !isPublicRoute && !isAuthRoute){
   return NextResponse.redirect(new URL('/login', request.url));
}

// Authorization role base access control
if(pathName.startsWith('/dashboard') && userRole !=="CUSTOMER"){
   return NextResponse.redirect(new URL('/not-found', request.url));
}else if(pathName.startsWith('/technician-dashboard') && userRole!=="TECHNICIAN"){
   return NextResponse.redirect(new URL('/not-found', request.url));
}else if(pathName.startsWith('/admin-dashboard') && userRole!=="ADMIN"){
     return NextResponse.redirect(new URL('/not-found', request.url));
}

  return NextResponse.next()
}

 
export const config = {
  matcher: [
      '/((?!api|_next/static|_next/image|.*\\.png$).*)',

  ]
}