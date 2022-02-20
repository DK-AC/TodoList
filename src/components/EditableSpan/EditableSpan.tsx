import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}

export const EditableSpan = React.memo(({title, onChange}: EditableSpanPropsType) => {
    console.log('EditableSpan')

    const [editMode, setEditMode] = useState(false)
    const [titleValue, setTitleValue] = useState('')

    const activeEditMode = () => {
        setEditMode(true)
        setTitleValue(title)
    }
    const activeViewMode = () => {
        setEditMode(false)
        onChange(title)
    }

    const ChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleValue(e.currentTarget.value)
    }


    return editMode
        ? <input value={titleValue}
                 onChange={ChangeTitle}
                 autoFocus={true}
                 onBlur={activeViewMode}/>
        : <span onDoubleClick={activeEditMode}>{title}</span>

})