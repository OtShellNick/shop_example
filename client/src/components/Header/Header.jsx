import React from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

import {logout} from "@actions/personal";
import {logoutUser} from "@store/userStore";

import './Header.scss';

const Header = () => {
    const nav = useNavigate();
    const dispatch = useDispatch();

    return <header>
        <button onClick={() => {
            logout().then(() => {
                nav('/login', {replace: true});
                dispatch(logoutUser());
            })
        }}>Exit</button>
    </header>
}

export default Header;