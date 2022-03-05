import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Task} from "../ui/Task/Task";

export default {
    title: 'Todolist/Task',
} as ComponentMeta<typeof Task>;


const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;



