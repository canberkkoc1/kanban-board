// types.ts
export interface Task {
    id: string ;
    title: string;
    description: string;
    columnId: string;
    color: string;
    boardId: string;
  }

 
  
  export interface Column {
    id: string;
    title: string;
    taskIds: string[];
  }
  
  export interface BoardData {
    tasks: {
      [key: string]: Task;
    };
    columns: {
      [key: string]: Column;
    };
    columnOrder: string[];
  }


  export type CreateBoardParams = {
    title: string;
    description: string;
    
  }


  export type PageParamProps = {
    params: { id: string }
  }

  export type CreateColumnParams = {
    title: string;
    boardId: string;
  }[]

  export type CreateTaskParams = {
    title: string;
    description: string;
    boardId: string;
    columnId: string;
    color: string;
  }
 


  