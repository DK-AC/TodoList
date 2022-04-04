import React, {useEffect} from "react";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import Button from "@mui/material/Button";
import {Delete} from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import {Task} from "../../Task/Task";
import {useActions, useAppSelector} from "../../../bll/store";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {TaskType} from "../../../bll/types/taskTypes";
import {ButtonColorType, FilterTodolistType, TodolistType} from "../../../bll/types/todolistTypes";
import {tasksActions, todolistsActions} from "../../../bll/thunk";

type PropsType = { todo: TodolistType, demo?: boolean }

export const Todolist = React.memo(({todo, demo = false}: PropsType) => {

    const {updateTodolistTitle, removeTodolist, changeTodolistFilterAC} = useActions(todolistsActions)
    const {fetchTasks, addTask} = useActions(tasksActions)

    let tasks = useAppSelector<TaskType[]>(state => state.tasks[todo.id])

    useEffect(() => {
        if (demo) {
            return
        }
        fetchTasks(todo.id)
    }, [])

    const removeTodolistHandle = () => {
        removeTodolist(todo.id)
    }
    const changeTodolistTitleHandle = (title: string) => {
        updateTodolistTitle({todolistId: todo.id, title})
    }
    const addTaskHandle = (title: string) => {
        addTask({todolistId: todo.id, title})
    }
    const changeTodolistFilterHandle = (filter: FilterTodolistType) => {
        changeTodolistFilterAC({todolistId: todo.id, filter})
    }
    let tasksForTodolist = tasks

    if (todo.filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter(task => !task.status)
    }
    if (todo.filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter(task => task.status)
    }

    const renderFilterButton = (onClick: (filter: FilterTodolistType) => void, text: string, buttonFilter: FilterTodolistType, color: ButtonColorType) => {
        return (
            <Button variant={todo.filter === buttonFilter ? 'outlined' : 'text'}
                    onClick={() => changeTodolistFilterHandle(buttonFilter)}
                    color={color}
            >
                {text}
            </Button>)
    }


    return (
        <div>
            <h3>
                <EditableSpan title={todo.title} onChange={changeTodolistTitleHandle}/>
                <IconButton onClick={removeTodolistHandle} disabled={todo.status === 'loading'}>
                    <Delete/>
                </IconButton>
            </h3>

            <div>
                <AddItemForm callback={addTaskHandle} disabled={todo.status === 'loading'}/>
                {tasksForTodolist.map(task => {
                    return <Task key={todo.id + task.id} todolistId={todo.id} filteredTask={task}/>
                })}

            </div>
            <div style={{paddingTop: '10px'}}>
                {renderFilterButton(changeTodolistFilterHandle, 'all', 'all', 'inherit')}
                {renderFilterButton(changeTodolistFilterHandle, 'active', 'active', 'primary')}
                {renderFilterButton(changeTodolistFilterHandle, 'completed', 'completed', 'secondary')}
            </div>
        </div>
    )
})

