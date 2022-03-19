import {AddBox} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
    callback: (title: string) => void
}

export const AddItemForm = React.memo(({callback}: AddItemFormPropsType) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== '') {
            callback(title)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const onChangeValueTasks = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value

        if (value.length >= 0) {
            setTitle(value)
            setError(null)
        }
    }
    const onKeyPressTasks = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.key === 'Enter') {
            addItem()
        }
    }


    return (
        <div>
            <TextField variant={"outlined"}
                       value={title}
                       onChange={onChangeValueTasks}
                       onKeyPress={onKeyPressTasks}
                       size={"small"}
                       error={!!error}
                       label='Title'
                       helperText={error}
            />
            <IconButton color="primary" onClick={addItem} size={"small"}>
                <AddBox/>
            </IconButton>
        </div>
    )
})