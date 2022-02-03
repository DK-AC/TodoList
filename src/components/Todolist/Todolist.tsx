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
    todoId: string
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

    const {
        todoId,
        filter,
        title,
        tasks,
        removeTodolist,
        changeTodolistTitle,
        changeTodolistFilter,
        changeTaskTitle,
        changeStatusTasks,
        removeTask,
        addTask
    } = props;

    const addTaskHandler = (title: string) => {
        addTask(title, todoId)
    }

    const removeTodolistHandler = () => removeTodolist(todoId)
    const changeTodolistTitleHandler = (title: string) => {
        changeTodolistTitle(todoId, title)
    }

    const filterAllHandler = () => changeTodolistFilter(todoId, 'all')
    const filterActiveHandler = () => changeTodolistFilter(todoId, 'active')
    const filterCompletedHandler = () => changeTodolistFilter(todoId, 'completed')

    const tasksJSXElements = tasks.map(task => {
        const removeTaskHandler = () => removeTask(task.id, todoId)
        const onChangeStatusTask = (e: ChangeEvent<HTMLInputElement>) => {
            let newChangeValueTask = e.currentTarget.checked;
            changeStatusTasks(todoId, task.id, newChangeValueTask)
        }
        const onChangeTitle = (newValue: string) => {
            changeTaskTitle(task.id, newValue, todoId)
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
                <IconButton onClick={removeTaskHandler}><Delete/></IconButton>
            </div>
        )
    })

    return (
        <div>
            <h3>
                <EditableSpan title={title} onChange={changeTodolistTitleHandler}/>
                <IconButton onClick={removeTodolistHandler}>
                    <Delete/>
                </IconButton>
            </h3>
            <div>
                <AddItemForm addItem={addTaskHandler}/>
            </div>
            <div>
                {tasksJSXElements}
            </div>
            <div style={{paddingTop: '10px'}}>
                <Button variant={filter === 'all' ? 'outlined' : 'text'}
                        onClick={filterAllHandler}
                        color={'inherit'}
                >All
                </Button>
                <Button variant={filter === 'active' ? 'outlined' : 'text'}
                        onClick={filterActiveHandler}
                        color={'primary'}>Active
                </Button>
                <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                        onClick={filterCompletedHandler}
                        color={'secondary'}>Completed
                </Button>
            </div>

        </div>
    )
}

