import React, {ChangeEvent, useState} from 'react'
import {todolistsApi} from "../dal/api/todolists-api";

export default {
    title: 'API/Todolists'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)

    const getTodolistsHandle = () => {
        todolistsApi.getTodolists()
            .then(data => setState(data))
    }

    return (
        <>
            {JSON.stringify(state)}
            <div>
                <button onClick={getTodolistsHandle}>Get Todolists</button>
            </div>
        </>
    )
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')

    const createTodolistHandle = () => {
        todolistsApi.createTodolist(title)
            .then(data => setState(data))
    }
    const onChangeTitleHandle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        <>
            {JSON.stringify(state)}
            <div>
                <input placeholder={'title'} value={title} onChange={onChangeTitleHandle}/>
                <button onClick={createTodolistHandle}>Create Todolist</button>
            </div>
        </>
    )
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')

    const deleteTodolistHandle = () => {
        todolistsApi.deleteTodolist(todolistId)
            .then(res => setState(res.data))
    }
    const onChangeTodolistIdHandle = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }

    return (
        <>
            {JSON.stringify(state)}
            <div>
                <input placeholder={'todolistId'} value={todolistId} onChange={onChangeTodolistIdHandle}/>
                <button onClick={deleteTodolistHandle}>Delete Todolist</button>
            </div>
        </>
    )
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')

    const updateTodolistHandle = () => {
        todolistsApi.updateTodolist(todolistId, title)
            .then(res => setState(res.data))
    }
    const onChangeTitleHandle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onChangeTodolistIdHandle = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }

    return (
        <>
            {JSON.stringify(state)}
            <div>
                <input placeholder={'todolistId'} value={todolistId} onChange={onChangeTodolistIdHandle}/>
                <input placeholder={'title'} value={title} onChange={onChangeTitleHandle}/>
                <button onClick={updateTodolistHandle}>Update Todolist</button>
            </div>
        </>
    )
}
