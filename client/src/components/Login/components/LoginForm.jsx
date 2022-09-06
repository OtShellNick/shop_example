import React from "react";

const LoginForm = () => {
    return  <div className="Myforma">
    <form className="myform" id="myform">
      <ul className="list myform__list">
        <li className="item myform__item">
      <input
      className="myform__input myform__login"
      id="login"
      name="login"
      type="text"
      placeholder="Login*"
      data-validate-field="login"/>
    </li>
    <li className="item myform__item">
      <input
      className="myform__input myform__password"
      id="password"
      name="password"
      type="text"
      placeholder="Password*"
      data-validate-field="password"/>
    </li>
    </ul>
      <button className="btn myform__btn">Войти</button>
    </form>
    </div>
}

export default LoginForm;