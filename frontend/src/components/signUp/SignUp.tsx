import { useState, useContext } from 'react';
import { useFormik } from 'formik';
import s from './SignUp.module.css';
import axios from 'axios';
import { AppContext } from '../../state/context';
import { Types } from '../../state/reducers';

type fieldsType = {
  email?: string;
  password?: string;
};

const validate = (values: fieldsType) => {
  const errors: fieldsType = {};
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

const SignUp = () => {
  const [showFields, setShowFields] = useState(false);
  const [data, setData] = useState({ password: '', email: '' });
  const [token, setToken] = useState('');
  const [QR, setQR] = useState('');
  const { state, dispatch } = useContext(AppContext);
  const [err, setErr] = useState('');

  const formik = useFormik({
    initialValues: {
      password: '',
      email: '',
    },
    validate,
    onSubmit: (values) => {
      axios
        .post('http://localhost:5000/auth/signUp', values)
        .then(function (response) {
          if (response.data.status === 200) {
            setShowFields(true);
            setQR(response.data.QR);
            setData(values);
          } else {
            setErr(response.data.message);
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    },
  });

  return (
    <section className={s.signUp}>
      <h1>Sign Up {state.user.email}</h1>

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
                axios
                  .post('http://localhost:5000/auth/emailChecked', {
                    ...data,
                    token,
                  })
                  .then(function (response) {
                    if (response.data.status === 200) {
                      setShowFields(false);
                      setQR('');
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
                    } else {
                      setErr(response.data.message);
                    }
                  })
                  .catch(function (err) {
                    console.log(err);
                  });
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
