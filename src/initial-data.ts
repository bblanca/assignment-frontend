
export interface IKanban {
  lists: IKanbanList[]
  }


export interface IKanbanList {
  id: string,
  title: string,
  items: IKanbanItem[]

}

export interface IKanbanItem {
    id: string,
    content: string
}


export const initialData: IKanban = {
  lists: [
    {
      id: 'L-A',
      title: 'ToDo',
      items: [
        { id: '', content: 'Task 1' },
        { id: '', content: 'Task 2' },
        { id: '', content: 'Task 3' },
        { id: '', content: 'Task 4' },],
    },
    {
      id: 'L-B',
      title: 'InProgress',
      items: [
        { id: '', content: 'Task 5' },
        { id: '', content: 'Task 6' },
        { id: '', content: 'Task 7' },
        { id: '', content: 'Task 8' }],
    },
    {
      id: 'L-C',
      title: 'Finished',
      items: [
        { id: '', content: 'Task 9' },
        { id: '', content: 'Task 10' },
        { id: '', content: 'Task 11' },
        { id: '', content: 'Task 12' },],
    }],
};
