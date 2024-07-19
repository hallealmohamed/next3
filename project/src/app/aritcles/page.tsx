
import React from 'react'
import Link from 'next/link';
import Articleitem from '@/components/aritcles/Articleitem';
import { Article } from '@prisma/client';
import SeachArticleForm from '@/components/aritcles/SearchArticlInput';
import Pagination from '@/components/aritcles/Pagination';
import { getAllArticle } from '@/apiCall/artcilApiCall';


const ArtcilesPage = async () => {
  
  
  const pageNumber="1";
  const articles:Article[]=await getAllArticle(pageNumber);
  
  let a = articles.length;
if (a > 6) {
  a = 6;
}
articles.map((article)=>
{
  console.log(article);
});
  console.log(a);
  return (
    <section className='m-auto container px-5 '>
     
    <SeachArticleForm/>
    <div className='flex flex-wrap justify-center items-stretch gap-5'>
     {
      
      articles.slice(0,a).map((art)=>(
        
      <Articleitem article={art} key={art.id}/>
      ))
     }
      </div>
      <Pagination/>
    </section>
  )
}

export default ArtcilesPage;