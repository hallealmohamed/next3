import { INTERNALS } from "next/dist/server/web/spec-extension/request";
import { NextRequest, NextResponse } from "next/server";
export function middleware(request :NextRequest)
{
    const authToken=request.headers.get('authToken') as string;
    const jwtToken= request.cookies.get('jwtToken');
    const token =jwtToken?.value as string;




    if(!token)
    {
        return NextResponse.json({message:"no token provided,access denied"},{status:401});
    }
}
export const config ={
    matcher:["/api/users/profile/:path*"]
}