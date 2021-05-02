import s from './SignUp.module.css';
import { useState, useContext } from 'react';
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

  return errors;
};

const SignUp: React.FC = () => {
  const [showFields, setShowFields] = useState<boolean>(false);
  const [data, setData] = useState<AuthFieldsType>({ password: '', email: '' });
  const [token, setToken] = useState<string>('');
  const [QR, setQR] = useState<string>('');
  const [err, setErr] = useState<string>('');
  const { dispatch } = useContext(AppContext);

  const formik = useFormik({
    initialValues: {
      password: '',
      email: '',
    },
    validate,
    onSubmit: (values) => {
      authAPI(
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
    <section className={s.signUp}>
      <h1>Sign Up</h1>

      {showFields ? (
        <div className={s.additAuth}>
          <div className={s.emailChecked}>
            <input
              type="text"
              value={token}
              onChange={(e) => {
                setToken(e.target.value);
              }}
            />
            <p>
              We sent token on your email adress, please write it in the field
              and then scant QR code with Google Authenticator app, and then
              submit!
            </p>
            <button
              onClick={() => {
                authAPI(
                  '/auth/emailChecked',
                  {
                    ...data,
                    token,
                  },
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
              }}
            >
              Submit
            </button>
          </div>
          <div className={s.qr}>
            <img src={QR} alt="QR" />
            <p>Please, scan this QR code with Google Authenticator app!!!</p>
          </div>
          <span className={s.err}>{err}</span>
        </div>
      ) : (
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

          <button type="submit">Submit</button>
          <span className={s.err}>{err}</span>
        </form>
      )}
    </section>
  );
};

export default SignUp;
