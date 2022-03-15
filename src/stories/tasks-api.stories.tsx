import React, {ChangeEvent, useEffect, useState} from "react";
import {tasksApi} from "../dal/api/tasks-api";

export default {
    title: 'API/Tasks'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')

    const getTasksHande = () => {
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
                <button onClick={getTasksHande}>Get Tasks</button>
            </div>
        </>)
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const createTaskHandle = () => {
        tasksApi.createTask({todolistId, title})
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
        </>)
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')

    const createTaskHandle = () => {
        tasksApi.deleteTask({todolistId, taskId})
            .then(res => setState(res.data))
    }
    const onChangeTodolistIdHandle = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }
    const onChangeTitleHandle = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskId(e.currentTarget.value)
    }

    return (
        <>
            {JSON.stringify(state)}
            <div>
                <input placeholder={'todolistId'} value={todolistId} onChange={onChangeTodolistIdHandle}/>
                <input placeholder={'taskId'} value={taskId} onChange={onChangeTitleHandle}/>
                <button onClick={createTaskHandle}>Delete Task</button>
            </div>
        </>)
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistId: string = '418ab450-3836-48a6-b67a-127dc9ceb485'
        let taskId: string = 'f6005b69-9afd-43c8-a43e-7376b141cffe'
        tasksApi.updateTask({
            todolistId, taskId, model: {
                title: 'New Task',
                deadline: '',
                startDate: '',
                status: 0,
                priority: 0,
                description: ''
            }
        })
            .then(res => setState(res.data))
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
