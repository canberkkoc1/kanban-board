import { Document, Schema, model, models } from "mongoose";



export interface BoardDocument extends Document {
   _id: string;
    title: string;
    description: string;
    creadtedAt: Date;
    updatedAt: Date;
}



const BoardSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    taskIds: {
        type:Schema.Types.ObjectId,
        ref:'Task'
    },
       
    createdAt: Date,
    updatedAt: Date
});


 const Board = models.Board || model<BoardDocument>('Board', BoardSchema);

 export default Board;


