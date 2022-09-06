import React from "react";

import LoginForm from "@components/Login/components/LoginForm";
import RegistrationForm from "@components/Login/components/RegistrationForm";

import './Login.scss';

const Login = () => {
    return <div className="container"><div className="form">
        <h1 className="title form__title">Login</h1>
        <button className="btn form__btn">Registration</button>
    </div>
    </div>
};

export default Login;