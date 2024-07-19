import React from 'react'

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyTokenForPage } from '@/utils/verifyToken';
import {  getAllComments } from '@/apiCall/artcilApiCall';
import { Article } from '@prisma/client';
import Link from 'next/link';
import Commenttr from '@/components/aritcles/Commenttr';
import { SingleComment } from '@/utils/type';
const CommentstablePage = async() => {
  const token=cookies().get("jwtToken")?.value;
  if(!token) redirect('/');
  const payload=verifyTokenForPage(token);
  if(payload?.isAdmin===false) redirect('/');
  const comments: SingleComment[] | undefined = await getAllComments();
  
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Text
            </th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created At
            </th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Username
            </th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
             Article
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
          {comments?.map((comment) => (
            <Commenttr key={comment.id} Articl={comment}/>
                      ))}
        </tbody>
      </table>
    </div>
    
  )
}

export default CommentstablePage;
