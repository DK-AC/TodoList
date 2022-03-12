import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {AppBarContainer} from "../ui/App/AppBarContainer";
import {Provider} from "react-redux";
import {store} from "../bll/store";

export default {
    title: 'Todolist/App',
    component: AppBarContainer,
} as ComponentMeta<typeof AppBarContainer>;


const Template: ComponentStory<typeof AppBarContainer> = () => {
    return <Provider store={store}> <AppBarContainer/> </Provider>
};

export const AppBarContainerStories = Template.bind({});

