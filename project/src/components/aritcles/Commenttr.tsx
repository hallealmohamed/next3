"use client";
import React from 'react'
import Link from 'next/link'
import { Comment } from '@prisma/client'
import axios from 'axios';
import { DOMAIN } from '@/utils/constants';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { SingleComment } from '@/utils/type';
interface ArticleProps{
    Articl:SingleComment;
}

const Commenttr = ({Articl}:ArticleProps) => {
    const article=Articl;
    const routeur=useRouter();
 
    const onDelete= async (id: number) => {
    // const routeur=useRouter();
   
    await axios.delete(`${DOMAIN}/api/comments/${id}`);
   
    
    routeur.refresh();
    toast.success("deleted withh success", {autoClose: 1500,  // Notification will auto close after 5 seconds
    });
  };
  const onEdit= async (id: number) => {
    // const routeur=useRouter();
    
    
    
    routeur.replace(`/admin/articles-table/${id}`);
    
  };
  return (
    <tr key={article.id} className="hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {article.text}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {new Date(article.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {article.user.username}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {article.article.title}
              </td>
              <td className="px-6  whitespace-nowrap text-sm text-gray-500">
                
                <button onClick={()=>onDelete(article.id)}
                  
                  className="text-red-600 ml-2 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <Link  href={`/aritcles/${article.article.id}`}
                  
                  className="text-blue-600 hover:text-blue-900"
                >
                  Read More
                </Link>
              </td>
            </tr>
  )
}

export default Commenttr
