import React, {useCallback} from "react";
import {EditableSpan} from "../../components/EditableSpan/EditableSpan";
import Button from "@mui/material/Button";
import {Delete} from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import {Task, TasksType} from "../Task/Task";
import {useDispatch} from "react-redux";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "../../bll/actions/todolistActions";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {addTaskAC} from "../../bll/actions/taskActions";
import {TodolistFromServerType} from "../../dal/api/todolists-api";

type PropsType = { todolist: TodolistFromServerType, tasks: TasksType[] }
export type FilterTodolistType = 'all' | 'active' | 'completed'
export type TodolistType = { id: string, title: string, filter: FilterTodolistType }

export const Todolist = React.memo(({todolist, tasks}: PropsType) => {

    const dispatch = useDispatch()

    const removeTodolistHandler = () => dispatch(removeTodolistAC({todoId: todolist.id}))
    const changeTodolistTitleHandler = () => dispatch(changeTodolistTitleAC({
        todoId: todolist.id,
        title: todolist.title
    }))
    const addTaskHandler = useCallback((title: string) => dispatch(addTaskAC({todoId: todolist.id, title})), [])
    const changeTodolistAllFilterHandler = () => {
        dispatch(changeTodolistFilterAC({todoId: todolist.id, filter: 'all'}))
    }
    const changeTodolistActiveFilterHandler = () => {
        dispatch(changeTodolistFilterAC({todoId: todolist.id, filter: 'active'}))
    }
    const changeTodolistCompletedFilterHandler = () => {
        dispatch(changeTodolistFilterAC({todoId: todolist.id, filter: 'completed'}))
    }

    let tasksForTodolist = tasks

    if (todolist.filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter(task => !task.isDone)
    }
    if (todolist.filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter(task => task.isDone)
    }
    return (
        <div>
            <h3>
                <EditableSpan title={todolist.title} onChange={changeTodolistTitleHandler}/>
                <IconButton onClick={removeTodolistHandler}>
                    <Delete/>
                </IconButton>
            </h3>

            <div>
                <AddItemForm callback={addTaskHandler}/>
                {tasksForTodolist.map(task => {
                    return <Task key={task.id} todoId={todolist.id} filteredTask={task}/>
                })}

            </div>
            <div style={{paddingTop: '10px'}}>
                <Button variant={todolist.filter === 'all' ? 'outlined' : 'text'}
                        onClick={changeTodolistAllFilterHandler}
                        color={'inherit'}
                >
                    All
                </Button>
                <Button variant={todolist.filter === 'active' ? 'outlined' : 'text'}
                        onClick={changeTodolistActiveFilterHandler}
                        color={'primary'}>
                    Active
                </Button>
                <Button variant={todolist.filter === 'completed' ? 'outlined' : 'text'}
                        onClick={changeTodolistCompletedFilterHandler}
                        color={'secondary'}>
                    Completed
                </Button>
            </div>
        </div>
    )
})
