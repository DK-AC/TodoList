import React, {ChangeEvent} from 'react';
import {EditableSpan} from "../../components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import {Delete} from "@mui/icons-material";
import Checkbox from '@mui/material/Checkbox';
import {TaskType} from '../../bll/types/taskTypes';
import {useActions} from "../../bll/store";
import {tasksActions} from "../../bll/thunk";

type TaskPropsType = { todolistId: string, task: TaskType }

export const Task = React.memo(({todolistId, task}: TaskPropsType) => {

    const {removeTask, updateTask} = useActions(tasksActions)

    const removeTaskHandle = () => {
        removeTask({todolistId, taskId: task.id})
    }
    const onChangeTaskTitle = (title: string) => {
        updateTask({todolistId, taskId: task.id, model: {title}})
    }
    const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        updateTask({
            todolistId,
            taskId: task.id,
            model: {status: e.currentTarget.checked ? 1 : 0}
        })
    }

    return (
        <div key={task.id} style={{position: 'relative'}}>
            <Checkbox
                color="primary"
                checked={task.status !== 0}
                onChange={onChangeTaskStatus}
                size={"small"}
            />
            <EditableSpan title={task.title} onChange={onChangeTaskTitle}/>
            <IconButton onClick={removeTaskHandle}
                        size={'small'}
                        style={{position: 'absolute', top: '2px', right: '5px'}}>
                <Delete fontSize={'small'}/>
            </IconButton>
        </div>
    );
})

