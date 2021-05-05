import { ProductType, UserType } from '../types';

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum Types {
  SaveProducts = 'SAVE_PRODUCTS',
  Add = 'ADD_PRODUCT',
  SignIn = 'SIGN_IN',
  MetaChange = 'META_CHANGE',
}

export type AllActionsType =
  | ProductActionsType
  | ShoppingCartActionsType
  | UserActionsType;

// Product

type ProductPayload = {
  [Types.SaveProducts]: ProductType[];
};

export type ProductActionsType = ActionMap<ProductPayload>[keyof ActionMap<ProductPayload>];

export const productReducer = (
  state: ProductType[],
  action: AllActionsType
) => {
  switch (action.type) {
    case Types.SaveProducts:
      return [...state, ...action.payload];
    default:
      return state;
  }
};

// ShoppingCart

type ShoppingCartPayload = {
  [Types.Add]: undefined;
};

export type ShoppingCartActionsType = ActionMap<ShoppingCartPayload>[keyof ActionMap<ShoppingCartPayload>];

export const shoppingCartReducer = (state: number, action: AllActionsType) => {
  switch (action.type) {
    case Types.Add:
      return state + 1;
    default:
      return state;
  }
};
// User

type UserPayload = {
  [Types.SignIn]: UserType;
  [Types.MetaChange]: UserType;
};

export type UserActionsType = ActionMap<UserPayload>[keyof ActionMap<UserPayload>];

export const userReducer = (state: UserType, action: AllActionsType) => {
  switch (action.type) {
    case Types.SignIn:
      return {
        ...state,
        email: action.payload.email || '',
        id: action.payload.id || '',
        logedIn: action.payload.logedIn || false,
        meta: action.payload.meta || '{}',
      };
    case Types.MetaChange:
      return {
        ...state,
        meta: action.payload.meta,
      };
    default:
      return state;
  }
};
