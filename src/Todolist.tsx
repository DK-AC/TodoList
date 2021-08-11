import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterTasksType} from "./App";

type TodolistPropsType = {
    title: string
    tasks: Array<TasksPropsType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterTasksType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeStatusTasks: (id: string, isDone: boolean, todolistId: string) => void
    filter: string
    id: string
    removeTodolist: (id: string) => void
}

export type TasksPropsType = {
    id: string
    title: string
    isDone: boolean
}

export function Todolist(props: TodolistPropsType) {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title, props.id)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onChangeValueTasks = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressTasks = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'enter') {
            addTask()
        }
        setError(null)
    }
    const filterAllHandler = () => props.changeFilter('all', props.id)
    const filterActiveHandler = () => props.changeFilter('active', props.id)
    const filterCompletedHandler = () => props.changeFilter('completed', props.id)

    const tasksJSXElements = props.tasks.map(t => {
        const removeTask = () => props.removeTask(t.id, props.id)
        const onChangeStatusTask = (e: ChangeEvent<HTMLInputElement>) => {
            let newChangeValueTask = e.currentTarget.checked;
            props.changeStatusTasks(t.id, newChangeValueTask, props.id)
        }

        return (
            <li key={t.id}
                className={t.isDone ? 'isDone' : ''}
            >
                <input
                    type="checkbox"
                    checked={t.isDone}
                    onChange={onChangeStatusTask}
                />
                <span>{t.title}</span>
                <button
                    onClick={removeTask}
                >X
                </button>
            </li>
        )
    })


    return (
        <div>
            <h3>{props.title}
                <button onClick={() => {
                    props.removeTodolist(props.id)
                }}>x
                </button>
            </h3>

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

