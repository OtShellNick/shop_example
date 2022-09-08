import React, {useEffect} from 'react';

import {getAuthorization} from "@actions/personal";
import {Route, Routes, useNavigate} from "react-router-dom";

import Layout from "@components/Layout/Layout";
import Login from "@components/Login/Login";
import Home from "@components/Home/Home";

const App = () => {
    const nav = useNavigate();

    useEffect(() => {
        const auth = getAuthorization();
        if(!auth && location.pathname !== '/login') nav('/login');
        if(auth && location.pathname === '/login') nav('/');

    }, [])

    return <Routes>
        <Route element={<Layout />} >
            <Route path='/' element={<Home/>}/>
        </Route>
        <Route path='login' element={<Login/>}/>
    </Routes>
}

export default App;