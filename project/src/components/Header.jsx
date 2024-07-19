import React from 'react'
import Navbar from '@/components/Navbar'
import Link from 'next/link';
import { cookies } from 'next/headers';
import { verifyTokenForPage } from '@/utils/verifyToken';
import LogoutButton from './LogoutButton';
const Header = () => {
 const token= cookies().get("jwtToken")?.value ||"";
  const pyload=verifyTokenForPage(token);
 return (
    <header className=' h-24 font-bold bg-gray-200 mp-10 grid grid-flow-col grid-col-5 grid-rows-1 relative h-100px flex items-center justify-between pb-40px pt-40px border-b-4 border-gray-600'>
      
        <Navbar isAdmin={pyload?.isAdmin || false}/>
        <div className='flex justify-between p'>
            {
              pyload?(<>
              <strong className='text-blue-800 md:text-xl capitalize'>
                {pyload?.username}
              </strong>
              <LogoutButton/>
              </>
            ):(
            <>
              <Link href="/login" className='btn btn-neutral m-2'>login</Link>
              <Link href="/register" className='btn btn-neutral m-2'>register</Link></>)
            }
        </div>
    </header>
  )
}

export default Header;
