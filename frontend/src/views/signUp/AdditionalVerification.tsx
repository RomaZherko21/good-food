import s from './SignUp.module.css';
import { useContext, useState } from 'react';
import { useFormik } from 'formik';

import { AppContext } from '../../state/context';
import { Types } from '../../state/reducers';
import { AuthFieldsType } from '../../types';
import { serverAPI } from '../../api/serverAPI';
import Input from '../../components/form/Input';

const validate = (values: { token: string }) => {
  const errors = {} as AuthFieldsType;
  if (!values) {
    errors.password = 'Required';
  } else if (values.token.length !== 4) {
    errors.password = 'Wrong token!';
  }
  return errors;
};

const AdditionalVerification: React.FC<{
  QR: string;
  data: AuthFieldsType;
}> = ({ QR, data }) => {
  const [err, setErr] = useState('');
  const { dispatch } = useContext(AppContext);

  const formik = useFormik({
    initialValues: {
      token: '',
    },
    validate,
    onSubmit: (values) => {
      serverAPI<AuthFieldsType>(
        '/auth/emailChecked',
        {
          ...data,
          token: values.token,
        },
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
    <form className={s.additAuth} onSubmit={formik.handleSubmit}>
      <div className={s.emailChecked}>
        <Input
          text="Token that we sended on your email..."
          name="token"
          type="text"
          formik={formik}
        />
        <p>
          We sent token on your email adress, please write it in the field and
          then scant QR code with Google Authenticator app, and then submit!
        </p>
        <button type="submit">Submit</button>
      </div>
      <div className={s.qr}>
        <img src={QR} alt="QR" />
        <p>Please, scan this QR code with Google Authenticator app!!!</p>
      </div>
      <span className={s.err}>{err}</span>
    </form>
  );
};

export default AdditionalVerification;
