import React, {ChangeEvent} from 'react';
import {EditableSpan} from "../../components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import {Delete} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import Checkbox from '@mui/material/Checkbox';
import {deleteTaskTC, updateTaskTC} from "../../bll/thunk/taskThunk";
import {TaskType} from '../../bll/types/taskTypes';

type TaskPropsType = { todoId: string, filteredTask: TaskType }

export const Task = React.memo(({todoId, filteredTask}: TaskPropsType) => {

    const dispatch = useDispatch()

    const removeTaskHandler = () => dispatch(deleteTaskTC(todoId, filteredTask.id))
    const onChangeTaskTitle = (title: string) => dispatch(updateTaskTC(todoId, filteredTask.id, {title}))
    const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateTaskTC(todoId, filteredTask.id, {status: e.currentTarget.checked ? 1 : 0}))
    }

    return (
        <div key={filteredTask.id}>
            <Checkbox
                color="primary"
                checked={filteredTask.status !== 0}
                onChange={onChangeTaskStatus}
                size={"small"}
            />
            <EditableSpan title={filteredTask.title} onChange={onChangeTaskTitle} />
            <IconButton onClick={removeTaskHandler}><Delete/></IconButton>
        </div>
    );
})

