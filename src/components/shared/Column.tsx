"use client"

import React, { useEffect, useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Column as ColumnType, Task as TaskType } from '../../types';
import Task from './Task';
import { Button } from '../ui/button';
import DialogTask from './DialogTask';
import { useRouter } from 'next/navigation';

interface ColumnProps {
  column: ColumnType;
  tasks: TaskType[];
  boardId: string;
}

const Column: React.FC<ColumnProps> = ({ column, tasks, boardId }) => {

  const router = useRouter();

  const [enabled, setEnabled] = useState(false);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);


  const handleDialogOpenChange = (isOpen: boolean) => {
    setIsDialogOpen(isOpen);
    if (isOpen === false) {
      window.location.reload();
    }
    
  };

  // React 18 in StrictMode was to render the Droppable elements after an animation frame
  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  
  return (
    <div className="bg-[#262626] rounded-md p-4  flex flex-col w-[369px] ">
      <div
        className="flex items-center justify-between mb-4"
      >
          <h2 className="text-2xl font-bold mb-4">{column.title}</h2>
          {
            column.title === 'Backlog' ? <Button className="bg-black text-white w-24 h-10 rounded-md" onClick={() => setIsDialogOpen(true)}>Add Task</Button>
                :  null 
          }
        
      </div>
    <Droppable droppableId={column.id}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className=" p-2 rounded-md flex-grow"
        >
          {tasks.map((task, index) => (
            <Task key={task.id} task={task} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>

    <DialogTask type='Create' columnId={column.id}  isOpen={isDialogOpen} onOpenChange={handleDialogOpenChange}  boardId={boardId}/>
  </div>
  );
};

export default Column;