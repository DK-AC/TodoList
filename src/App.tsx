import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from 'uuid';

export type FilterTasksType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterTasksType
}


function App() {

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: v1(), title: 'What to learn', filter: 'all'},
        {id: v1(), title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
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
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = todolistTasks.filter(t => t.id != id)
        setTasks({...tasks})
    }
    const changeFilter = (value: FilterTasksType, todolistId: string) => {
        setTodolists(
            [...todolists.map(t => t.id === todolistId
                ? {...t, filter: t.filter = value}
                : t)])
    }
    const addTask = (title: string) => {
        let task = {id: v1(), title, isDone: true}
        let newTasks = [task, ...tasks]
        setTasks(newTasks)

    }
    const changeStatusTasks = (id: string, isDone: boolean) => {
        let task = tasks.find(ft => ft.id === id)
        if (task) {
            task.isDone = isDone
            setTasks([...tasks])
        }
    }

    return (
        <div className="App">
            {
                todolists.map(tl => {

                    let tasksFilterTodolist = tasks

                    if (tl.filter === 'active') {
                        tasksFilterTodolist = tasks.filter(t => !t.isDone)
                    }
                    if (tl.filter === 'completed') {
                        tasksFilterTodolist = tasks.filter(t => t.isDone)
                    }

                    return <Todolist
                        key={tl.id}
                        title={tl.title}
                        tasks={tasksFilterTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeStatusTasks={changeStatusTasks}
                        filter={tl.filter}
                        todolistId={todolistId1}
                    />
                })
            }
        </div>
    );
}

export default App
