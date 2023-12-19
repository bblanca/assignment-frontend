export interface IKanbanBoard {
  lists: IKanbanList[]
}

export interface IKanbanList {
  id: string
  title: string
  items: IKanbanItem[]
}

export interface IKanbanItem {
  id: string
  content: string
}
