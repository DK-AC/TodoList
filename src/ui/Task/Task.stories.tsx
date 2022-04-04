import React from 'react';
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {Task} from "./Task";
import {ReduxStoreProviderDecorator} from "../../stories/reduxStoreProviderDecorator";

export default {
    title: 'Todolist/Task',
    component: Task,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof Task>;


const Template: ComponentStory<typeof Task> = (args) => <Task {...args}/>

export const TaskStories = Template.bind({});

TaskStories.args = {
    task: {
        id: '1',
        title: 'HTML',
        status: 1,
        todoListId: 'todoListId1',
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: 1,
        startDate: ''
    },
};







