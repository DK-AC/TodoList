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
        let todolistId = 'b96a9ec9-56bf-4e57-a257-cfe791c0c797'
        instance.get(`${todolistId}/tasks`)
            .then(res => setState(res.data))
    })
    return <div> {JSON.stringify(state)}</div>
}