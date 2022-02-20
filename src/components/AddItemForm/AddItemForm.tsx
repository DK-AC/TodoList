import {AddBox} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
    console.log('AddItemForm')

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeValueTasks = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value

        if (value.length > 0) {
            setTitle(value)
            setError(null)
        }
    }
    const onKeyPressTasks = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)

        if (title.trim() && e.charCode === 13) {
            props.addItem(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const addTask = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
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
            <IconButton color="primary"
                        onClick={addTask}
                        size={"small"}
            >
                <AddBox/>
            </IconButton>
        </div>
    )
}