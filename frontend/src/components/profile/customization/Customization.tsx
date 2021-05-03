import s from './Customization.module.css';
import { Formik, Form, Field } from 'formik';
import React, { useContext, useState } from 'react';

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
              <option value="null">Country</option>
              <option value="Belarus">Belarus</option>
              <option value="Russia">Russia</option>
              <option value="Ukraine">Ukraine</option>
              <option value="UK">UK</option>
              <option value="USA">USA</option>
            </Field>
            <label htmlFor="surname">Birthday (DD.MM.YYYY)</label>
            <Field validate={validateBirthday} name="birthday" />
            {errors.birthday && touched.birthday ? (
              <span className={s.err}>{errors.birthday}</span>
            ) : null}

            <label>DO YOU HAVE ANY SPECIAL DIETARY REQUIREMENTS?</label>
            <div className={s.checkboxGroup}>
              <label>
                <Field
                  type="checkbox"
                  name="diet"
                  value="GluetenFree"
                  style={
                    values.diet.find((item) => item === 'GluetenFree')
                      ? { backgroundColor: '#61a5a0' }
                      : { backgroundColor: 'inherit' }
                  }
                />
                <p
                  style={
                    values.diet.find((item) => item === 'GluetenFree')
                      ? { color: 'white' }
                      : { color: 'inherit' }
                  }
                >
                  Glueten Free{' '}
                </p>
              </label>
              <label>
                <Field
                  type="checkbox"
                  name="diet"
                  value="Vegeterian"
                  style={
                    values.diet.find((item) => item === 'Vegeterian')
                      ? { backgroundColor: '#61a5a0' }
                      : { backgroundColor: 'inherit' }
                  }
                />
                <p
                  style={
                    values.diet.find((item) => item === 'Vegeterian')
                      ? { color: 'white' }
                      : { color: 'inherit' }
                  }
                >
                  Vegeterian
                </p>
              </label>
              <label>
                <Field
                  type="checkbox"
                  name="diet"
                  value="Vegan"
                  style={
                    values.diet.find((item) => item === 'Vegan')
                      ? { backgroundColor: '#61a5a0' }
                      : { backgroundColor: 'inherit' }
                  }
                />
                <p
                  style={
                    values.diet.find((item) => item === 'Vegan')
                      ? { color: 'white' }
                      : { color: 'inherit' }
                  }
                >
                  Vegan
                </p>
              </label>
              <label>
                <Field
                  type="checkbox"
                  name="diet"
                  value="DairyFree"
                  style={
                    values.diet.find((item) => item === 'DairyFree')
                      ? { backgroundColor: '#61a5a0' }
                      : { backgroundColor: 'inherit' }
                  }
                />
                <p
                  style={
                    values.diet.find((item) => item === 'DairyFree')
                      ? { color: 'white' }
                      : { color: 'inherit' }
                  }
                >
                  Dairy Free
                </p>
              </label>
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
