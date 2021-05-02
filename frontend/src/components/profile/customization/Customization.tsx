import s from './Customization.module.css';
import React from 'react';
import { Formik, Form, Field } from 'formik';

const validateName = (value: string) => {
  let errors = '';
  if (!value) {
    errors = 'Required';
  } else if (value.length > 20) {
    errors = 'Must be 20 characters or less';
  } else if (value.length < 4) {
    errors = 'Must be 2 characters or more';
  }
  return errors;
};
const validateBirthday = (value: string) => {
  let errors = '';
  if (!value) {
    errors = 'Required';
  } else if (!/^[0-9]{2}\.[0-9]{2}\.[0-9]{4}$/i.test(value)) {
    errors = 'Must be dd.mm.yyyy';
  }
  return errors;
};

const Customization = () => {
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
          checked: [],
          toggle: false,
        }}
        onSubmit={(values) => {
          console.log(values);
          console.log(values.checked.find((item) => item === 'One'));
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
                  name="checked"
                  value="GluetenFree"
                  style={
                    values.checked.find((item) => item === 'GluetenFree')
                      ? { backgroundColor: '#61a5a0' }
                      : { backgroundColor: 'inherit' }
                  }
                />
                <p
                  style={
                    values.checked.find((item) => item === 'GluetenFree')
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
                  name="checked"
                  value="Vegeterian"
                  style={
                    values.checked.find((item) => item === 'Vegeterian')
                      ? { backgroundColor: '#61a5a0' }
                      : { backgroundColor: 'inherit' }
                  }
                />
                <p
                  style={
                    values.checked.find((item) => item === 'Vegeterian')
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
                  name="checked"
                  value="Vegan"
                  style={
                    values.checked.find((item) => item === 'Vegan')
                      ? { backgroundColor: '#61a5a0' }
                      : { backgroundColor: 'inherit' }
                  }
                />
                <p
                  style={
                    values.checked.find((item) => item === 'Vegan')
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
                  name="checked"
                  value="DairyFree"
                  style={
                    values.checked.find((item) => item === 'DairyFree')
                      ? { backgroundColor: '#61a5a0' }
                      : { backgroundColor: 'inherit' }
                  }
                />
                <p
                  style={
                    values.checked.find((item) => item === 'DairyFree')
                      ? { color: 'white' }
                      : { color: 'inherit' }
                  }
                >
                  Dairy Free
                </p>
              </label>
            </div>
            <button type="submit">Save and Update</button>
          </Form>
        )}
      </Formik>
    </section>
  );
};
export default Customization;
