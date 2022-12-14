import React from "react";
import {Formik} from 'formik';
import * as Yup from 'yup';
import {getAuthorization, registration} from "@actions/personal";
import {useNavigate} from "react-router-dom";

const RegistrationForm = () => {
    const nav = useNavigate();

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
            onSubmit={async (values, {setSubmitting, setErrors}) => {
                setSubmitting(true);

                try {
                    await registration(values);
                    const auth = getAuthorization();
                    if(auth) nav('/', {replace: true});
                    setSubmitting(false);
                } catch (e) {
                    const {message} = e;
                    setErrors({message});
                    setSubmitting(false);
                }
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
                {errors && errors.message && errors.message}
                <button className="btn registration__btn" disabled={isSubmitting}>Зарегестрироваться</button>
            </form>}
        </Formik>
    </div>
}

export default RegistrationForm;