import React from "react";

const RegistrationForm = () => {
    return <div className="registration">
    <form className="myregistration" id="myregistration">
      <ul className="list myregistration__list">
        <li className="item myregistration__item">
      <input
      className="myregistration__input myregistration__name"
      id="name"
      name="Имя"
      type="text"
      placeholder="Имя*"
      data-validate-field="name"/>
    </li>
    <li className="item myregistration__item">
      <input
      class="myregistration__input myregistration__email"
      id="email"
      name="email"
      type="email"
      placeholder="Email*"
      data-validate-field="mail"/>
    </li>
    <li className="item myregistration__item">
      <input
      className="myregistration__input myregistration__password"
      id="password"
      name="password"
      type="text"
      placeholder="Password*"
      data-validate-field="password"/>
    </li>
    </ul>
      <button className="btn registration__btn">Зарегестрироваться</button>
    </form>
    </div>
}

export default RegistrationForm;