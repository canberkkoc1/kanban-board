"use client"

import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Task as TaskType } from '../../types';
import { FaRegEdit } from "react-icons/fa";
import DialogTask from './DialogTask';

interface TaskProps {
  task: TaskType;
  index: number;
}

const Task: React.FC<TaskProps> = ({ task, index }) => {

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogOpenChange = (isOpen: boolean) => {
    setIsDialogOpen(isOpen);
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
        <div className="flex justify-end">
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
