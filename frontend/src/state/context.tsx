import React, { createContext, useReducer, Dispatch } from 'react';
import { ProductType, UserType } from '../types';
import {
  productReducer,
  ProductActionsType,
  shoppingCartReducer,
  ShoppingCartActionsType,
  userReducer,
  UserActionsType,
} from './reducers';

type InitialStateType = {
  products: ProductType[];
  shoppingCart: number;
  user: UserType;
};

export const initialState = {
  products: [],
  shoppingCart: 0,
  user: { email: '', id: '', logedIn: false },
};

const AppContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<
    ProductActionsType | ShoppingCartActionsType | UserActionsType
  >;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { products, shoppingCart, user }: InitialStateType,
  action: ProductActionsType | ShoppingCartActionsType | UserActionsType
) => ({
  products: productReducer(products, action),
  shoppingCart: shoppingCartReducer(shoppingCart, action),
  user: userReducer(user, action),
});

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);
  let showState = state;
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
