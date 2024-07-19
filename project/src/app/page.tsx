import React from 'react'
import Hero from'@/app/home/Hero'
import WebHostingPlan from'@/app/home/WebHostingPlan'
const HomePage = () => {
  
  return (
    <section>
      <Hero/>
      <h2 className='text-center mt-10 text-3xl font-bold'>
        Choose Your web Hosting Plan 
      </h2>
      {/* container m-auto flex justify-center items-center my-7 flex-wrap flex-col */}
      <div className=' container m-auto grid grid-cols-3 gap-0'>
        <WebHostingPlan/>
        <WebHostingPlan/>
        <WebHostingPlan/>

      </div>
    
      </section>
  )
}

export default HomePage;
