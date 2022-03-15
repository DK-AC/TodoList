import React, {ChangeEvent} from 'react';
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "../../components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import {Delete} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../bll/store";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../bll/actions/taskActions";

type TaskPropsType = { todoId: string, filteredTask: TasksType }
export type TasksType = { id: string, title: string, isDone: boolean }
export type TasksStateType = { [key: string]: Array<TasksType> }


export const Task = React.memo(({todoId, filteredTask}: TaskPropsType) => {

    const dispatch = useDispatch()

    const task = useAppSelector<TasksType>(state => state.tasks[todoId].filter(task => task.id === filteredTask.id)[0])
    const {id, title, isDone} = task


    const removeTaskHandler = () => dispatch(removeTaskAC({todolistId:todoId, taskId: id}))
    const onChangeTaskTitle = (title: string) => dispatch(changeTaskTitleAC({todolistId:todoId, taskId: id, title}))
    const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC({
            todolistId:todoId, taskId: id, isDone: e.currentTarget.checked
        }))
    }

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
})

