import React from 'react'
import { CommentwithUser } from '@/utils/type';
import Link from 'next/link'
import AddCommentForm from '@/components/AddCommentForm';
import CommentItme from '@/components/CommentItme';
import { getSingalArticle } from '@/apiCall/artcilApiCall';
import { SingleArticle } from '@/utils/type';
import { DOMAIN } from '@/utils/constants';
import axios from 'axios';
import { verifyTokenForPage } from '@/utils/verifyToken';
import { cookies } from 'next/headers';
import { JWTPayload } from "@/utils/type";
import { Comment } from '@prisma/client';
interface SingleArticlePageProps
{
    params:{
        id:string
    }
}
const SingleArticlPage =async ({params}: SingleArticlePageProps) => {
  const jwtToken = cookies().get('jwtToken');
  const token = jwtToken?.value as string;
  const userFromToken = verifyTokenForPage(token) as JWTPayload | null;
 
    const articleId=params.id;
    const response = await axios.get(`${DOMAIN}/api/articles/${articleId}`);
    const data = response.data;
    
    const article=data.article;
    const comments=data.comments;
    
  return (
    <div className='flex items-center justify-center w-full  flex-col'>
    <div
      className="p-5 rounded-lg my-1 shadow-lg border-2 border-gray-400 hover:bg-slate-200 w-full h-full md:w-2/5 lg:w-3/4 "
      key={article.id}
    >
      <h3 className="text-xl font-bold text-gray-900 mt-4 ">{"hbbbn"+article.description}</h3>
      <div className='text-gray-400'>
        {new Date(article.createdAt).toDateString()}
      </div>
      <p className="my-2 text-xl text-gray-700 p-1 mt-5 ">
        {"hbbbn"+article.description}
      </p>

      <Link
        className="text-xl bg-purple-700 hover:bg-purple-800 w-full block text-center p-1 mt-20 text-white rounded-lg"
        href={`/aritcles`} 
      >
        Aricles
      </Link>
    </div>
    <AddCommentForm articled={params.id}  />
    <h4 className='text-xl text-gray-800 font-semibold'>Comments</h4>
    {
      comments?.map((comment:CommentwithUser)=>(
      <CommentItme comment={comment} key={comment.id}/>
      ))
     }
    
    


    </div>
  )
}

export default SingleArticlPage;