import s from './SignIn.module.css';
import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';

import { AppContext } from '../../state/context';
import { Types } from '../../state/reducers';
import { AuthFieldsType } from '../../types';
import { authAPI } from '../../api/authAPI';

const validate = (values: AuthFieldsType) => {
  const errors = {} as AuthFieldsType;
  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length > 20) {
    errors.password = 'Must be 20 characters or less';
  } else if (values.password.length < 5) {
    errors.password = 'Must be 5 characters or more';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.token) {
    errors.token = 'Required';
  } else if (!/^[0-9]{6}$/i.test(values.token)) {
    errors.token = 'Invalid token!';
  }

  return errors;
};

const SignIn: React.FC = () => {
  const [err, setErr] = useState<string>('');
  const { dispatch } = useContext(AppContext);

  const formik = useFormik({
    initialValues: {
      password: '',
      email: '',
      token: '',
    },
    validate,
    onSubmit: (values) => {
      authAPI(
        '/auth/signIn',
        values,
        (response) => {
          document.cookie = `password=${response.data.password}`;
          dispatch({
            type: Types.SignIn,
            payload: {
              email: response.data.email,
              id: response.data.id,
              logedIn: true,
            },
          });
          window.history.back();
        },
        (message) => {
          setErr(message);
        }
      );
    },
  });
  return (
    <section className={s.signIn}>
      <h1>Sign In</h1>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          onBlur={formik.handleBlur}
        />
        <span className={s.err}>
          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
          ) : null}
        </span>

        <label htmlFor="password">password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          onBlur={formik.handleBlur}
        />
        <span className={s.err}>
          {formik.touched.password && formik.errors.password ? (
            <div>{formik.errors.password}</div>
          ) : null}
        </span>

        <label htmlFor="token">Google Authenticator token</label>
        <input
          id="token"
          name="token"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.token}
          onBlur={formik.handleBlur}
        />
        <span className={s.err}>
          {formik.touched.token && formik.errors.token ? (
            <div>{formik.errors.token}</div>
          ) : null}
        </span>

        <button type="submit">Submit</button>
        <span className={s.err}>{err}</span>
      </form>
    </section>
  );
};

export default SignIn;
