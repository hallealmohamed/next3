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

  
 
    const articles=await prisma.article.findMany();
    return NextResponse.json(articles,{status:200});
  
    
 } catch (error) {
  return NextResponse.json({message:"internal server error"}, { status: 500 });
 }
}