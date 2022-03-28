import React from 'react';
import './App.css';
import {AppBarContainer} from './AppBarContainer';

type PropsType = { demo?: boolean }

export const App = ({demo = false}: PropsType) => {
    return <AppBarContainer demo={demo}/>
}

