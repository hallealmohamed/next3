import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";
import { JWTPayload } from "@/utils/type";
import { UpdateUserDto } from "@/utils/dtos";
import bcrypt from "bcryptjs"
interface Props{
    params:{
        id:string
    }
}
export async function DELETE(request: NextRequest, { params }: Props) {
    try {
      const user = await prisma.user.findUnique({where:{id:parseInt(params.id)}});
    if (!user) {
      return NextResponse.json({ message: "compte not found" }, { status: 404 });
    }
    
    
    const userFromToken= verifyToken(request);
    if(userFromToken===null)
    {
        return NextResponse.json({message:"not token"}, { status: 401 });
    }
    else{
        if(user.id===userFromToken.id )
        {
          const id=user.id ;
  await prisma.comment.deleteMany({
  where:{
    articleId: id
  }
 });
            await prisma.user.delete(
      {
        where:{
          id:parseInt(params.id)
        }
      }
    );
    return NextResponse.json({message:"user deleted"}, { status: 400 });
   
        }
        else
        {
             return NextResponse.json({message:"only user himself can deleted"}, { status: 403 });
        }
    }

    
    
    } catch (error) {
      return NextResponse.json({message:"internal server error"}, { status: 500 });
    }
  }

  // get profile by id

export async function GET(request: NextRequest, { params }: Props) {
try {
  const user = await prisma.user.findUnique({where:{id:parseInt(params.id)},
select:{
  id:true,
  email:true,
  username:true,
  createdAt:true,
  isAdmin:true
}});
    if (!user) {
      return NextResponse.json({ message: "compte not found" }, { status: 404 });
    }
    const userFromToken = verifyToken(request) as JWTPayload | null;
    if(userFromToken  === null || userFromToken .id !== user.id)
    {
      return NextResponse.json({ message: " you are not allowed" }, { status: 403 });
    }
    return NextResponse.json(user, { status: 200 });
} catch (error) {
  
  return NextResponse.json({message:"internal server error"}, { status: 500 });

}
}

// put  update profile


export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const user = await prisma.user.findUnique({where:{id:parseInt(params.id)}});
      if (!user) {
        return NextResponse.json({ message: "compte not found" }, { status: 404 });
      }
      

      const userfromtoken= verifyToken(request) as JWTPayload | null;
      if(userfromtoken === null || userfromtoken.id !== user.id)
      {
        return NextResponse.json({ message: " you are not allowed" }, { status: 403 });
      }
      const body=await request.json() as UpdateUserDto;
      
      if(body.password){
      const salt=await bcrypt.genSalt(10);
      body.password  =await bcrypt.hash(body.password as string ,salt) ;
    }
      const updateUser =await prisma.user.update({
        where:{
          id: parseInt(params.id)
        },
        data:{
          username:body.username,
          email:body.email,
          password:body.password
        }
      })
      const {password,...other}=updateUser;
      return NextResponse.json(other, { status: 200 });
  } catch (error) {
    
    return NextResponse.json({message:"internal server error"}, { status: 500 });
  
  }
  }
  