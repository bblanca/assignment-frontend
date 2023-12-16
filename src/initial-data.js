
const initialData = {
  lists: {
    'L-1': {
      id: 'L-1',
      title: 'ToDo',
      entryIds: ['task-1A', 'task-2A', 'task-3A', 'task-4A'],
    },
    'L-2': {
      id: 'L-2',
      title: 'InProgress',
      entryIds: ['task-1B', 'task-2B', 'task-3B', 'task-4B'],
    },
    'L-3': {
      id: 'L-3',
      title: 'InProgress',
      entryIds: ['task-1C', 'task-2C', 'task-3C', 'task-4C'],
    }
  },

  entries: {
    'task-1A': { id: 'task-1A', content: 'Take out the garbage' },
    'task-2A': { id: 'task-2A', content: 'Watch my favorite show' },
    'task-3A': { id: 'task-3A', content: 'Charge my phone' },
    'task-4A': { id: 'task-4A', content: 'Cook dinner' },
    'task-1B': { id: 'task-1B', content: 'Take out the garbage' },
    'task-2B': { id: 'task-2B', content: 'Watch my favorite show' },
    'task-3B': { id: 'task-3B', content: 'Charge my phone' },
    'task-4B': { id: 'task-4B', content: 'Cook dinner' },
    'task-1C': { id: 'task-1C', content: 'Take out the garbage' },
    'task-2C': { id: 'task-2C', content: 'Watch my favorite show' },
    'task-3C': { id: 'task-3C', content: 'Charge my phone' },
    'task-4C': { id: 'task-4C', content: 'Cook dinner' },
  },

  listOrder: ['L-1', 'L-2', 'L-3'],



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
