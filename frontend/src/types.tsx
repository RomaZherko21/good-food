export type ProductType = {
  id: number;
  name: string;
  price: number;
};
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
