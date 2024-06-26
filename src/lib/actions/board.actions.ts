"use server"

import { CreateBoardParams } from "@/types"
import { connectToDatabase } from "../database"

import { revalidatePath } from 'next/cache'
import  Board  from "../database/models/board.model"
import { handleError } from "../utils"


export async function createBoard(boards: CreateBoardParams) {
    try {
        await connectToDatabase()
    
    
        const newBoard = await Board.create(boards)
    
        return JSON.parse(JSON.stringify(newBoard))
      } catch (error) {
        handleError(error)
      }
}

export async function getAllBoards() {
    try {
        await connectToDatabase()
    
        const boards = await Board.find()
    
        return JSON.parse(JSON.stringify(boards))
      } catch (error) {
        handleError(error)
      }
}