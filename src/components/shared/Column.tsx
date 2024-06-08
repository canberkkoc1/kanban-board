"use client"

import React, { useEffect, useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Column as ColumnType, Task as TaskType } from '../../types';
import Task from './Task';

interface ColumnProps {
  column: ColumnType;
  tasks: TaskType[];
}

const Column: React.FC<ColumnProps> = ({ column, tasks }) => {

  const [enabled, setEnabled] = useState(false);

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
    <div className="bg-gray-100 rounded-md p-4 w-64 flex flex-col">
    <h2 className="text-xl font-bold mb-4">{column.title}</h2>
    <Droppable droppableId={column.id}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="bg-white p-2 rounded-md flex-grow"
        >
          {tasks.map((task, index) => (
            <Task key={task.id} task={task} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </div>
  );
};

export default Column;