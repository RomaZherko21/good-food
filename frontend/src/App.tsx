import { useContext, useEffect } from 'react';
import { cookiesAPI } from './api/serverAPI';
import './App.css';
import Routes from './Routes';
import { AppContext } from './state/context';
import { Types } from './state/reducers';

function App() {
  const { dispatch } = useContext(AppContext);
  useEffect(() => {
    cookiesAPI((response) => {
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

  return <Routes />;
}

export default App;
