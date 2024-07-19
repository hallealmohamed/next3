import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";


export async function GET(request: NextRequest) {
    try {
     
    
      
        const articles = await prisma.article.count();
      return NextResponse.json(articles, { status: 200 });

      
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
  }