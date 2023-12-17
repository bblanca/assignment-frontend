
const initialData = {
  lists: {
    'L-A': {
      id: 'L-A',
      title: 'ToDo',
      itemIds: ['task-1', 'task-2', 'task-3', 'task-4'],
    },
    'L-B': {
      id: 'L-B',
      title: 'InProgress',
      itemIds: ['task-5', 'task-6', 'task-7', 'task-8'],
    },
    'L-C': {
      id: 'L-C',
      title: 'Finished',
      itemIds: ['task-9', 'task-10', 'task-11', 'task-12'],
    }
  },

  items: {
    'task-1': { id: 'task-1', content: 'Task 1' },
    'task-2': { id: 'task-2', content: 'Task 2' },
    'task-3': { id: 'task-3', content: 'Task 3' },
    'task-4': { id: 'task-4', content: 'Task 4' },
    'task-5': { id: 'task-5', content: 'Task 5' },
    'task-6': { id: 'task-6', content: 'Task 6' },
    'task-7': { id: 'task-7', content: 'Task 7' },
    'task-8': { id: 'task-8', content: 'Task 8' },
    'task-9': { id: 'task-9', content: 'Task 9' },
    'task-10': { id: 'task-10', content: 'Task 10' },
    'task-11': { id: 'task-11', content: 'Task 11' },
    'task-12': { id: 'task-12', content: 'Task 12' },
  },

  listOrder: ['L-A', 'L-B', 'L-C'],

  itemIdCounter: 12,





  /*
  initialLists1: 
  [
    { 
      listID: 'L1', listName: 'TODO', listEntries:
      [
        { entryID: 0, entryText: 'Task 1A' },
        { entryID: 1, entryText: 'Task 2A' },
        { entryID: 2, entryText: 'Task 3A' }
      ]
    },
    { 
      listID: 'L2', listName: 'inProgress', listEntries:
      [
        { entryID: 0, entryText: 'Task 1B' },
        { entryID: 1, entryText: 'Task 2B' },
        { entryID: 2, entryText: 'Task 3B' }
      ]
    }, 
    { listID: 'L3', listName: 'Finished' , listEntries:
      [
        { entryID: 6, entryText: 'Task 1C' },
        { entryID: 7, entryText: 'Task 2C' },
        { entryID: 8, entryText: 'Task 3C' }
      ]
    }
  ] 
*/
};

export default initialData;
