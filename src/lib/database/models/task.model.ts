import { Document, Schema, model, models } from "mongoose";
import { Content } from "next/font/google";
import { string } from "zod";


export interface ITask extends Document {
    _id: string;
    title: string;
    description: string;
    boardId: string;
    columnId: string;
}


const TaskSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    boardId: {
        type: Schema.Types.ObjectId,
        ref: 'Board'
    },
    columnId:{
        type:String,
        required:true
    },
    color: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    
    }
});


export const Task = models.Task || model<ITask>('Task', TaskSchema);


