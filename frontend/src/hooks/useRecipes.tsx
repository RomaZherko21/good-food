import { useContext, useEffect } from 'react';
import serverAPI from '../api/serverAPI';
import { AppContext } from '../state/context';
import { Types } from '../state/reducers';
import { ProductType } from '../types';

const useRecipes = () => {
  const { state, dispatch } = useContext(AppContext);
  useEffect(() => {
    serverAPI.get(
      `/products/?limit=${state.common.products.limit}&offset=${state.common.products.offset}`,
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

    getDataFromLocalStorage(dispatch);
    // eslint-disable-next-line
  }, []);
};

function getDataFromLocalStorage(dispatch: any) {
  let storageRecipies: string | ProductType[] | null = localStorage.getItem('recipies');
  if (storageRecipies != null) {
    storageRecipies = JSON.parse(storageRecipies);
    if (Array.isArray(storageRecipies))
      dispatch({
        type: Types.AddStorageRecipies,
        payload: [...storageRecipies],
      });
  }
}

export default useRecipes;
