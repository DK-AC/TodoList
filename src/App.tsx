import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from 'uuid';

export type filterTasksType = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Rest Api', isDone: false},
        {id: v1(), title: 'Graph QL', isDone: false},
    ])

    let [filter, setFilter] = useState<filterTasksType>('all')

    let tasksFilterTodolist = tasks

    if (filter === 'active') {
        tasksFilterTodolist = tasks.filter(ftl => !ftl.isDone)
    }
    if (filter === 'completed') {
        tasksFilterTodolist = tasks.filter(ftl => ftl.isDone)
    }


    const removeTask = (taskId: string) => {
        let filterTasks = tasks.filter(ft => ft.id !== taskId)
        setTasks(filterTasks)
    }
    const changeFilter = (value: filterTasksType) => {
        setFilter(value)
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
            <Todolist
                tasks={tasksFilterTodolist}
                title={'What to learn'}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeStatusTasks={changeStatusTasks}
                filter={filter}
            />

        </div>
    );
}

export default App
