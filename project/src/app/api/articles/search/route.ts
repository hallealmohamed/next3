import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";


export async function GET(request: NextRequest) {
    try {
      const searchText = (request.nextUrl.searchParams.get('searchText') ) as string;
    if(searchText)
    {
        console.log(searchText);
        const articles = await prisma.article.findMany({
        where: {
          title: {
            contains: searchText,
            mode: 'insensitive' // This makes the search case-insensitive
          }
        }
      });
      return NextResponse.json(articles, { status: 200 });
  }
  else{
    const articles = await prisma.article.findMany({take:6})
    return NextResponse.json(articles, { status: 200 });
  }
      
      
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
  }