"use client";
import React from 'react'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
const SeachArticleForm = () => {
  const router=useRouter();
    const[email,setEmail]=useState('');
    
    
    const formSubmithandler=(e:React.FormEvent)=>
    {
    e.preventDefault();
   
    router.push(`aritcles/search?searchText=${email}`);

    }
  return (
    <form onSubmit={formSubmithandler} className='flex flex-col my-5 w-full '>
      <input className='h-full border-none rounded m-5 p-3 text-gray-900' type='search' placeholder='Search for Article'
       value={email} 
       onChange={(e)=>setEmail(e.target.value)}></input>
      
    </form>
  )
}

export default SeachArticleForm;
