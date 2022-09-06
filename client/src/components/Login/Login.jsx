import React, {useState} from "react";

import LoginForm from "@components/Login/components/LoginForm";
import RegistrationForm from "@components/Login/components/RegistrationForm";

import './Login.scss';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    return <div className="container">
        <div className="form">
            <div className="form__header">
                <h1 className="title form__title">{isLogin ? "Login" : "Registration"}</h1>
                <button className="btn form__btn"
                        onClick={() => setIsLogin(prevState => !prevState)}>{isLogin ? 'Registration' : 'Login'}</button>
            </div>
            {isLogin && <LoginForm/>}
            {!isLogin && <RegistrationForm/>}
        </div>
    </div>
};

export default Login;