import { ProductType, UserType, CommonType } from '../types';

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
  AddToShoppingCart = 'ADD_TO_SHOPPING_CART',
  RemoveFromShoppingCart = 'REMOVE_FROM_SHOPPING_CART',
  SignIn = 'SIGN_IN',
  MetaChange = 'META_CHANGE',
  ProductsLimit = 'PRODUCTS_LIMIT',
  ProductsOffset = 'PRODUCTS_OFFSET',
}

export type AllActionsType =
  | ProductActionsType
  | ShoppingCartActionsType
  | UserActionsType
  | CommonActionsType;

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
  [Types.AddToShoppingCart]: ProductType;
  [Types.RemoveFromShoppingCart]: ProductType;
};

export type ShoppingCartActionsType = ActionMap<ShoppingCartPayload>[keyof ActionMap<ShoppingCartPayload>];

export const shoppingCartReducer = (
  state: { products: ProductType[] },
  action: AllActionsType
) => {
  switch (action.type) {
    case Types.AddToShoppingCart:
      return {
        ...state,
        products:
          state.products.filter(
            (item: ProductType) => item.id === action.payload.id
          ).length > 0
            ? [...state.products]
            : [...state.products, action.payload],
      };
    case Types.RemoveFromShoppingCart:
      return {
        ...state,
        products: state.products.filter(
          (item: ProductType) => item.id !== action.payload.id
        ),
      };
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

//Common

type CommonPayload = {
  [Types.ProductsLimit]: undefined;
  [Types.ProductsOffset]: undefined;
};

export type CommonActionsType = ActionMap<CommonPayload>[keyof ActionMap<CommonPayload>];

export const commonReducer = (state: CommonType, action: AllActionsType) => {
  switch (action.type) {
    case Types.ProductsLimit:
      return {
        ...state,
      };
    case Types.ProductsOffset:
      return {
        ...state,
        products: {
          ...state.products,
          offset: state.products.offset + state.products.limit,
        },
      };
    default:
      return state;
  }
};
