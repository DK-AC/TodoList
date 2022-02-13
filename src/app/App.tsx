import React from 'react';
import './App.css';
import {TasksPropsType, Todolist} from "../components/Todolist/Todolist";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import {Menu} from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "../store/actions/todolistActions";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../store/actions/taskActions";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../store/store";


export type FilterTodolistType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterTodolistType
}

export type TasksStateType = { [key: string]: Array<TasksPropsType> }

function App() {

    const dispatch = useDispatch()

    const tasks = useAppSelector<TasksStateType>(state => state.tasks)
    const todolists = useAppSelector<TodolistType[]>(state => state.todolists)

    const removeTask = (todoId: string, taskId: string) => {
        dispatch(removeTaskAC({taskId, todoId}))
    }
    const addTask = (todoId: string, title: string) => {
        debugger
        dispatch(addTaskAC({todoId, title}))
    }
    const changeStatusTasks = (todoId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC({taskId, todoId, isDone}))
    }
    const removeTodolist = (todoId: string) => {
        dispatch(removeTodolistAC({todoId}))
        dispatch(removeTodolistAC({todoId}));
    }
    const changeTaskTitle = (todoId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC({taskId, todoId, title}))
    }
    const addTodolist = (title: string) => {
        dispatch(addTodolistAC({title}))

    }

    const changeTodolistTitle = (todoId: string, title: string) => {
        dispatch(changeTodolistTitleAC({todoId, title}));
    }
    const changeTodolistFilter = (todoId: string, filter: FilterTodolistType) => {
        dispatch(changeTodolistFilterAC({todoId, filter}))
    }

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id]
                            let filteredTask = allTodolistTasks

                            if (tl.filter === 'active') {
                                allTodolistTasks = filteredTask.filter(task => !task.isDone)
                            }
                            if (tl.filter === 'completed') {
                                allTodolistTasks = filteredTask.filter(task => task.isDone)
                            }

                            return <Grid item key={tl.id}>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        todoId={tl.id}
                                        title={tl.title}
                                        tasks={allTodolistTasks}
                                        removeTask={removeTask} addTask={addTask}
                                        changeStatusTasks={changeStatusTasks}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                        changeTodolistFilter={changeTodolistFilter}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App
