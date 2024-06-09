"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createTask, updateTask } from "@/lib/actions/task.actions";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { useForm } from 'react-hook-form'  
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Task } from "@/types";
import { taskDefaultValues } from "@/constants";
import { TaskSchema } from "@/lib/validator";
import { useState } from "react"

interface KanbanDialogProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    boardId: string;
    columnId: string;
    type: "Create" | "Update";
    task?: Task ;
  }

  

 function DialogTask({ isOpen, onOpenChange,boardId,columnId,task , type}: KanbanDialogProps) {

  console.log(type)
  console.log(boardId)
  console.log(columnId)
  console.log(task) 

    const initialValues = task && type === "Update" ? {
        ...task,
      } : taskDefaultValues

      const form = useForm<z.infer<typeof TaskSchema>>({
        resolver: zodResolver(TaskSchema),
        defaultValues: initialValues,
      })



 
      async function onSubmit(values: z.infer<typeof TaskSchema>)   {
        
        const formTask = values

        console.log(formTask)
        

        if(type === "Create") {
          await createTask({
              ...formTask,
              boardId,
              columnId:columnId
          }) 
  
          // reset form
  
          form.reset()
  
          onOpenChange(false)

        }
         if(type === "Update") {
          
          await updateTask(task?.id!, {
              ...formTask,
              boardId,
              columnId:columnId
              })
              
                      form.reset()
                
                        onOpenChange(false)
        } 

    }
 
 
    return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-black text-white">
        <DialogHeader>
          <DialogTitle 
            className="text-2xl font-bold "
          >
            {
              type === "Update" ? "Update Task" : "Create A Task"
            }
          
          </DialogTitle>
          <DialogDescription>
           {
              type === "Update" ? "Update the task details" : "Create a new task"
           }
          </DialogDescription>
        </DialogHeader>
        <Form {...form}> 
        <form  onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4 py-4">
        <div className="grid grid-cols-3 items-center">
            <Label htmlFor="title" className=" ">
              Task Name
            </Label>
            <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormControl
              >
              <Input
              id="title"
              className="text-black"
              {...field}
            />
              </FormControl>
            </FormItem>
          )}
        />
           
          </div>
          <div className="grid grid-cols-3 items-center">
            <Label htmlFor="description" className="">
               Description
            </Label>
            <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="col-span-2" >
              <FormControl 
              >
              <Input
              id="description"
              className="text-black"
              {...field}
            />
              </FormControl>
            </FormItem>
          )}
        />
          </div>
        <div 
        className="grid grid-cols-3 items-center text-black"
        >
            <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem className="col-span-2" >
              <FormControl >
                <input type="color" id="favcolor" value="#ff0000" {...field}/>
              </FormControl>
            </FormItem>
            )}
        />

        </div>
        </div>
        <DialogFooter>
          <Button type="submit">
            {
              type === "Update" ? "Update Task" : "Create Task"
            
            }
          </Button>
        </DialogFooter>  
        </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}


export default DialogTask
