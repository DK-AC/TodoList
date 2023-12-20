import {AxiosResponse} from 'axios'
import {ModelTaskType, ResponseType, TaskResponseType, TaskType} from './types'
import {instance} from './instance'


export const tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<TaskResponseType>(`todo-lists/${todolistId}/tasks`)
  },
  createTask(todolistId: string, title: string) {
    return instance.post<{ title: string }, AxiosResponse<ResponseType<{
      item: TaskType
    }>>>(`todo-lists/${todolistId}/tasks`, {title})
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<AxiosResponse<ResponseType>>(`todo-lists/${todolistId}/tasks/${taskId}`)
  },
  updateTask(todolistId: string, taskId: string, model: ModelTaskType) {
    return instance.put<ModelTaskType, AxiosResponse<ResponseType<{
      item: TaskType
    }>>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
  },
}

