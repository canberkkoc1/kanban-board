"use client"

import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Task as TaskType } from '../../types';

interface TaskProps {
  task: TaskType;
  index: number;
}

const Task: React.FC<TaskProps> = ({ task, index }) => {
 
  return (
    <Draggable draggableId={task.id || "task-1"} index={index}>
    {(provided) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className="bg-white border rounded-md p-4 mb-2"
      >
        <h3 className="font-semibold text-base leading-6 my-2 ">{task.title}</h3>
        <p className="text-gray-600">{task.description}</p>
      </div>
    )}
  </Draggable>
  );
};

export default Task;
