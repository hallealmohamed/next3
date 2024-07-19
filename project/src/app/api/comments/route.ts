import { NextRequest,NextResponse } from "next/server";
import { CreateCommentDto } from "@/utils/dtos";
import { CreateCommentSchema} from "@/utils/validationShemas";
import prisma from "@/utils/db";
import { JWTPayload } from "@/utils/type";
import { verifyToken } from "@/utils/verifyToken";

//create new comment
export async function POST(request:NextRequest) {
    try {
        
    const user=verifyToken(request) as JWTPayload | null;
    if(user===null)
    {
        
        return NextResponse.json({message:"only loged in user ,access denied "}, { status: 401 });
    }
    
    const body= await request.json() as CreateCommentDto;
    const validation=CreateCommentSchema.safeParse(body);
    
    if(!validation.success)
    {
        
        return NextResponse.json(validation.error.errors[0].message, { status: 401 });
    }
   
    const newComment=await  prisma.comment.create({
        data:{
            text:body.text,
            articleId:body.articleId,
            userId:user.id
        }
    });
   
    
    return NextResponse.json(newComment, { status: 201 });
    } catch (error) {
        return NextResponse.json({message:"internal server error"}, { status: 500 });
    }
    
}

export async function GET(request:NextRequest) {
    try {
        const user=verifyToken(request) as JWTPayload | null;
    // if(user===null)
    // {
    //     return NextResponse.json({message:"only loged in user ,access denied "}, { status: 401 });
    // }
    // if(user.isAdmin==false)
    // {
    //     return NextResponse.json({message:"only loged in admin ,access denied "}, { status: 401 });
    // }
    const comments = await prisma.comment.findMany({
        include: {
            user: true,
            article:true
        }
    });
    
     return NextResponse.json(comments, { status: 200 });
    } catch (error) {
        return NextResponse.json({message:"internal server error"}, { status: 500 });
    }
}