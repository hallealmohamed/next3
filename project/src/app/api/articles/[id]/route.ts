import { NextRequest, NextResponse } from 'next/server';

import { UpdateArticleDto } from "@/utils/dtos";

import prisma from "@/utils/db";
import { JWTPayload } from "@/utils/type";
import { verifyToken } from "@/utils/verifyToken";

interface Props {
  params: {
    id: string;
  };
}

// @method GET
// @route /api/articles
// @desc Get single article by id
// @access public
export async function GET(request: NextRequest, { params }: Props) {
  console.log("api:" + params.id);
  try {
    const article = await prisma.article.findUnique({ where: { id: parseInt(params.id) } });
    console.log("apiarticle:" + article?.title);
    if (!article) {
      return NextResponse.json({ message: "Article not found" }, { status: 404 });
    }
    const comments = await prisma.comment.findMany({
      where: {
        articleId: parseInt(params.id)
      },
      include: {
        user: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });
    
    return NextResponse.json({article,comments}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "internal server error" }, { status: 500 });
  }
}


// @method PUT
// @route /api/articles
// @desc Update single article by id
// @access public
export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const user=verifyToken(request) as JWTPayload | null;
    if(user===null)
    {
        return NextResponse.json({message:"only loged in user ,access denied "}, { status: 401 });
    }
    
    if(!user.isAdmin)
      {
        return NextResponse.json({message:"only loged in admin ,access denied "}, { status: 401 });
      }
    
    const article = await prisma.article.findUnique({where:{id:parseInt(params.id)}});
  if (!article) {
    return NextResponse.json({ message: "Article not found" }, { status: 404 });
  }

  const body = (await request.json() )as UpdateArticleDto;
  // Assuming there's logic to update the article here
  const articleupdate=await prisma.article.update(
    {
      where:{id:parseInt(params.id)},
      data:{
        title:body.title,
        description:body.description
      }
    }
  );

  return NextResponse.json(articleupdate, { status: 200 });
  } catch (error) {
    return NextResponse.json({message:"internal server error"}, { status: 500 });
  }
}

// @method DELETE
// @route /api/articles
// @desc Delete single article by id
// @access public
export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const user=verifyToken(request) as JWTPayload | null;
    if(user===null)
    {
        return NextResponse.json({message:"only loged in user ,access denied "}, { status: 401 });
    }
    
    if(!user.isAdmin)
      {
        return NextResponse.json({message:"only loged in admin ,access denied "}, { status: 401 });
      }
    
    const article = await prisma.article.findUnique({where:{id:parseInt(params.id)}});
  if (!article) {
    return NextResponse.json({ message: "Article not found" }, { status: 404 });
  }
  const id=article.id ;
  await prisma.comment.deleteMany({
  where:{
    articleId: id
  }
 });
  await prisma.article.delete(
    {
      where:{
        id:parseInt(params.id)
      }
    }
  );
  
  return NextResponse.json({message:"article deleted with comment "}, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({message:"internal server error"}, { status: 500 });
  }
}
