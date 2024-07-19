import { NextRequest, NextResponse } from "next/server";
import { LoginUserDto } from "@/utils/dtos";
import { LoginSchema } from "@/utils/validationShemas";
import prisma from "@/utils/db";
import bcrypt from "bcryptjs";

import { generateJWt ,setCookie} from "@/utils/generateToken";
import { JWTPayload } from "@/utils/type";
// @route ~/api/users/login
// @desc Log in a user
// @access Public

export async function POST(request: NextRequest) {
    try {
        const body = await request.json() as LoginUserDto;

        // Validate the request body
        const validation = LoginSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ message: validation.error.errors[0].message }, { status: 400 });
        }

        // Find the user by email
        const user = await prisma.user.findUnique({
            where: {
                email: body.email,
            },
        });
        
        if(user)
        {
          if ( await bcrypt.compare(body.password,user.password) ) { 
            
            const jwtPayload :JWTPayload={
                id:user.id,
                isAdmin:user.isAdmin,
                username:user.username
            };
           
            const cookie= setCookie(jwtPayload);
            return NextResponse.json({ message: "Account found => login"},
                 { status: 200,
                  headers:{"Set-Cookie":cookie}
             });





          

        }else {
            return NextResponse.json({ message: " invalid  password " }, { status: 400 });
        } 
        } else {
            return NextResponse.json({ message: "Account not found" }, { status: 400 });
        }  
        // Check if the user exists and the password is correct
        
    } catch (error) {
        return NextResponse.json({ message:'Internal Server Error' }, { status: 500 });
    }
}
