import React, {ChangeEvent} from 'react';
import {EditableSpan} from "../../components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import {Delete} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {updateTaskAC} from "../../bll/actions/taskActions";
import {TaskType} from "../../dal/api/tasks-api";
import Checkbox from '@mui/material/Checkbox';
import {deleteTaskTC} from "../../bll/thunk/taskThunk";

type TaskPropsType = { todoId: string, filteredTask: TaskType }
export type TasksStateType = { [key: string]: Array<TaskType> }


export const Task = React.memo(({todoId, filteredTask}: TaskPropsType) => {

    const dispatch = useDispatch()

    const removeTaskHandler = () => {
        dispatch(deleteTaskTC(todoId, filteredTask.id))
    }
    const onChangeTaskTitle = (title: string) => {
        dispatch(updateTaskAC(todoId, filteredTask.id, {title}))
    }
    const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateTaskAC(todoId, filteredTask.id, {status: e.currentTarget.checked ? 2 : 0}))
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

