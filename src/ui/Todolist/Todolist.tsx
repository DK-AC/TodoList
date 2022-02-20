import React, {useCallback} from "react";
import {EditableSpan} from "../../components/EditableSpan/EditableSpan";
import Button from "@mui/material/Button";
import {Delete} from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import {Task, TasksType} from "../Task/Task";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../bll/store";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "../../bll/actions/todolistActions";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {addTaskAC} from "../../bll/actions/taskActions";

type PropsType = { todoId: string }
export type FilterTodolistType = 'all' | 'active' | 'completed'
export type TodolistType = { id: string, title: string, filter: FilterTodolistType }

export const Todolist = React.memo(({todoId}: PropsType) => {

    const dispatch = useDispatch()

    let todo = useAppSelector<TodolistType>(state => state.todolists.filter(todo => todo.id === todoId)[0])
    let tasks = useAppSelector<TasksType[]>(state => state.tasks[todoId])

    const removeTodolistHandler = () => dispatch(removeTodolistAC({todoId: todo.id}))
    const changeTodolistTitleHandler = () => dispatch(changeTodolistTitleAC({todoId: todo.id, title: todo.title}))
    const addTaskHandler = useCallback((title: string) => dispatch(addTaskAC({todoId, title})), [])
    const changeTodolistAllFilterHandler = () => {
        dispatch(changeTodolistFilterAC({todoId: todo.id, filter: 'all'}))
    }
    const changeTodolistActiveFilterHandler = () => {
        dispatch(changeTodolistFilterAC({todoId: todo.id, filter: 'active'}))
    }
    const changeTodolistCompletedFilterHandler = () => {
        dispatch(changeTodolistFilterAC({todoId: todo.id, filter: 'completed'}))
    }

    let tasksForTodolist = tasks

    if (todo.filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter(task => !task.isDone)
    }
    if (todo.filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter(task => task.isDone)
    }
    return (
        <div>
            <h3>
                <EditableSpan title={todo.title} onChange={changeTodolistTitleHandler}/>
                <IconButton onClick={removeTodolistHandler}>
                    <Delete/>
                </IconButton>
            </h3>

            <div>
                <AddItemForm callback={addTaskHandler}/>
                {tasksForTodolist.map(task => {
                    return <Task key={task.id} todoId={todo.id} filteredTask={task}/>
                })}

            </div>
            <div style={{paddingTop: '10px'}}>
                <Button variant={todo.filter === 'all' ? 'outlined' : 'text'}
                        onClick={changeTodolistAllFilterHandler}
                        color={'inherit'}
                >All
                </Button>
                <Button variant={todo.filter === 'active' ? 'outlined' : 'text'}
                        onClick={changeTodolistActiveFilterHandler}
                        color={'primary'}>Active
                </Button>
                <Button variant={todo.filter === 'completed' ? 'outlined' : 'text'}
                        onClick={changeTodolistCompletedFilterHandler}
                        color={'secondary'}>Completed
                </Button>
            </div>
        </div>
    )
})
