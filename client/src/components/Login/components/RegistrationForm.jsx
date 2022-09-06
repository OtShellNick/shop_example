import React from "react";
import {Formik} from 'formik';
import * as Yup from 'yup';

const RegistrationForm = () => {

    const SignupSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        password: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        email: Yup.string()
            .email('Invalid email')
            .required('Required'),
    });

    return <div className="registration">
        <Formik
            initialValues={{name: '', email: "", password: ""}}
            onSubmit={(values) => {
                console.log(values);
            }}
        validationSchema={SignupSchema}>
            {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
              }) => <form className="myregistration" onSubmit={handleSubmit}>
                <ul className="list myregistration__list">
                    <li className="item myregistration__item">
                        <input
                            className="myregistration__input myregistration__name"
                            name="name"
                            placeholder="Имя*"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}/>
                        {errors.name && touched.name && errors.name}
                    </li>
                    <li className="item myregistration__item">
                        <input
                            className="myregistration__input myregistration__email"
                            name="email"
                            type="email"
                            placeholder="Email*"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}/>
                        {errors.email && touched.email && errors.email}
                    </li>
                    <li className="item myregistration__item">
                        <input
                            className="myregistration__input myregistration__password"
                            name="password"
                            type="password"
                            placeholder="Password*"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}/>
                        {errors.password && touched.password && errors.password}
                    </li>
                </ul>
                <button className="btn registration__btn" disabled={isSubmitting}>Зарегестрироваться</button>
            </form>}
        </Formik>
    </div>
}

export default RegistrationForm;