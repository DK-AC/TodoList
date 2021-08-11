import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterTasksType} from "./App";
import {AddItemForm} from "./AddItemForm";

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

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const removeTodolist = () => props.removeTodolist(props.id)


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
                <button onClick={removeTodolist}>x
                </button>
            </h3>

            <div>
                <AddItemForm addItem={addTask}/>
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

