import React, {useEffect, useState} from 'react'
import {todolistsApi} from "../dal/api/todolists-api";

export default {
    title: 'API/Todolists'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsApi.getTodolists()
            .then(res => setState(res.data))
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsApi.createTodolist({title: 'New Todolist'})
            .then(res => setState(res.data.todolists))

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistId: string = '5665affc-a835-41fb-987d-139cd484d127'
        todolistsApi.deleteTodolist(todolistId)
            .then(res => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistId: string = '418ab450-3836-48a6-b67a-127dc9ceb485'
        todolistsApi.updateTodolist(todolistId, {title: 'Update Title'})
            .then(res => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
