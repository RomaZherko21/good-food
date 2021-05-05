import s from './Customization.module.css';
import { Formik, Form, Field } from 'formik';
import { useContext, useState } from 'react';

import { serverAPI } from '../../../api/serverAPI';
import { AppContext } from '../../../state/context';
import { MetaDataType } from '../../../types';
import { Types } from '../../../state/reducers';

import { UserType } from '../../../types';

const validateName = (value: string) => {
  let errors: string = '';
  if (!value) {
    errors = 'Required';
  } else if (value.length > 20) {
    errors = 'Must be 20 characters or less';
  } else if (value.length < 2) {
    errors = 'Must be 2 characters or more';
  } else if (!/^[a-z]*$/i.test(value)) {
    errors = 'Must be ENG vocabulary';
  }
  return errors;
};
const validateBirthday = (value: string) => {
  let errors: string = '';
  if (!value) {
    errors = 'Required';
  } else if (!/^[0-9]{2}\.[0-9]{2}\.[0-9]{4}$/i.test(value)) {
    errors = 'Must be dd.mm.yyyy';
  }
  return errors;
};

const Customization = () => {
  const [err, setErr] = useState<string>('');
  const { state, dispatch } = useContext(AppContext);

  const dietArr: string[] = ['GluetenFree', 'Vegeterian', 'Vegan', 'DairyFree'];
  const countries: string[] = [
    'Country',
    'Belarus',
    'Russia',
    'UK',
    'USA',
    'Ukraine',
    'Sweden',
    'Australia',
    'Litva',
    'Latvia',
    'Germany',
  ];

  return (
    <section className={s.customization}>
      <h1>PROFILE</h1>
      <p>
        Do you have any dietary requirements? Would you love some more
        kid-friendly recipes? We’ll send you delicious recipes that suit your
        needs.
      </p>
      <Formik
        initialValues={{
          name: '',
          surname: '',
          country: '',
          birthday: '',
          diet: [],
        }}
        onSubmit={(values: MetaDataType) => {
          serverAPI<UserType>(
            '/customers/changeMetaData',
            { ...state.user, meta: JSON.stringify(values) },
            () => {
              dispatch({
                type: Types.MetaChange,
                payload: {
                  ...state.user,
                  meta: { ...values },
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
        {({ errors, touched, values }) => (
          <Form>
            <label htmlFor="name">Name</label>
            <Field validate={validateName} name="name" type="name" />
            {errors.name && touched.name ? (
              <span className={s.err}>{errors.name}</span>
            ) : null}

            <label htmlFor="surname">Surname</label>
            <Field validate={validateName} name="surname" />
            {errors.surname && touched.surname ? (
              <span className={s.err}>{errors.surname}</span>
            ) : null}

            <Field as="select" name="country">
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </Field>
            <label htmlFor="surname">Birthday (DD.MM.YYYY)</label>
            <Field validate={validateBirthday} name="birthday" />
            {errors.birthday && touched.birthday ? (
              <span className={s.err}>{errors.birthday}</span>
            ) : null}

            <label>DO YOU HAVE ANY SPECIAL DIETARY REQUIREMENTS?</label>
            <div className={s.checkboxGroup}>
              {dietArr.map((diet) => (
                <label key={diet}>
                  <Field
                    type="checkbox"
                    name="diet"
                    value={diet}
                    style={
                      values.diet.find((item) => item === diet)
                        ? { backgroundColor: '#61a5a0' }
                        : { backgroundColor: 'inherit' }
                    }
                  />
                  <p
                    style={
                      values.diet.find((item) => item === diet)
                        ? { color: 'white' }
                        : { color: 'inherit' }
                    }
                  >
                    {diet}
                  </p>
                </label>
              ))}
            </div>
            <button type="submit">Save and Update</button>
            <span className={s.err}>{err}</span>
          </Form>
        )}
      </Formik>
    </section>
  );
};
export default Customization;
