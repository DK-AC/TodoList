import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {AddBox} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import style from './AddItemForm.module.css'

export type AddItemFormHelperType = {
    setTitle: (title: string) => void
    setError: (error: string) => void
}

type AddItemFormPropsType = {
    callback: (title: string, helper: AddItemFormHelperType) => void
    disabled?: boolean
}

export const AddItemForm = React.memo(({
                                           callback,
                                           disabled = false
                                       }: AddItemFormPropsType) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== '') {
            callback(title, {setTitle, setError})
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
        <div className={style.row}>
            <TextField variant={"outlined"}
                       value={title}
                       onChange={onChangeValueTasks}
                       onKeyPress={onKeyPressTasks}
                       size={"small"}
                       error={!!error}
                       label='Title'
                       helperText={error}
                       disabled={disabled}
            />
            <IconButton color="primary" onClick={addItem} size={"small"}
                        disabled={disabled}
                        style={{marginLeft: '5px'}}>
                <AddBox/>
            </IconButton>
        </div>
    )
})