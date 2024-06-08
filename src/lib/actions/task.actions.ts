"use server"

import { CreateTaskParams } from "@/types"
import { connectToDatabase } from "../database"
import { Task } from "../database/models/task.model"
import { handleError } from "../utils"



export async function createTask(task:CreateTaskParams) {
    try {
        await connectToDatabase()
    
        const newTask = await Task.create(task)
    
        return JSON.parse(JSON.stringify(newTask))
      } catch (error) {
        handleError(error)
      }
}

export async function getTaskByBoardId(boardId: string) {
    try {
        await connectToDatabase()
    
        const tasks = await Task.find({ boardId })
    
        return JSON.parse(JSON.stringify(tasks))
      } catch (error) {
        handleError(error)
      }
}


export async function updateTaskColumn(taskId: string, columnId: string) {
    try {
        await connectToDatabase()
    
        const task = await Task.findByIdAndUpdate(
            taskId,
            { columnId },
            
        )

        if(!task) {
            throw new Error("Task not found")
        }

        return JSON.parse(JSON.stringify(task))
        }
            catch (error) {
                handleError(error)
            }

}