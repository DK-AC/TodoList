import React, {useCallback, useEffect} from "react";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import Button from "@mui/material/Button";
import {Delete} from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import {Task} from "../../Task/Task";
import {useActions, useAppDispatch, useAppSelector} from "../../../bll/store";
import {AddItemForm, AddItemFormHelperType} from "../../../components/AddItemForm/AddItemForm";
import {tasksActions, todolistsActions} from "../../../bll/thunk";
import Paper from "@mui/material/Paper";
import {ButtonColorType, FilterTodolistType, TaskType, TodolistType} from "../../../dal/api/types";

type PropsType = { todo: TodolistType, demo?: boolean }


export const Todolist = React.memo(({todo, demo = false}: PropsType) => {

    const dispatch = useAppDispatch()

    const {updateTodolistTitle, removeTodolist, changeTodolistFilterAC} = useActions(todolistsActions)
    const {fetchTasks} = useActions(tasksActions)

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
    const addTaskHandle = useCallback(async (title: string, helper: AddItemFormHelperType) => {
        let thunk = tasksActions.addTask({todolistId: todo.id, title})

        const action = await dispatch(thunk)

        if (tasksActions.addTask.rejected.match(action)) {
            if (action.payload?.errors?.length) {
                const error = action.payload.errors[0]
                helper.setError(error)
            } else {
                helper.setError('Some error occurred')
            }
        } else {
            helper.setTitle('')
        }
    }, [])
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
        <Paper style={{padding: '10px', position: 'relative'}}>
            <IconButton onClick={removeTodolistHandle}
                        disabled={todo.status === 'loading'}
                        size={'small'}
                        style={{position: 'absolute', top: '5x', right: '5px'}}
            >
                <Delete fontSize={'small'}/>
            </IconButton>
            <h3>
                <EditableSpan title={todo.title} onChange={changeTodolistTitleHandle}/>

            </h3>
            <div>
                <AddItemForm callback={addTaskHandle} disabled={todo.status === 'loading'}/>
                {tasksForTodolist.map(task => {
                    return <Task key={todo.id + task.id} todolistId={todo.id} task={task}/>
                })}

                {!tasksForTodolist.length && <div style={{padding: '10px', color: "gray"}}>Create your first task</div>}

            </div>
            <div style={{paddingTop: '10px'}}>
                {renderFilterButton(changeTodolistFilterHandle, 'all', 'all', 'inherit')}
                {renderFilterButton(changeTodolistFilterHandle, 'active', 'active', 'primary')}
                {renderFilterButton(changeTodolistFilterHandle, 'completed', 'completed', 'secondary')}
            </div>
        </Paper>
    )
})

