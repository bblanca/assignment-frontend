import { KanbanBoard } from './KanbanDefinitions'
import { v4 as uuidv4 } from 'uuid'

export const initialData: KanbanBoard = {
  lists: [
    {
      id: 'L-A',
      title: 'ToDo',
      items: [
        { id: uuidv4(), content: 'Task 1' },
        { id: uuidv4(), content: 'Task 2' },
        { id: uuidv4(), content: 'Task 3' },
        { id: uuidv4(), content: 'Task 4' },
      ],
    },
    {
      id: 'L-B',
      title: 'InProgress',
      items: [
        { id: uuidv4(), content: 'Task 5' },
        { id: uuidv4(), content: 'Task 6' },
        { id: uuidv4(), content: 'Task 7' },
        { id: uuidv4(), content: 'Task 8' },
      ],
    },
    {
      id: 'L-C',
      title: 'Finished',
      items: [
        { id: uuidv4(), content: 'Task 9' },
        { id: uuidv4(), content: 'Task 10' },
        { id: uuidv4(), content: 'Task 11' },
        { id: uuidv4(), content: 'Task 12' },
      ],
    },
  ],
}
