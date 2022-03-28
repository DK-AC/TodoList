import React from "react";
import {Route, Routes} from "react-router-dom";
import {Login} from "../Login/Login";
import {TodolistsList} from "../TodolistList/TodolistsList";

export const PATH = {
    START_PAGE: '/',
    LOGIN_PAGE: '/login',
}

export const Routing = () => {
    return (
        <>
            <Routes>
                <Route path={PATH.START_PAGE} element={<TodolistsList/>}/>
                <Route path={PATH.LOGIN_PAGE} element={<Login/>}/>
            </Routes>
        </>
    )
}