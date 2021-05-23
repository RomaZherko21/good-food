import s from './SignIn.module.css';
import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';

import { AppContext } from '../../state/context';
import { Types } from '../../state/reducers';
import { AuthFieldsType } from '../../types';
import { serverAPI } from '../../api/serverAPI';
import Input from '../../components/form/Input';

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
      serverAPI<AuthFieldsType>(
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
              meta: JSON.parse(response.data.meta),
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
        <Input text="Email Address" name="email" type="email" formik={formik} />
        <Input text="Password" type="password" name="password" formik={formik} />
        <Input text="Google Authenticator token" type="password" name="token" formik={formik} />
        <button type="submit">Submit</button>
        <span className={s.err}>{err}</span>
      </form>
    </section>
  );
};

export default SignIn;
