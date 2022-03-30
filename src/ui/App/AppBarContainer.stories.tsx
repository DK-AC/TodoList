import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {AppBarContainer} from "./AppBarContainer";
import {HashRouterDecorator, ReduxStoreProviderDecorator} from "../../stories/reduxStoreProviderDecorator";
import {App} from "./App";

export default {
    title: 'Todolist/App',
    component: AppBarContainer,
    decorators: [ReduxStoreProviderDecorator, HashRouterDecorator]
} as ComponentMeta<typeof AppBarContainer>;


const Template: ComponentStory<typeof App> = () => <App demo={true}/>


export const AppBarContainerStories = Template.bind({});

