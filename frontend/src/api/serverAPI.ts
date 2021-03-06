import axios from 'axios';

const serverAPI = {
  post: <ValueType>(
    URL: string,
    values: ValueType,
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
  },
  get: (URL: string, callback: (response: any) => void, err: (message: string) => void) => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}${URL}`, {
        withCredentials: true,
      })
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
  },
  cookies: (callback: (response: any) => void) => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/auth/cookie`, {
        withCredentials: true,
      })
      .then(function (response) {
        if (response.data.status === 200) {
          callback(response);
        }
      });
  },
};

export default serverAPI;

// export const serverAPI = <ValueType>(
//   URL: string,
//   values: ValueType,
//   callback: (response: any) => void,
//   err: (message: string) => void
// ) => {
//   axios
//     .post(`${process.env.REACT_APP_SERVER_URL}${URL}`, values)
//     .then(function (response) {
//       if (response.data.status === 200) {
//         callback(response);
//       } else {
//         err(response.data.message);
//       }
//     })
//     .catch(function ({ message }) {
//       err(message);
//     });
// };

// export const productAPI = (
//   URL: string,
//   callback: (response: any) => void,
//   err: (message: string) => void
// ) => {
//   axios
//     .get(`${process.env.REACT_APP_SERVER_URL}${URL}`, {
//       withCredentials: true,
//     })
//     .then(function (response) {
//       if (response.data.status === 200) {
//         callback(response);
//       } else {
//         err(response.data.message);
//       }
//     })
//     .catch(function ({ message }) {
//       err(message);
//     });
// };

// export const cookiesAPI = (callback: (response: any) => void) => {
//   axios
//     .get(`${process.env.REACT_APP_SERVER_URL}/auth/cookie`, {
//       withCredentials: true,
//     })
//     .then(function (response) {
//       if (response.data.status === 200) {
//         callback(response);
//       }
//     });
// };
