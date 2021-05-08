import React, { createContext, useReducer, Dispatch } from 'react';
import { CommonType, ProductType, UserType } from '../types';
import {
  productReducer,
  shoppingCartReducer,
  userReducer,
  commonReducer,
  AllActionsType,
} from './reducers';

type InitialStateType = {
  products: ProductType[];
  shoppingCart: { products: ProductType[] };
  user: UserType;
  common: CommonType;
};

export const initialState = {
  products: [],
  shoppingCart: { products: [] },
  user: {
    email: '',
    id: '',
    logedIn: false,
    meta: '{}',
  },
  common: {
    products: {
      limit: 3,
      offset: 0,
    },
  },
};

const AppContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<AllActionsType>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { products, shoppingCart, user, common }: InitialStateType,
  action: AllActionsType
) => ({
  products: productReducer(products, action),
  shoppingCart: shoppingCartReducer(shoppingCart, action),
  user: userReducer(user, action),
  common: commonReducer(common, action),
});

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
