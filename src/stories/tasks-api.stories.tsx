import axios from "axios";
import React, {useEffect, useState} from "react";

export default {
    title: 'API/Tasks'
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
    withCredentials: true,
    headers: {
        'API-KEY': 'a32b35ae-c578-47f3-b8a9-0885cd248a9d'
    }
})

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistId = '418ab450-3836-48a6-b67a-127dc9ceb485'
        instance.get(`${todolistId}/tasks`)
            .then(res => setState(res.data))
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistId = '418ab450-3836-48a6-b67a-127dc9ceb485'
        instance.post(`${todolistId}/tasks`, {title: 'New Task 1'})
            .then(res => setState(res.data))

    }, [])
    return <div> {JSON.stringify(state)}</div>
}
