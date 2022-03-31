import React, {ChangeEvent} from 'react';
import {EditableSpan} from "../../components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import {Delete} from "@mui/icons-material";
import Checkbox from '@mui/material/Checkbox';
import {removeTask, updateTask} from "../../bll/thunk/taskThunk";
import {TaskType} from '../../bll/types/taskTypes';
import {useAppDispatch} from "../../bll/store";

type TaskPropsType = { todoId: string, filteredTask: TaskType }

export const Task = React.memo(({todoId, filteredTask}: TaskPropsType) => {

    const dispatch = useAppDispatch()

    const removeTaskHandler = () => dispatch(removeTask({todolistId: todoId, taskId: filteredTask.id}))
    const onChangeTaskTitle = (title: string) => {
        dispatch(updateTask({todolistId: todoId, taskId: filteredTask.id, model: {title}}))
    }
    const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateTask({
            todolistId: todoId,
            taskId: filteredTask.id,
            model: {status: e.currentTarget.checked ? 1 : 0}
        }))
    }

    return (
        <div key={filteredTask.id}>
            <Checkbox
                color="primary"
                checked={filteredTask.status !== 0}
                onChange={onChangeTaskStatus}
                size={"small"}
            />
            <EditableSpan title={filteredTask.title} onChange={onChangeTaskTitle}/>
            <IconButton onClick={removeTaskHandler}><Delete/></IconButton>
        </div>
    );
})

