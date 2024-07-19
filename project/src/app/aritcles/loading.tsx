import React from 'react'
import Link from 'next/link';
const artcile=[1,2,3,4,5,6];
const pages=[1,2,3,4,5];
const LoadingPageArticle = () => {
  return (
    <section className='fix-height container m-auto px-5 animate-pulse'>
      <form  className='flex flex-col my-5 w-full bg-gray-300 h-12 rounded'>
      
      
    </form>
    <div className='flex flex-wrap justify-center items-stretch gap-5'>
    {
        artcile.map((item)=>
        (
           <div
      className="p-5 rounded-lg my-1 shadow-lg  bg-gray-300 w-full md:w-2/5 lg:w-1/4 "
      key={item}
    >
      <h3 className=" bg-gray-300 h-6 "></h3>
      <p className="my-2  bg-gray-300 p-1 h-8 ">
        
      </p>

      <Link
        className=" bg-gray-400 w-full h-12 block r p-1 rounded-lg"
        href={``} 
      >
        
      </Link>
    </div> 
        ))
    }
    </div>
    <div className='flex items-center justify-center mt-2 mb-10'>
        <div className='  bg-gray-300  text-gray-300 py-1 px-3 '>
            Perv
            
            </div>
      {
       pages.map(page=>
       (
       
        <div key={page} className='border  bg-gray-300 text-gray-300 py-1 px-3 '>
            
        {page}
        </div>
       )
       ) 
      }
      <div className=' bg-gray-300  text-gray-300 py-1 px-3 '>
            
            Next
            </div>
    </div>
    </section>
  )
}

export default LoadingPageArticle;
