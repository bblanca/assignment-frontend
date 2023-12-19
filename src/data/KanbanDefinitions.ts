export interface KanbanBoard {
  lists: KanbanList[]
}

export interface KanbanList {
  id: string
  title: string
  items: KanbanItem[]
}

export interface KanbanItem {
  id: string
  content: string
}
