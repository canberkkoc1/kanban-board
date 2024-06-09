"use client"
import React from 'react'
import { Button } from '../ui/button'
import { boardDefaultValues } from '../../constants'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { useRouter } from 'next/navigation'
import { BoardDocument } from '@/lib/database/models/board.model'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { KanbanFormSchema } from '@/lib/validator'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { createBoard } from '@/lib/actions/board.actions'
import { handleError } from '@/lib/utils'
import { createTask } from '@/lib/actions/task.actions'


type KabanFormProps = {
    type:"Create" | "Update"
    boardId?: string
    board?: BoardDocument
}

const KabanForm = (
    {type, boardId,board}: KabanFormProps
) => {
    const router = useRouter()

    const initialValues = board && type === "Update" ? {
        ...board,
      } : boardDefaultValues


      const form = useForm<z.infer<typeof KanbanFormSchema>>({
        resolver: zodResolver(KanbanFormSchema),
        

        defaultValues: initialValues,
      })


      async function onSubmit(values: z.infer<typeof KanbanFormSchema>) {
        const boardData = values

        if(type === "Create") {
            // create new board

            const newBoard = await createBoard(boardData)             

            if(newBoard) {
                router.push(`/kanban/${newBoard._id}`)
            }
        }

       /*  if(type === "Update"){
          if(!boardId) {
            router.back()
            return
          }

          try {
            // update board
            const updatedBoard = await updateBoard(boardId, boardData)

            if(updatedBoard) {
              router.push(`/kanban/${updatedBoard._id}`)
            }


          } catch (error) {
            handleError(error)
          }
        } */

       
    }


  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 items-center w-1/3 h-1/2">
      <div className="flex flex-col gap-5 w-full">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input placeholder="Board title" {...field} className="w-full text-black bg-grey-50 h-[54px]  placeholder:text-grey-500 rounded-full p-regular-16 px-4 py-3 border-none focus-visible:ring-transparent !important" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Textarea placeholder="Description" {...field} className="bg-grey-50 text-black flex flex-1 placeholder:text-grey-500 p-regular-16 px-5 py-3 border-none focus-visible:ring-transparent !important; rounded-2xl" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      


      <Button 
        type="submit"
        size="lg"
        disabled={form.formState.isSubmitting}
        className="w-full text-black bg-white hover:bg-violet-300 border border-gray-200"
      >
        {form.formState.isSubmitting ? (
          'Submitting...'
        ): `${type} Board `}</Button>
    </form>
  </Form>
  )
}

export default KabanForm