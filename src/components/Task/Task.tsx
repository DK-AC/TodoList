import React, {ChangeEvent} from 'react';
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import {Delete} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../store/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../store/actions/taskActions";
import {AddItemForm} from "../AddItemForm/AddItemForm";

type TaskPropsType = { todoId: string }
export type TasksType = { id: string, title: string, isDone: boolean }
export type TasksStateType = { [key: string]: Array<TasksType> }


export const Task = ({todoId}: TaskPropsType) => {

    const dispatch = useDispatch()

    const task = useAppSelector<TasksType>(state => state.tasks[todoId].filter(task => task.id === todoId)[0])
    const {id, title, isDone} = task

    const addTaskHandler = (title: string) => dispatch(addTaskAC({todoId, title}))
    const removeTaskHandler = () => dispatch(removeTaskAC({todoId, taskId: id}))
    const onChangeTaskTitle = (title: string) => dispatch(changeTaskTitleAC({todoId, taskId: id, title}))
    const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC({
            todoId, taskId: id, isDone: e.currentTarget.checked
        }))
    }

    return (
        <>
            <AddItemForm addItem={addTaskHandler}/>
            <div key={id} className={isDone ? 'isDone' : ''}>
                <Checkbox
                    color="primary"
                    checked={isDone}
                    onChange={onChangeTaskStatus}
                    size={"small"}
                />
                <EditableSpan title={title} onChange={onChangeTaskTitle}/>
                <IconButton onClick={removeTaskHandler}><Delete/></IconButton>
            </div>
        </>
    );
};

