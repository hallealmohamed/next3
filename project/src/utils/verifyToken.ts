import { NextRequest } from "next/server";
;
import { JwtPayload, verify } from "jsonwebtoken";
import { JWTPayload } from "@/utils/type";







export function verifyToken(request:NextRequest):JwtPayload|null
{
    try {
        
    const jwtToken=request.cookies.get("jwtToken"); 
    const token=jwtToken?.value as string;
    const userFromToken=verify(token,process.env.JWT_SECERT as string) as JWTPayload;
    return userFromToken;
        
    } catch (error) {
        return null;
    }
}
export function verifyTokenForPage(token:string):JwtPayload|null
{
    try {
        
   
    const userFromToken=verify(token,process.env.JWT_SECERT as string) as JWTPayload;
    if(!userFromToken) return null;
    return userFromToken;
        
    } catch (error) {
        return null;
    }
}
