import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {AppBarContainer} from "./AppBarContainer";
import {ReduxStoreProviderDecorator} from "../../stories/reduxStoreProviderDecorator";

export default {
    title: 'Todolist/App',
    component: AppBarContainer,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof AppBarContainer>;


const Template: ComponentStory<typeof AppBarContainer> = () => <AppBarContainer/>


export const AppBarContainerStories = Template.bind({});

