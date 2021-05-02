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
  Create = 'CREATE_PRODUCT',
  Delete = 'DELETE_PRODUCT',
  Add = 'ADD_PRODUCT',
  SignIn = 'SIGN_IN',
}

// Product

type ProductPayload = {
  [Types.Create]: {
    id: number;
    name: string;
    price: number;
  };
  [Types.Delete]: {
    id: number;
  };
};

export type ProductActionsType = ActionMap<ProductPayload>[keyof ActionMap<ProductPayload>];

export const productReducer = (
  state: ProductType[],
  action: ProductActionsType | ShoppingCartActionsType | UserActionsType
) => {
  switch (action.type) {
    case Types.Create:
      return [
        ...state,
        {
          id: action.payload.id,
          name: action.payload.name,
          price: action.payload.price,
        },
      ];
    case Types.Delete:
      return [...state.filter((product) => product.id !== action.payload.id)];
    default:
      return state;
  }
};

// ShoppingCart

type ShoppingCartPayload = {
  [Types.Add]: undefined;
};

export type ShoppingCartActionsType = ActionMap<ShoppingCartPayload>[keyof ActionMap<ShoppingCartPayload>];

export const shoppingCartReducer = (
  state: number,
  action: ProductActionsType | ShoppingCartActionsType | UserActionsType
) => {
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
};

export type UserActionsType = ActionMap<UserPayload>[keyof ActionMap<UserPayload>];

export const userReducer = (
  state: UserType,
  action: ProductActionsType | ShoppingCartActionsType | UserActionsType
) => {
  switch (action.type) {
    case Types.SignIn:
      return {
        ...state,
        email: action.payload.email || '',
        id: action.payload.id || '',
        logedIn: action.payload.logedIn || false,
      };
    default:
      return state;
  }
};
