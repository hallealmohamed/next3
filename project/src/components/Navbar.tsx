"use client";
import React, { useState } from 'react'
import Link from 'next/link'
import { GrTechnology } from "react-icons/gr";
import { CiMenuBurger } from "react-icons/ci";
import { MdClose } from "react-icons/md";
interface NavbarProps {
  isAdmin: boolean;
}

const Navbar = ({ isAdmin }: NavbarProps) => {
  const [toggole,settoggole]=useState(false);

  return (
    <div className='grid grid-cols-3 '>
      <div>
            <Link href='' className='flex items-center text-3xl font-bold text-red-600' >
            {/* <CiMenuBurger onClick={()=>settoggole(!toggole)}/> */}
                {
                    toggole ?<MdClose  onClick={()=>settoggole(!toggole)}/>:<CiMenuBurger onClick={()=>settoggole(!toggole)}/>
                }
            Cloud
            <GrTechnology  />
            HOSTING
            
            </Link>
            <div className='text-3xl'>
            
            </div>
        </div>
        
       
        <ul className={`flex flex-row justify-around sm:flex-row col-span-2 ${toggole} ? 'flex-row' : 'hidden'}`}>
            <Link href='/' className='' >Home</Link>
            <Link href="/aritcles?pageNumber=1" className=''>articles</Link>
            <Link href='/about' className=''>About</Link>
           {isAdmin && ( <Link href='/admin' className=''>Admin Dashboard</Link>)}

        </ul>
    </div>
  )
}

export default Navbar
