import React, {ChangeEvent} from 'react';
import {EditableSpan} from "../../components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import {Delete} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../bll/actions/taskActions";
import {TaskFromServerType} from "../../dal/api/tasks-api";
import Checkbox from '@mui/material/Checkbox';

type TaskPropsType = { todoId: string, filteredTask: TaskFromServerType }
export type TasksStateType = { [key: string]: Array<TaskFromServerType> }


export const Task = React.memo(({todoId, filteredTask}: TaskPropsType) => {

    const dispatch = useDispatch()

    const removeTaskHandler = () => {
        dispatch(removeTaskAC( todoId,  filteredTask.id))
    }
    const onChangeTaskTitle = (title: string) => {
        dispatch(changeTaskTitleAC( todoId,  filteredTask.id, title))
    }
    const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC({
            todolistId: todoId, taskId: filteredTask.id, isDone: e.currentTarget.checked
        }))
    }

    return (
        <>
            <div key={filteredTask.id} className={filteredTask.status ? 'isDone' : ''}>
                <Checkbox
                    color="primary"
                    checked={filteredTask.status === 0}
                    onChange={onChangeTaskStatus}
                    size={"small"}
                />
                <EditableSpan title={filteredTask.title} onChange={onChangeTaskTitle}/>
                <IconButton onClick={removeTaskHandler}><Delete/></IconButton>
            </div>
        </>
    );
})

