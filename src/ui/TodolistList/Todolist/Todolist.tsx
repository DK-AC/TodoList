import React, {useEffect} from "react";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import Button from "@mui/material/Button";
import {Delete} from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import {Task} from "../../Task/Task";
import {useActions, useAppDispatch, useAppSelector} from "../../../bll/store";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {TaskType} from "../../../bll/types/taskTypes";
import {TodolistType} from "../../../bll/types/todolistTypes";
import {changeTodolistFilterAC} from "../../../bll/reducers/todolistsReducer";
import {tasksActions, todolistsActions} from "../../../bll/thunk";

type PropsType = { todo: TodolistType, demo?: boolean }

export const Todolist = React.memo(({todo, demo = false}: PropsType) => {

    const dispatch = useAppDispatch()

    const {updateTodolistTitle, removeTodolist} = useActions(todolistsActions)
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
    const changeTodolistAllFilterHandle = () => dispatch(changeTodolistFilterAC(
        {todolistId: todo.id, filter: 'all'}))
    const changeTodolistActiveFilterHandle = () => dispatch(changeTodolistFilterAC(
        {todolistId: todo.id, filter: 'active'}))
    const changeTodolistCompletedFilterHandle = () => dispatch(changeTodolistFilterAC(
        {todolistId: todo.id, filter: 'completed'}))

    let tasksForTodolist = tasks

    if (todo.filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter(task => !task.status)
    }
    if (todo.filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter(task => task.status)
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
                <Button variant={todo.filter === 'all' ? 'outlined' : 'text'}
                        onClick={changeTodolistAllFilterHandle}
                        color={'inherit'}
                >
                    All
                </Button>
                <Button variant={todo.filter === 'active' ? 'outlined' : 'text'}
                        onClick={changeTodolistActiveFilterHandle}
                        color={'primary'}>
                    Active
                </Button>
                <Button variant={todo.filter === 'completed' ? 'outlined' : 'text'}
                        onClick={changeTodolistCompletedFilterHandle}
                        color={'secondary'}>
                    Completed
                </Button>
            </div>
        </div>
    )
})

function todolistActions(todolistActions: any): {} {
    throw new Error("Function not implemented.");
}

