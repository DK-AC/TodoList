import React, {useState} from 'react';
import './App.css';
import {TasksPropsType, Todolist} from "./Todolist";
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';


export type FilterTasksType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterTasksType
}

type TasksStateType = {
    [key: string]: Array<TasksPropsType>
}


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
    const changeFilter = (value: FilterTasksType, todolistId: string) => {
        setTodolists(
            [...todolists.map(t => t.id === todolistId
                ? {...t, filter: t.filter = value}
                : t)])
    }
    const addTask = (title: string, todolistId: string) => {
        let task = {id: v1(), title, isDone: true}
        /* let todolistTasks = tasks[todolistId]
         tasks[todolistId] = [task, ...todolistTasks]*/
        setTasks({...tasks, [todolistId]: [...tasks[todolistId], task]})

    }
    const changeStatusTasks = (id: string, isDone: boolean, todolistId: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId]
                .map(t => t.id === id ? {...t, isDone} : t)
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
            [todolistId]: tasks[todolistId]
                .map(t => t.id === id ? {...t, title: newTitle} : t)
        })
    }
    const changeTodolistTitle = (id: string, title: string) => {
        setTodolists(todolists.map(t => t.id == id ? {...t, title} : t));
    }

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                flexGrow: 1,
            },
            menuButton: {
                marginRight: theme.spacing(2),
            },
            title: {
                flexGrow: 1,
            },
        }),
    );


    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start"
                                color="inherit"
                                aria-label="menu"
                                className={classes.menuButton}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6"
                                className={classes.title}
                    >
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '10px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;


                            if (tl.filter === 'active') {
                                tasksForTodolist = allTodolistTasks.filter(t => !t.isDone)
                            }

                            if (tl.filter === 'completed') {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone)
                            }

                            return <Grid item key={tl.id}>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist key={tl.id}
                                              id={tl.id}
                                              title={tl.title}
                                              tasks={tasksForTodolist}
                                              removeTask={removeTask}
                                              changeFilter={changeFilter}
                                              addTask={addTask}
                                              changeStatusTasks={changeStatusTasks}
                                              filter={tl.filter}
                                              removeTodolist={removeTodolist}
                                              changeTaskTitle={changeTaskTitle}
                                              changeTodolistTitle={changeTodolistTitle}
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
