import React, {ChangeEvent, useEffect, useState} from 'react'
import {todolistsApi} from "../dal/api/todolists-api";

export default {
    title: 'API/Todolists'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)

    const getTodolistsHandle = () => {
        todolistsApi.getTodolists()
            .then(res => setState(res.data))
    }

    return <>
        {JSON.stringify(state)}
        <div>
            <button onClick={getTodolistsHandle}>Get Tasks</button>
        </div>
    </>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsApi.createTodolist({title: 'New Todolist'})
            .then(res => setState(res.data))
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistId: string = '9512899b-b7d7-458f-8891-551b833c9820'
        todolistsApi.deleteTodolist({todolistId: todolistId})
            .then(res => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistId: string = '418ab450-3836-48a6-b67a-127dc9ceb485'
        todolistsApi.updateTodolist({todolistId, title: 'Update Title'})
            .then(res => setState(res.data))
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
