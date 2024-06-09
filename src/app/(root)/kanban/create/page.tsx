import KabanForm from '@/components/shared/KabanForm'
import React from 'react'


function Page () {



    return (
        <>
<section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10 h-full flex flex-col justify-center items-center">
  <h2 className="wrapper text-2xl font-bold text-[28px] leading-[36px] md:text-[36px] md:leading-[44px]; text-center sm:text-left">Create Kanban</h2>
  
  <div className="wrapper my-8 flex justify-center items-center w-full h-full" >
    <div className="flex justify-center items-center w-full h-full "  >
      <KabanForm type="Create" />
    </div>
  </div>
</section>


        </>
      )
}

export default Page