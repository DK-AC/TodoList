import React, {useState} from 'react';
import {ComponentMeta} from '@storybook/react';
import {EditableSpan} from "../components/EditableSpan/EditableSpan";


export default {
    title: 'Todolist/EditableSpan',
    component: EditableSpan,
    argTypes: {
        onChange: {}
    },
} as ComponentMeta<typeof EditableSpan>;

const Template = (args: any) => {

    const [value, setValue] = useState(args.value ?? '');
    return (
        <>
            <EditableSpan
                {...args}
                onChange={(...params) => {
                    args.onChange(...params);
                    setValue(...params);
                }}
                value={value}
            />
        </>
    );
};


export const EditableSpanStories = Template.bind({});



