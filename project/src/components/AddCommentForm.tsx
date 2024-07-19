"use client";
import React from 'react'
import { useState } from 'react';
import {  toast } from 'react-toastify';

import { JWTPayload } from "@/utils/type";
import { JwtPayload } from 'jsonwebtoken';
import axios from 'axios';
import { DOMAIN } from '@/utils/constants';
import { useRouter } from 'next/navigation';
import { Article } from '@prisma/client';
interface AddCommentFormProps {
  articled: string;

}

const AddCommentForm = ({ articled}: AddCommentFormProps) => {
  const [email, setEmail] = useState('');
  const router=useRouter();

    const formSubmithandler=async(e:React.FormEvent)=>
    {
    if(email==='') return toast.error("Please wirte something")
    e.preventDefault();
  const text=email;
  
    const articleId=parseInt(articled);
    
    try {
      await axios.post(`${DOMAIN}/api/comments`, {
          text,
          articleId
      });
      toast.success("Create Comment successful", {
        autoClose: 1500,  // Notification will auto close after 5 seconds
    });
      
  } catch (error: any) {
      toast.error(error?.response?.data.message);
      console.log(error);
  }
  router.refresh();
    

    }
  return (
    <form onSubmit={formSubmithandler} className='flex flex-col items-center my-5 w-full w-full h-full md:w-2/5 lg:w-3/4'>
      <input className='text-xl rounded-lg p-2 w-full bg-white focus:shadow-md' type='search' placeholder='Add a comment'
       value={email} 
       onChange={(e)=>setEmail(e.target.value)}></input>
      <button type='submit'  className='bg-green-700  text-white mt-2 p-1 w-min text-xl rounded-lg hover:bg-green-900 transition'>
       Comment 
      </button>
    </form>
  )
}

export default AddCommentForm;
