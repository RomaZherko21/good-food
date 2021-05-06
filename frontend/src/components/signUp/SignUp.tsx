import s from './SignUp.module.css';
import { useState } from 'react';

import { AuthFieldsType } from '../../types';
import MainFields from './MainFields';
import AdditionalVerification from './AdditionalVerification';

const SignUp: React.FC = () => {
  const [showFields, setShowFields] = useState<boolean>(false);
  const [data, setData] = useState<AuthFieldsType>({ password: '', email: '' });
  const [QR, setQR] = useState<string>('');

  return (
    <section className={s.signUp}>
      <h1>Sign Up</h1>
      {showFields ? (
        <AdditionalVerification QR={QR} data={data} />
      ) : (
        <MainFields
          setQR={setQR}
          setShowFields={setShowFields}
          setData={setData}
        />
      )}
    </section>
  );
};

export default SignUp;
