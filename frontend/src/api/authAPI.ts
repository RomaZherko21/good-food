import axios from 'axios';

import { AuthFieldsType } from '../types';

export const authAPI = (
  URL: string,
  values: AuthFieldsType,
  callback: (response: any) => void,
  err: (message: string) => void
) => {
  axios
    .post(`${process.env.REACT_APP_SERVER_URL}${URL}`, values)
    .then(function (response) {
      if (response.data.status === 200) {
        callback(response);
      } else {
        err(response.data.message);
      }
    })
    .catch(function ({ message }) {
      err(message);
    });
};
