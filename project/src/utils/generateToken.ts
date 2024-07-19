import { sign } from "jsonwebtoken";
import { JWTPayload } from "./type";
import  {serialize} from 'cookie';
export function generateJWt(jwtPayload:JWTPayload):string
{
    const privateKey=process.env.JWT_SECERT as string;
    const token=sign(jwtPayload,privateKey ,{
        expiresIn:'30d'
    });
    return(token);
}
// set cookie
export function setCookie(jwtPayload:JWTPayload) :string{
    const token =generateJWt(jwtPayload);
    const cookie= serialize("jwtToken",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV==='production',
        sameSite:'strict',
        path:'/',
        maxAge:60*60*24*30,//30 day
    });
    return cookie;
}