"use client";
import React from 'react'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { DOMAIN } from '@/utils/constants';
import { useRouter } from 'next/navigation';
const AddArticleForm = () => {
  const routeur=useRouter();
    const[title,setTitle]=useState('');
    const[description,setDescription]=useState('');
    
    const formSubmithandler= async(e:React.FormEvent)=>
    {
    e.preventDefault();
   
    if(title==="") return toast.error("Title is required");
    if(description==="") return toast.error("Description is required");
   try {
    await axios.post(`${DOMAIN}/api/articles`,{title,description});
    setTitle('');
    setDescription("");
    toast.success("create withh success");
    routeur.refresh();
   } catch (error:any) {
    toast.error(error?.response?.data.message);
    console.log(error);
   }
    }
  return (
    <form onSubmit={formSubmithandler} className='flex flex-col items-center justify-center'>
      <input className='mb-4 border rounded p-2 w-96 text-xl' type='text' placeholder='Enter title articel'
       value={title} 
       onChange={(e)=>setTitle(e.target.value)}></input>
      {/* <input className='mb-4 border rounded p-2 text-xl' type='password' 
      placeholder='Enter your password'
      value={description}
      onChange={(e)=>setDescription(e.target.value)}
      ></input> */}
      <textarea name="" className='mb-4 p-2 lg:text-xl rounded resize-none w-96' rows={5}  placeholder='enter article description'value={description} onChange={ (e)=>setDescription(e.target.value)}></textarea>
      <button type='submit' className='text-2xl text-white bg-blue-800 p-2 rounded-lg'>Create</button>
    </form>
  )
}

export default AddArticleForm;
