import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {filterTasksType} from "./App";

type TodolistPropsType = {
    title: string
    tasks: Array<TasksPropsType>
    removeTask: (taskId: string) => void
    changeFilter: (value: filterTasksType) => void
    addTask: (title: string) => void
    changeStatusTasks: (id: string, isDone: boolean) => void
    filter: string
}

type TasksPropsType = {
    id: string
    title: string
    isDone: boolean
}

export function Todolist(props: TodolistPropsType) {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onChangeValueTasks = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressTasks = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask()
        }
        setError(null)
    }
    const filterAllHandler = () => props.changeFilter('all')
    const filterActiveHandler = () => props.changeFilter('active')
    const filterCompletedHandler = () => props.changeFilter('completed')

    const tasksJSXElements = props.tasks.map(tsk => {

        const removeTask = () => props.removeTask(tsk.id)
        const onChangeStatusTask = (e: ChangeEvent<HTMLInputElement>) => {
            let newChangeValueTask = e.currentTarget.checked
            props.changeStatusTasks(tsk.id, newChangeValueTask)
        }

        return (
            <li key={tsk.id}
                className={tsk.isDone ? 'isDone' : ''}
            >
                <input
                    type="checkbox"
                    checked={tsk.isDone}
                    onChange={onChangeStatusTask}
                />
                <span>{tsk.title}</span>
                <button
                    onClick={removeTask}
                >X
                </button>
            </li>
        )
    })


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeValueTasks}
                    onKeyPress={onKeyPressTasks}
                    className={error ? 'error' : ''}
                />
                <button onClick={addTask}>+</button>
                {error && < div className={'errorMessage'}> {error}</div>}
            </div>
            <ul>
                {tasksJSXElements}
            </ul>
            <div>
                <button
                    className={props.filter === 'all' ? 'activeFilter' : ''}
                    onClick={filterAllHandler}
                >All
                </button>
                <button
                    className={props.filter === 'active' ? 'activeFilter' : ''}
                    onClick={filterActiveHandler}
                >Active
                </button>
                <button
                    className={props.filter === 'completed' ? 'activeFilter' : ''}
                    onClick={filterCompletedHandler}
                >Completed
                </button>
            </div>
        </div>
    )
}

