import React, {ChangeEvent} from "react";
import {FilterTasksType} from "./app/App";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {EditableSpan} from "./components/EditableSpan/EditableSpan";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import {Delete} from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';


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
    changeTodolistTitle: (id: string, title: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
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
    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.id, title)
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
        const onChangeTitle = (newValue: string) => {
            props.changeTaskTitle(t.id, newValue, props.id)
        }

        return (
            <div key={t.id} className={t.isDone ? 'isDone' : ''}>
                <Checkbox
                    color="primary"
                    checked={t.isDone}
                    onChange={onChangeStatusTask}
                    size={"small"}
                />
                <EditableSpan title={t.title} onChange={onChangeTitle}/>
                <IconButton onClick={removeTask}><Delete/></IconButton>
            </div>
        )
    })

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <div>
                <AddItemForm addItem={addTask}/>
            </div>
            <div>
                {tasksJSXElements}
            </div>
            <div>
                <Button
                    variant={props.filter === 'all' ? 'outlined' : 'text'}
                    onClick={filterAllHandler}
                >All
                </Button>
                <Button
                    variant={props.filter === 'active' ? 'outlined' : 'text'}
                    color="primary"
                    onClick={filterActiveHandler}
                >Active
                </Button>
                <Button
                    className={props.filter === 'completed' ? 'activeFilter' : ''}
                    color="secondary"
                    onClick={filterCompletedHandler}
                >Completed
                </Button>
            </div>
        </div>
    )
}

