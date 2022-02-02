import React, {ChangeEvent} from "react";
import {FilterTodolistType} from "../../app/App";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import {Delete} from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';


type TodolistPropsType = {
    title: string
    tasks: Array<TasksPropsType>
    removeTask: (id: string, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeStatusTasks: (todoId: string, taskId: string, isDone: boolean) => void
    filter: string
    id: string
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, title: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    changeTodolistFilter: (todoId: string, filter: FilterTodolistType) => void
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

    const filterAllHandler = () => props.changeTodolistFilter(props.id, 'all')
    const filterActiveHandler = () => props.changeTodolistFilter(props.id, 'active')
    const filterCompletedHandler = () => props.changeTodolistFilter(props.id, 'completed')

    const tasksJSXElements = props.tasks.map(task => {
        const removeTask = () => props.removeTask(task.id, props.id)
        const onChangeStatusTask = (e: ChangeEvent<HTMLInputElement>) => {
            let newChangeValueTask = e.currentTarget.checked;
            props.changeStatusTasks(props.id, task.id, newChangeValueTask)
        }
        const onChangeTitle = (newValue: string) => {
            props.changeTaskTitle(task.id, newValue, props.id)
        }

        return (
            <div key={task.id} className={task.isDone ? 'isDone' : ''}>
                <Checkbox
                    color="primary"
                    checked={task.isDone}
                    onChange={onChangeStatusTask}
                    size={"small"}
                />
                <EditableSpan title={task.title} onChange={onChangeTitle}/>
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
            <div style={{paddingTop: '10px'}}>
                <Button variant={props.filter === 'all' ? 'outlined' : 'text'}
                        onClick={filterAllHandler}
                        color={'inherit'}
                >All
                </Button>
                <Button variant={props.filter === 'active' ? 'outlined' : 'text'}
                        onClick={filterActiveHandler}
                        color={'primary'}>Active
                </Button>
                <Button variant={props.filter === 'completed' ? 'outlined' : 'text'}
                        onClick={filterCompletedHandler}
                        color={'secondary'}>Completed
                </Button>
            </div>

        </div>
    )
}

