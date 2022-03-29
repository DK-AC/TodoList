
export type TaskType = {
    addedDate: string
    deadline: string
    description: string
    id: string
    order: number
    priority: number
    startDate: string
    status: number
    title: string
    todoListId: string
}
export type TasksStateType = { [key: string]: Array<TaskType> }
export type TaskResponseType = {
    error: string | null
    totalCount: number
    items: TaskType[]
}
export type ModelTaskType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}
export type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: string[]
    data: D
}


