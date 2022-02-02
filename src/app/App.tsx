import React, {useState} from 'react';
import './App.css';
import {TasksPropsType, Todolist} from "../components/Todolist/Todolist";
import {v1} from 'uuid';
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


export type FilterTodolistType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterTodolistType
}

type TasksStateType = { [key: string]: Array<TasksPropsType> }

function App() {

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Rest Api', isDone: false},
            {id: v1(), title: 'Graph QL', isDone: false},
            {id: v1(), title: 'Material UI', isDone: false},
        ]
    })

    const removeTask = (id: string, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id != id)})
    }
    const addTask = (title: string, todolistId: string) => {
        setTasks({
            ...tasks,
            [todolistId]: [{id: v1(), title, isDone: false}, ...tasks[todolistId]]
        })
    }
    const changeStatusTasks = (todoId: string ,taskId: string, isDone: boolean ) => {
        setTasks({
            ...tasks,
            [todoId]: tasks[todoId].map(task => task.id === taskId ? {...task, isDone} : task)
        })
    }
    const removeTodolist = (id: string) => {
        setTodolists(todolists.filter(tl => tl.id != id));
        delete tasks[id];
        setTasks({...tasks});
    }
    const addTodolist = (title: string) => {
        let newTodolistId = v1()
        let newTodolist: TodolistType = {id: newTodolistId, title, filter: 'all'}
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [newTodolistId]: []})

    }
    const changeTaskTitle = (id: string, newTitle: string, todolistId: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(t => t.id === id ? {...t, title: newTitle} : t)
        })
    }
    const changeTodolistTitle = (id: string, title: string) => {
        setTodolists(todolists.map(t => t.id == id ? {...t, title} : t));
    }
    const changeTodolistFilter = (todoId: string, filter: FilterTodolistType) => {
        setTodolists(todolists.map(todo => todo.id === todoId ? {...todo, filter} : todo))
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

                            return <Grid item key={tl.id}>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={allTodolistTasks}
                                        removeTask={removeTask}
                                        addTask={addTask}
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
