import React from "react";

import './Home.scss';
import {logout} from "@actions/personal";
import {useNavigate} from "react-router-dom";

const Home = () => {
    const nav = useNavigate();

    return <div>Home
    <button onClick={() => {
        logout().then(() => nav('/login', {replace: true}))
    }}>Exit</button>
    </div>
}

export default Home;