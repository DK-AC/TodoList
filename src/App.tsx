import React, {useState} from 'react';
import './App.css';
import {TasksPropsType, Todolist} from "./Todolist";
import {v1} from 'uuid';

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
        {id: v1(), title: 'What to learn', filter: 'all'},
        {id: v1(), title: 'What to buy', filter: 'all'},
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
    const removeTodolist = (todolistId: string) => {
        console.log(todolistId)
    }

    return (
        <div className="App">
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

                    return <Todolist key={tl.id}
                                     id={tl.id}
                                     title={tl.title}
                                     tasks={tasksForTodolist}
                                     removeTask={removeTask}
                                     changeFilter={changeFilter}
                                     addTask={addTask}
                                     changeStatusTasks={changeStatusTasks}
                                     filter={tl.filter}
                                     removeTodolist={removeTodolist}
                    />
                })
            }
        </div>
    );
}

export default App
