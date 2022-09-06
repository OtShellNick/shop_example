import React from "react";
import {Formik} from 'formik';
import * as Yup from 'yup';

const LoginForm = () => {

    const LoginSchema = Yup.object().shape({
        password: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        email: Yup.string()
            .email('Invalid email')
            .required('Required'),
    });

    return <div className="Myforma">
        <Formik
            initialValues={{email: "", password: ""}}
            onSubmit={(values) => {
                console.log(values);
            }}
            validationSchema={LoginSchema}>
            {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
              }) => <form className="myform" onSubmit={handleSubmit}>
                <ul className="list myform__list">
                    <li className="item myform__item">
                        <input
                            className="myform__input myform__login"
                            name="email"
                            type="email"
                            placeholder="Email*"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}/>
                        {errors.email && touched.email && errors.email}
                    </li>
                    <li className="item myform__item">
                        <input
                            className="myform__input myform__password"
                            name="password"
                            type="password"
                            placeholder="Password*"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}/>
                        {errors.password && touched.password && errors.password}
                    </li>
                </ul>
                <button className="btn myform__btn" disabled={isSubmitting}>Войти</button>
            </form>}
        </Formik>
    </div>
}

export default LoginForm;