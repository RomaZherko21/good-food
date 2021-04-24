import { useFormik } from 'formik';
import s from './SignIn.module.css';

type fields = {
  email: string;
  password: string;
};

const validate = (values: fields) => {
  const errors: fields = {
    email: '',
    password: '',
  };

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

function SignIn() {
  const formik = useFormik<fields>({
    initialValues: { email: '', password: '' },
    validate,
    onSubmit: (values, e) => {
      console.log(e);
      console.log(values);
    },
  });

  return (
    <section className={s.signIn}>
      <h1>Sign in</h1>
      <form action="" onSubmit={formik.handleSubmit}>
        <label htmlFor="email">email</label>
        <input
          id="email"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          onBlur={formik.handleBlur}
        />
        <span className={s.err}>
          {' '}
          {formik.touched.email && formik.errors.email ? (
            <div className="fields__errors">{formik.errors.email}</div>
          ) : null}
        </span>
        <label htmlFor="password">password</label>
        <input
          id="password"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          onBlur={formik.handleBlur}
        />
        <span className={s.err}>
          {' '}
          {formik.touched.password && formik.errors.password ? (
            <div className="fields__errors">{formik.errors.password}</div>
          ) : null}
        </span>
        <button type="submit">sign in</button>
      </form>
    </section>
  );
}

export default SignIn;
