import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
    disabled?: boolean
}

export const EditableSpan = React.memo(({title, onChange, disabled = false}: EditableSpanPropsType) => {

    const [editMode, setEditMode] = useState(false)
    const [titleValue, setTitleValue] = useState(title)

    const activeEditMode = () => {
        setEditMode(true)
        setTitleValue(titleValue)
    }
    const activeViewMode = () => {
        setEditMode(false)
        onChange(titleValue)
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleValue(e.currentTarget.value)
    }

    return editMode
        ? <input value={titleValue}
                 onChange={changeTitle}
                 autoFocus={true}
                 onBlur={activeViewMode}
                 disabled={disabled}
        />
        : <span onDoubleClick={activeEditMode}>{titleValue}</span>

})