import React, {useEffect} from 'react';
import {Route, Routes, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

import {getAuthorization, getSelf} from "@actions/personal";
import {loginUser} from "@store/userStore";

import Layout from "@components/Layout/Layout";
import Login from "@components/Login/Login";
import Home from "@components/Home/Home";

const App = () => {
    const auth = getAuthorization();
    const nav = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if(auth) getSelf().then(user => dispatch(loginUser(user)));
        if(!auth && location.pathname !== '/login') nav('/login');
        if(auth && location.pathname === '/login') nav('/');

    }, [auth])

    return <Routes>
        <Route element={<Layout />} >
            <Route path='/' element={<Home/>}/>
        </Route>
        <Route path='login' element={<Login/>}/>
    </Routes>
}

export default App;