"use client"
import React, { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { BoardData , Column as ColumnType, Task as TaskType} from '../../types';
import Column from './Column';
import { title } from 'process';
import { updateTaskColumn } from '@/lib/actions/task.actions';


type BoardProps = {
  boardTask: TaskType;
};


const Board =  (
  { boardTask }: BoardProps
  ) => {

    
    const initialData: BoardData = {
      tasks: Array.isArray(boardTask) ? boardTask.reduce((acc, task) => {
        acc[task._id] = { id: task._id, title: task.title, description: task.description, columnId: task.columnId};
        return acc;
      }, {}) : {},
      columns: {
        'column-1': {
          id: 'column-1',
          title: 'Backlog',
          taskIds: Array.isArray(boardTask) ? boardTask.filter(task => task.columnId === 'column-1').map(task => task._id) : [],
        },
        'column-2': {
          id: 'column-2',
          title: 'To do',
          taskIds: Array.isArray(boardTask) ? boardTask.filter(task => task.columnId === 'column-2').map(task => task._id) : [],
        },
        'column-3': {
          id: 'column-3',
          title: 'In progress',
          taskIds: Array.isArray(boardTask) ? boardTask.filter(task => task.columnId === 'column-3').map(task => task._id) : [],
        },
        'column-4': {
          id: 'column-4',
          title: 'Designed',
          taskIds: Array.isArray(boardTask) ? boardTask.filter(task => task.columnId === 'column-3').map(task => task._id) : [],
        },
      },
      columnOrder: ['column-1', 'column-2', 'column-3', 'column-4'],
    }

    
  const [state, setState] = useState<BoardData>(initialData);

  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const startColumn = state.columns[source.droppableId];
    const finishColumn = state.columns[destination.droppableId];

    if (startColumn === finishColumn) {
      const newTaskIds = Array.from(startColumn.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn: ColumnType = {
        ...startColumn,
        taskIds: newTaskIds,
      };

      const newState: BoardData = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };

      

      setState(newState);
      return;
    }

    // Moving from one column to another
    const startTaskIds = Array.from(startColumn.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart: ColumnType = {
      ...startColumn,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finishColumn.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish: ColumnType = {
      ...finishColumn,
      taskIds: finishTaskIds,
    };

    const newState: BoardData = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    setState(newState);

    // update task columnId

    const updatedTask = await updateTaskColumn(draggableId, destination.droppableId)

    console.log(updatedTask);

  };

  console.log(state);

  return (
      <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex space-x-4">
        {state.columnOrder.map((columnId) => {
          const column = state.columns[columnId];
          const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);

          return <Column key={column.id} column={column} tasks={tasks} />;
        })}
      </div>
    </DragDropContext>
  );
};

export default Board;
