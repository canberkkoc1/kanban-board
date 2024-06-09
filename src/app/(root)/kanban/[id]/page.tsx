import Board from '@/components/shared/KabanBoard'
import { getAllTasksByBoardId } from '@/lib/actions/task.actions'
import { PageParamProps } from '@/types'
import React from 'react'

const page = async ({ params: { id } } :PageParamProps) => {
  const tasks = await getAllTasksByBoardId(id)


  return (
    <section className="flex flex-col items-center justify-center bg-primary-50 bg-dotted-pattern bg-contain">
      <div
        className="flex flex-col items-center justify-center w-full max-w-3xl px-4 py-8 mx-auto text-center"
      >
        <h1
          className="mb-4 text-4xl font-bold leading-none text-white md:text-5xl"
        >
          Kanban Board
        </h1>
        <p
          className="mb-8 text-lg text-white"
        >
          This is a kanban board. You can drag and drop the cards to change their order.
        </p>
      </div>

        <Board boardTask={tasks}  boardId={id}/>
    </section>

  )
}

export default page