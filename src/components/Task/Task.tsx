import React, {ChangeEvent} from 'react';
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import {Delete} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../store/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../store/actions/taskActions";
import {AddItemForm} from "../AddItemForm/AddItemForm";

type TaskPropsType = { todoId: string, filteredTask: TasksType }
export type TasksType = { id: string, title: string, isDone: boolean }
export type TasksStateType = { [key: string]: Array<TasksType> }


export const Task = ({todoId, filteredTask}: TaskPropsType) => {

    const dispatch = useDispatch()

    const task = useAppSelector<TasksType>(state => state.tasks[todoId].filter(task => task.id === filteredTask.id)[0])
    const {id, title, isDone} = task


    const removeTaskHandler = () => dispatch(removeTaskAC({todoId, taskId: id}))
    const onChangeTaskTitle = (title: string) => dispatch(changeTaskTitleAC({todoId, taskId: id, title}))
    const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC({
            todoId, taskId: id, isDone: e.currentTarget.checked
        }))
    }
    console.log(task)
    console.log(filteredTask.title)

    return (
        <>

            <div key={id} className={filteredTask.isDone ? 'isDone' : ''}>
                <Checkbox
                    color="primary"
                    checked={filteredTask.isDone}
                    onChange={onChangeTaskStatus}
                    size={"small"}
                />
                <EditableSpan title={filteredTask.title} onChange={onChangeTaskTitle}/>
                <IconButton onClick={removeTaskHandler}><Delete/></IconButton>
            </div>
        </>
    );
};

