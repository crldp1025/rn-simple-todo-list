export interface ITaskProps {
  id: number,
  title: string,
  description?: string,
  is_completed: boolean,
  date: string
}

export interface ITaskListProps {
  data: ITaskProps[] | any
}