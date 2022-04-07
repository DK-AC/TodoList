import React, {ChangeEvent, useState} from "react";
import {tasksApi} from "../dal/api/tasks-api";

export default {
    title: 'API/Tasks'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')

    const getTasksHandle = () => {
        tasksApi.getTasks(todolistId)
            .then(res => setState(res.data))
    }
    const onChangeValueHandle = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }

    return (
        <>
            {JSON.stringify(state)}
            <div>
                <input placeholder={'todolistId'} value={todolistId} onChange={onChangeValueHandle}/>
                <button onClick={getTasksHandle}>Get Tasks</button>
            </div>
        </>
    )
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const createTaskHandle = () => {
        tasksApi.createTask(todolistId, title)
            .then(res => setState(res.data))
    }
    const onChangeTodolistIdHandle = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }
    const onChangeTitleHandle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        <>
            {JSON.stringify(state)}
            <div>
                <input placeholder={'todolistId'} value={todolistId} onChange={onChangeTodolistIdHandle}/>
                <input placeholder={'title'} value={title} onChange={onChangeTitleHandle}/>
                <button onClick={createTaskHandle}>Create Task</button>
            </div>
        </>
    )
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')

    const deleteTaskHandle = () => {
        tasksApi.removeTask(todolistId, taskId)
            .then(res => setState(res.data))
    }
    const onChangeTodolistIdHandle = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }
    const onChangeTaskIdHandle = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskId(e.currentTarget.value)
    }

    return (
        <>
            {JSON.stringify(state)}
            <div>
                <input placeholder={'todolistId'} value={todolistId} onChange={onChangeTodolistIdHandle}/>
                <input placeholder={'taskId'} value={taskId} onChange={onChangeTaskIdHandle}/>
                <button onClick={deleteTaskHandle}>Delete Task</button>
            </div>
        </>
    )
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const updateTaskHandle = () => {

        const model = {title, deadline: '', startDate: '', status: 0, priority: 0, description: '',}

        tasksApi.updateTask(todolistId, taskId, model)
            .then(res => setState(res.data))
    }
    const onChangeTodolistIdHandle = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }
    const onChangeTaskIdHandle = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskId(e.currentTarget.value)
    }
    const onChangeTitleHandle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        <>
            {JSON.stringify(state)}
            <div>
                <input placeholder={'todolistId'} value={todolistId} onChange={onChangeTodolistIdHandle}/>
                <input placeholder={'taskId'} value={taskId} onChange={onChangeTaskIdHandle}/>
                <input placeholder={'title'} value={title} onChange={onChangeTitleHandle}/>
                <button onClick={updateTaskHandle}>Update Task</button>
            </div>
        </>
    )
}
