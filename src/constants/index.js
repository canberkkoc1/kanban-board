export const boardDefaultValues = {
    title: '',
    description: '',
  }

export const taskDefaultValues = {
    title: '',
    description: '',
    boardId: '',
    columnId: '',
  }


  export const columsDefaultValues = {
    'column-1': {
      id: 'column-1',
      title: 'Backlog',
      taskIds: [],
    },
    'column-2': {
      id: 'column-2',
      title: 'To do',
      taskIds: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'In progress',
      taskIds: [],
    },
    'column-4': {
      id: 'column-4',
      title: 'Designed',
      taskIds: [],
    },
  }


  export const columnOrder =  ['column-1', 'column-2', 'column-3', 'column-4']