import React, {useEffect} from 'react';

import {registration} from "@actions/personal";
import {Route, Routes} from "react-router-dom";

import Layout from "@components/Layout/Layout";
import Login from "@components/Login/Login";
import Home from "@components/Home/Home";

const App = () => {

    useEffect(() => {
        registration({email: 'test@example.com'});
    }, [])

    return <Routes>
        <Route element={<Layout />} >
            <Route path='/' element={<Home/>}/>
        </Route>
        <Route path='login' element={<Login/>}/>
    </Routes>
}

export default App;