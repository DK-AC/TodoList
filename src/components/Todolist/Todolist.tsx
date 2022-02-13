import React from "react";
import {FilterTodolistType} from "../../app/App";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import Button from "@mui/material/Button";
import {Delete} from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import {Task, TasksType} from "../Task/Task";


type TodolistPropsType = {
    title: string
    tasks: Array<TasksType>
    filter: FilterTodolistType
    todoId: string
    removeTodolist: (todoId: string) => void
    changeTodolistTitle: (todoId: string, title: string) => void
    changeTodolistFilter: (todoId: string, filter: FilterTodolistType) => void
}


export function Todolist(props: TodolistPropsType) {

    const {
        todoId,
        filter,
        title,
        removeTodolist,
        changeTodolistTitle,
        changeTodolistFilter,
    } = props;



    const removeTodolistHandler = () => removeTodolist(todoId)
    const changeTodolistTitleHandler = (title: string) => {
        changeTodolistTitle(todoId, title)
    }

    const filterAllHandler = () => changeTodolistFilter(todoId, 'all')
    const filterActiveHandler = () => {
        debugger
        changeTodolistFilter(todoId, 'active')
    }
    const filterCompletedHandler = () => changeTodolistFilter(todoId, 'completed')

    return (
        <div>
            <h3>
                <EditableSpan title={title} onChange={changeTodolistTitleHandler}/>
                <IconButton onClick={removeTodolistHandler}>
                    <Delete/>
                </IconButton>
            </h3>

            <div>
                <Task todoId={todoId}/>
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

