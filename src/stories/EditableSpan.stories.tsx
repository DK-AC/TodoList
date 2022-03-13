import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {EditableSpan} from "../components/EditableSpan/EditableSpan";
import {action} from "@storybook/addon-actions";

export default {
    title: 'Todolist/EditableSpan',
    component: EditableSpan,
} as ComponentMeta<typeof EditableSpan>;


const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args}/>

export const EditableSpanStories = Template.bind({});

EditableSpanStories.args = {
    title:'test',
    onChange: action('value changed'),
};




