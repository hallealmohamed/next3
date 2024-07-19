import React from 'react'
import Link from 'next/link';
import { getArtcilBasesearchText } from '@/apiCall/artcilApiCall';
import { Article } from '@prisma/client';
import Articleitem from '@/components/aritcles/Articleitem';
interface SearchArticlePageProps{
  searchParams:{searchText:string};
}
const  SearchPage = async({searchParams}:SearchArticlePageProps) => {
  const artciles=await getArtcilBasesearchText(searchParams.searchText);
  if(artciles.length==0)
    {
      return (
        <section className='fix-height container m-auto px-5 '>
          <h2 className='text-2xl font-bold mb-2 mt-7 text-gray-700'>
            Articles based on 
            <span className='ms-1 text-red-600 text-3xl mx-9 font-bold'>{searchParams.searchText}</span>
           not found
          </h2>
          
          
         
        </section>
      )
    }
    else{
      return (
        <section className='fix-height container m-auto px-5 '>
          <h1 className='text-2xl font-bold mb-2 mt-7 text-gray-700'>
            Articles based on 
            <span className='ms-1 text-green-700 text-3xl font-bold'>{searchParams.searchText}</span>
        
          </h1>
          
          <div className='flex flex-wrap justify-center items-stretch gap-5'>
         {
          artciles.slice(0,6).map((art)=>(
          <Articleitem article={art} key={art.id}/>
          ))
         }
          </div>
         
        </section>
      )
    }
  
}

export default SearchPage;