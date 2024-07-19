import { NextRequest,NextResponse } from "next/server";
import { RegisterUserDto } from "@/utils/dtos";
import { RegisterSchema } from "@/utils/validationShemas";
import prisma from "@/utils/db";
import bcrypt from "bcryptjs"

import { JWTPayload } from "@/utils/type";
import { setCookie} from "@/utils/generateToken";
// 2 method

// @route ~/api/users/register
// @desc create New user 
// access public


export async function POST(request:NextRequest) {
    try {
    const body=await request.json() as RegisterUserDto;
    const validation=RegisterSchema.safeParse(body);
    if(!validation.success)
    {
    return NextResponse.json({message:validation.error.errors[0].message},{status:400})
    }
    const user=await prisma.user.findUnique({
        where:{
            email:body.email
        }
    });
    if(user)
    {
        return NextResponse.json({message:"email is alerdy exist"}, { status: 500 });
    }
    else{
        const salt=await bcrypt.genSalt(10);
        const passwordhash=await bcrypt.hash(body.password,salt);
        const userr=await prisma.user.create(
            {
                data:{
                    username:body.username,
                    email:body.email,
                    password:passwordhash,
                  },
            select:{
                username:true,
                id:true,
                isAdmin:true
            }
            }
        )
        const jwtPayload :JWTPayload={
            id:userr.id,
            isAdmin:userr.isAdmin,
            username:userr.username
        };
        const cookie=setCookie(jwtPayload);
        return NextResponse.json({message:userr}, { status: 201 
            ,headers:{"Set-Cookie":cookie}
        });
    }
    
    } catch (error) {
        return NextResponse.json({message:"internal server error"}, { status: 500 });
    }
    
}