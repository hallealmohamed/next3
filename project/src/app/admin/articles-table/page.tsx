
import React from 'react'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyTokenForPage } from '@/utils/verifyToken';
import { getAllArticle, getAllArticlee } from '@/apiCall/artcilApiCall';
import { Article } from '@prisma/client';
import Link from 'next/link';
import Articletr from '@/components/aritcles/Articletr';
const handleEdit = (id: number) => {
  console.log(`Edit article with id ${id}`);
};



const handleReadMore = (id: number) => {
  console.log(`Read more about article with id ${id}`);
};
const ArticlestablePage = async() => {
   const token=cookies().get("jwtToken")?.value;
  if(!token) redirect('/');
  const payload=verifyTokenForPage(token);
  if(payload?.isAdmin===false) redirect('/');
  const articles:Article[]=await getAllArticlee();
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created At
            </th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Read More
            </th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <Articletr key={article.id} Articl={article}/>
                      ))}
        </tbody>
      </table>
    </div>
    
  )
}

export default ArticlestablePage;
