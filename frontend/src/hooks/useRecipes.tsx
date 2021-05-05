import { useContext, useEffect } from 'react';
import { productAPI } from '../api/serverAPI';
import { AppContext } from '../state/context';
import { Types } from '../state/reducers';

const useRecipes = () => {
  const { dispatch } = useContext(AppContext);
  useEffect(() => {
    productAPI(
      '/products/?limit=10&offset=0',
      (response) => {
        dispatch({
          type: Types.SaveProducts,
          payload: [...response.data.data],
        });
      },
      (message) => {
        console.log(message);
      }
    );
  }, []);
};

export default useRecipes;
