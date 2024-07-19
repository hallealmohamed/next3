import { CommentwithUser } from '@/utils/type';
import React from 'react'
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
interface ComentProps{
  comment:CommentwithUser
}
const CommentItme = ({comment}:ComentProps) => {
  
  return (
    <div className='mb-5 rounded-lg p-3 bg-gray-200 border-2 border-gray-300 w-full h-full md:w-2/5 lg:w-3/4'>
      <div className='flex items-center justify-between mb-2'>
        <strong className='text-gray-800 uppercase'>
        {comment.user.username}
        </strong>
        <strong className='bg-yellow-700 px-1 rounded-lg text-white'>
            {new Date(comment.createdAt).toDateString()}
        </strong>
        </div>
       <p className='text-gray-800 mb-2'>{comment.text}</p>
       <div className=' flex justify-end items-center'>
        <FaEdit className='text-green-600 text-xl cursor-pointer me-3'/>
        <FaTrash className='text-green-600 text-xl cursor-pointer me-3'/>

       
      </div>
    </div>
  )
}

export default CommentItme
