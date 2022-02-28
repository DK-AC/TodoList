import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Task} from "../ui/Task/Task";

export default {
    title: 'Todolist/Task',
    component: Task,
    argTypes: {},
} as ComponentMeta<typeof Task>;

// const changeTaskStatusCallback = action('Status changed inside Task')
// const changeTaskTitleCallback = action('Title changed inside Task')
// const removeTaskCallback = action('Remove Button inside Task clicked')


const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDoneStories = Template.bind({});
TaskIsDoneStories.args = {
    filteredTask: {id: '1', title: 'new', isDone: false},
    todoId: 'todolistId:'
};