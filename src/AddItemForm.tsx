import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== '') {
            props.addItem(title)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const onChangeValueTasks = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressTasks = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            props.addItem(title)
        }
        setError(null)
    }

    return (
        <div>
            <input
                value={title}
                onChange={onChangeValueTasks}
                onKeyPress={onKeyPressTasks}
                className={error ? 'error' : ''}
            />
            <button onClick={addTask}>+</button>
            {error && < div className={'errorMessage'}> {error}</div>}
        </div>
    )
}