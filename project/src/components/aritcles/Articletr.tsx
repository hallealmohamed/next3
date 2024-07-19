"use client";
import React from 'react'
import Link from 'next/link'
import { Article } from '@prisma/client'
import axios from 'axios';
import { DOMAIN } from '@/utils/constants';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
interface ArticleProps{
    Articl:Article;
}

const Articletr = ({Articl}:ArticleProps) => {
    const article=Articl;
    const routeur=useRouter();
    const onDelete= async (id: number) => {
    // const routeur=useRouter();
   
    await axios.delete(`${DOMAIN}/api/articles/${id}`);
   
    
    routeur.refresh();
    toast.success("deleted withh success");
  };
  const onEdit= async (id: number) => {
    // const routeur=useRouter();
    
    
    
    routeur.replace(`/admin/articles-table/${id}`);
    
  };
  return (
    <tr key={article.id} className="hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {article.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {new Date(article.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button  onClick={()=>onEdit(article.id)}
                  
                  className= " text-indigo-600 btn-primary  hover:text-indigo-900 mr-2"
                >
                  Edit
                </button>
                <button onClick={()=>onDelete(article.id)}
                  
                  className="text-red-600 ml-10 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <Link  href={`/aritcles/${article.id}`}
                  
                  className="text-blue-600 hover:text-blue-900"
                >
                  Read More
                </Link>
              </td>
            </tr>
  )
}

export default Articletr
