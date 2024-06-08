import KabanForm from '@/components/shared/KabanForm'
import React from 'react'


function Page () {



    return (
        <>
          <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
            <h3 className="wrapper h3-bold text-center sm:text-left">Create Kanban</h3>
          </section>
    
          <div className="wrapper my-8">
            <KabanForm  type="Create" />
          </div>
        </>
      )
}

export default Page