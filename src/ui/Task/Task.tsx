import React, {ChangeEvent} from 'react';
import {EditableSpan} from "../../components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import {Delete} from "@mui/icons-material";
import Checkbox from '@mui/material/Checkbox';
import {TaskType} from '../../bll/types/taskTypes';
import {useActions} from "../../bll/store";
import {tasksActions} from "../../bll/thunk";

type TaskPropsType = { todolistId: string, filteredTask: TaskType }

export const Task = React.memo(({todolistId, filteredTask}: TaskPropsType) => {

    const {removeTask, updateTask} = useActions(tasksActions)

    const removeTaskHandle = () => {
        removeTask({todolistId, taskId: filteredTask.id})
    }
    const onChangeTaskTitle = (title: string) => {
        updateTask({todolistId, taskId: filteredTask.id, model: {title}})
    }
    const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        updateTask({
            todolistId,
            taskId: filteredTask.id,
            model: {status: e.currentTarget.checked ? 1 : 0}
        })
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
            <IconButton onClick={removeTaskHandle}><Delete/></IconButton>
        </div>
    );
})

