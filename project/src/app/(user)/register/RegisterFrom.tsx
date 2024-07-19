"use client";
import React from 'react'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import { useRouter } from 'next/navigation';
import axios from 'axios';
const DOMAIN="http://localhost:3000";
const RegisterFrom = () => {
  const router=useRouter();
    const[email,setEmail]=useState('');
    const[username,setUsername]=useState('');
    const[password,setPassword]=useState('');
    const[loading,setLoading]=useState(false);
    const formSubmithandler= async(e:React.FormEvent)=>
    {
    e.preventDefault();
    console.log({email,password});
    if(email==="") return toast.error("Email is required");
    if(password==="") return toast.error("Password is required");
    if(username==="") return toast.error("Username is required");
    try {
      setLoading(true);
      await axios.post(`${DOMAIN}/api/users/register`,{email,password,username});
      router.replace('/');
      router.refresh();
      setLoading(false);
    } catch (error:any) {
      toast.error(error?.response?.data.message);
      console.log(error);
    }
    }
  return (
    <form onSubmit={formSubmithandler} className='flex flex-col items-center justify-center'>
    <input className='mb-4 border rounded p-2 text-xl' type='password' 
      placeholder='Enter your Username'
      value={username}
      onChange={(e)=>setUsername(e.target.value)}
      ></input>
      <input className='mb-4 border rounded p-2 text-xl' type='email' placeholder='Enter your email'
       value={email} 
       onChange={(e)=>setEmail(e.target.value)}></input>
      <input className='mb-4 border rounded p-2 text-xl' type='password' 
      placeholder='Enter your password'
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      ></input>
      <button type='submit' className='text-2xl text-white bg-blue-800 p-2 rounded-lg'>{loading?"loading...":"Register"}</button>
    </form>
  )
}

export default RegisterFrom;