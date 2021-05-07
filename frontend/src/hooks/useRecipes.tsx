import { useContext, useEffect } from 'react';
import { productAPI } from '../api/serverAPI';
import { AppContext } from '../state/context';
import { Types } from '../state/reducers';

const useRecipes = (limit: number = 6, offset: number = 0) => {
  const { dispatch } = useContext(AppContext);
  useEffect(() => {
    productAPI(
      `/products/?limit=${limit}&offset=${offset}`,
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
  }, [dispatch]);
};

export default useRecipes;
