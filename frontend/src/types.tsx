export type ProductType = {
  id: number;
  name: string;
  price: number;
};

export type UserType = {
  logedIn: boolean;
  id: string;
  email: string;
};

export type AuthFieldsType = {
  email: string;
  password: string;
  token?: string;
};
