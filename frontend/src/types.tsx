export type UserType = {
  logedIn: boolean;
  id: string;
  email: string;
  meta?: MetaDataType | string;
};
export type MetaDataType = {
  name?: string;
  surname?: string;
  country?: string;
  birthday?: string;
  diet?: string[];
};

export type AuthFieldsType = {
  email: string;
  password: string;
  token?: string;
};

export type ProductType = {
  id: number;
  name: string;
  ingredients: ProductIngredientsType;
  steps: string;
  timers: ProductTimersType;
  imageURL: string;
  originalURL?: string;
};

export type ProductTimersType = number[];
export type ProductIngredientsType = {
  quantity: string;
  name: string;
  type: string;
}[];
