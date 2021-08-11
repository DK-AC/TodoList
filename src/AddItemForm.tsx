import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeValueTasks = (e: ChangeEvent<HTMLInputElement>) => {
        const VALUE = e.currentTarget.value

        if (VALUE.length > 0) {
            setTitle(VALUE)
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