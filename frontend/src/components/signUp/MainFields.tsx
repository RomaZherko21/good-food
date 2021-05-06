import s from './SignUp.module.css';
import { useState } from 'react';
import { useFormik } from 'formik';

import { AuthFieldsType } from '../../types';
import { serverAPI } from '../../api/serverAPI';
import AuthInput from '../common/AuthInput';

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

  return errors;
};

const MainFields: React.FC<{
  setQR: (val: string) => void;
  setShowFields: (val: boolean) => void;
  setData: (val: AuthFieldsType) => void;
}> = ({ setShowFields, setData, setQR }) => {
  const [err, setErr] = useState<string>('');
  const formik = useFormik({
    initialValues: {
      password: '',
      email: '',
    },
    validate,
    onSubmit: (values) => {
      serverAPI(
        '/auth/signUp',
        values,
        (response) => {
          setShowFields(true);
          setQR(response.data.QR);
          setData(values);
        },
        (message) => {
          setErr(message);
        }
      );
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <AuthInput
        text="Email Address"
        name="email"
        type="email"
        formik={formik}
      />
      <AuthInput
        text="Password"
        name="password"
        type="password"
        formik={formik}
      />
      <button type="submit">Submit</button>
      <span className={s.err}>{err}</span>
    </form>
  );
};

export default MainFields;
