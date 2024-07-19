import React from 'react';
import Link from 'next/link';
import { CgMenuGridR } from "react-icons/cg";
import { MdOutlineArticle } from "react-icons/md";
import { FaRegComments } from "react-icons/fa";
const AdminSidebarPage = () => {
  return (
    <div className="max-h-full flex flex-col">
      <Link href="/admin" className='flex items-center text-lg lg:text-2xl font-semibold'>
        <CgMenuGridR className='text-3xl me-1'/>
        <span className='hidden lg:block'>Dashboard</span>
      </Link>
      <ul>
        <Link href="/admin/articles-table" className='flex items-center text-xl mb-5 lg:border-b border-gray-300 hover:border-yellow-200 hover:text-yellow-200 transition'>
          <MdOutlineArticle className='hidden lg:block'/>
          <span className='hidden lg:block'>Articles</span>
        </Link>
        <Link href="/admin/comments-table" className='flex items-center text-xl mb-5 lg:border-b border-gray-300 hover:border-yellow-200 hover:text-yellow-200 transition'>
          <FaRegComments className='hidden lg:block'/>
          <span className='hidden lg:block'>Comments</span>
        </Link>
      </ul>
    </div>
  );
}

export default AdminSidebarPage;
