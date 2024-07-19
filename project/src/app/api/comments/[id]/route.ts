import { NextRequest, NextResponse } from "next/server";
import { UpdateCommentDto } from "@/utils/dtos";
import { UpdateCommentSchema } from "@/utils/validationShemas";
import prisma from "@/utils/db";
import { JWTPayload } from "@/utils/type";
import { verifyToken } from "@/utils/verifyToken";

interface Props {
  params: {
    id: string;
  };
}

// put update comment
export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const user = verifyToken(request) as JWTPayload | null;
    if (user === null) {
      return NextResponse.json(
        { message: "only logged in user, access denied" },
        { status: 401 }
      );
    }

    const body = (await request.json()) as UpdateCommentDto;
   

    const validation = UpdateCommentSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(validation.error.errors[0].message, {
        status: 401,
      });
    }

    const comment = await prisma.comment.findUnique({
      where: {
        id: parseInt(params.id),
      },
    });

    if (comment?.userId !== user.id) {
      return NextResponse.json(
        { message: "can update comment by user comment only" },
        { status: 401 }
      );
    } else {
      const newComment = await prisma.comment.update({
        where: {
          id: parseInt(params.id),
        },
        data: {
          text: body.text,
        },
      });
      return NextResponse.json(newComment, { status: 200 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}


export async function DELETE(request: NextRequest, { params }: Props) {
    try {
      const user = verifyToken(request) as JWTPayload | null;
      if (user === null) {
        return NextResponse.json(
          { message: "only logged in user, access denied" },
          { status: 401 }
        );
      }
  
      
  
      
      const comment = await prisma.comment.findUnique({
        where: {
          id: parseInt(params.id),
        },
      });
      if (comment === null) {
        return NextResponse.json(
          { message: "comment not found" },
          { status: 401 }
        );
      }
      if (comment?.userId !== user.id && !user.isAdmin) {
        return NextResponse.json(
          { message: "can deleted comment by user comment only" },
          { status: 401 }
        );
      } else {
         await prisma.comment.delete({
          where: {
            id: parseInt(params.id),
          }
        });
        return NextResponse.json({message:"deleted comments"}, { status: 200 });
      }
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
  }
  