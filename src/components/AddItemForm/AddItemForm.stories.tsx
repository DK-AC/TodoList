import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';

import {AddItemForm} from "./AddItemForm";
import {action} from "@storybook/addon-actions";

export default {
    title: 'Todolist/AddItemForm',
    component: AddItemForm,
    argTypes: {
        callback: {
            description: 'form is added'
        }
    },
} as ComponentMeta<typeof AddItemForm>;


const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const AddItemFormStories = Template.bind({});

const asyncCallback = async (...payload: any[]) => {
    action('Button inside form clicked')(...payload)
}

AddItemFormStories.args = {
    callback: asyncCallback
};

export const AddItemFormDisabledStories = Template.bind({});

AddItemFormDisabledStories.args = {
    callback: asyncCallback,
    disabled: true
};