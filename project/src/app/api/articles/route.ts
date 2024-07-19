import { NextRequest, NextResponse } from "next/server";
import { JWTPayload } from "@/utils/type";
import { verifyToken } from "@/utils/verifyToken";
import { createArticleSchema } from "@/utils/validationShemas";
import { title } from "process";
import { CreateArticleDto } from "@/utils/dtos";
import { Article } from '@prisma/client';
import prisma from "@/utils/db";
import {ARTICLE_PER_PAGE} from'@/utils/constants'
// @method GET
// @route ~/api/articles
// @desc Get  articles by nombre page
// @access public
export async function GET(request: NextRequest) {
 try {

  
  if(request.nextUrl.searchParams.get('pageNumber')===undefined)
  {
    const articles=await prisma.article.findMany();
    return NextResponse.json(articles,{status:200});
  }else{
    const pageNumber=(request.nextUrl.searchParams.get('pageNumber')  ) as string;
    console.log(pageNumber);
    const l=await prisma.article.count();
    
    if(l<ARTICLE_PER_PAGE)
    {
      const articles=await prisma.article.findMany();
      console.log("l:"+l);
      return NextResponse.json(articles,{status:200});
      
    }
    else{const articles=await prisma.article.findMany({
      skip:(parseInt(pageNumber)-1)*ARTICLE_PER_PAGE,
      take:ARTICLE_PER_PAGE
    });console.log("l:"+l);
    return NextResponse.json(articles,{status:200});}
  }
    
 } catch (error) {
  return NextResponse.json({message:"internal server error"}, { status: 500 });
 }
}



// interface Article {
//   id: number;
//   title: string;
//   body: string;
//   userId: number;
// }

// @method POST
// @route ~/api/articles
// @desc Create new article
// @access public
export async function POST(request: NextRequest) {
 try{
  const user=verifyToken(request) as JWTPayload | null;
    if(user===null)
    {
        return NextResponse.json({message:"only loged in user ,access denied "}, { status: 401 });
    }
    
    if(!user.isAdmin)
      {
        return NextResponse.json({message:"only loged in admin ,access denied "}, { status: 401 });
      }
    
  const body = (await request.json()) as CreateArticleDto;
  
  
  const validation= createArticleSchema.safeParse(body);
  if(!validation.success)
  {
    return NextResponse.json({message:validation.error.errors[0].message},{status:400});
  }
  const newArticle:Article=await prisma.article.create(
    {
      data:{
        title:body.title,
        description:body.description,
      }

    }
  );

  
  return NextResponse.json(newArticle, { status: 201 });
 }catch(error)
 {
  return NextResponse.json({message:"internal server error"}, { status: 500 });
 }
}
