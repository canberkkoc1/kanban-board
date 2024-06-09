"use client"

import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Task as TaskType } from '../../types';
import { FaRegEdit } from "react-icons/fa";
import DialogTask from './DialogTask';
import { MdDeleteOutline } from "react-icons/md";
import { deleteTask } from '@/lib/actions/task.actions';
import { useRouter } from 'next/navigation';

interface TaskProps {
  task: TaskType;
  index: number;
}

const Task: React.FC<TaskProps> = ({ task, index }) => {

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const router = useRouter();

   async function handleConfirmDelete(id: string) {
    // user confirmed delete'
    const response = confirm('Are you sure you want to delete this task?');
    if (response) {
      await deleteTask(id)
      window.location.reload();
    }
    
  }

  const handleDialogOpenChange = (isOpen: boolean) => {
    setIsDialogOpen(isOpen);

    if (isOpen === false) {
      window.location.reload();
    }
  };


  return (
    <Draggable draggableId={task.id || "task-1"} index={index}>
    {(provided) => (

      


      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={{
          backgroundColor: task.color || 'transparent',
          ...provided.draggableProps.style
        }}
        className={` border rounded-md p-4 mb-2`}
      >
       
        <h3 className="font-semibold leading-6 my-2 text-xl">{task.title}</h3>
        <p className="text-white text-sm">{task.description}</p>
        <div
          className="flex justify-between mt-4"
          >
        <button className="text-white" aria-label="Delete Task" onClick={() => handleConfirmDelete(task.id)}>
          <MdDeleteOutline />
        </button>
          <button className="text-white" aria-label="Edit Task" onClick={() => setIsDialogOpen(true)}>
            <FaRegEdit />
          </button>

          </div>

          
     

          <DialogTask type='Update' task={task} columnId={task.columnId}  isOpen={isDialogOpen} onOpenChange={handleDialogOpenChange}  boardId={task.boardId}/>
      </div>
    )}    
  </Draggable>
  );
};

export default Task;
