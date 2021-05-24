import { useContext, useEffect } from 'react';
import serverAPI from '../api/serverAPI';
import { AppContext } from '../state/context';
import { Types } from '../state/reducers';

const useCookies = () => {
  const { dispatch } = useContext(AppContext);
  useEffect(() => {
    serverAPI.cookies((response) => {
      dispatch({
        type: Types.SignIn,
        payload: {
          email: response.data.email,
          id: response.data.id,
          logedIn: true,
          meta: JSON.parse(response.data.meta),
        },
      });
    });
  }, [dispatch]);
};

export default useCookies;
