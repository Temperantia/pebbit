/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type AuthStackParamList = {
  SignIn: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Listing: undefined;
  CreateAd: undefined;
};

export type HomeParamList = {
  HomeScreen: undefined;
};

export type ListingParamList = {
  ListingScreen: undefined;
};

export type CreateAdParamList = {
  CreateAdScreen: undefined;
};

export type Product = {
  id: string;
} & CreateProduct;

export type Order = {
  id: string;
  address: string;
  product: string;
  currency: string;
  price: number;
  status: string;
};

export type User = {
  id: string;
  phone?: string;
  address?: {
    name: string;
    street: string;
    city: string;
    country: string;
  };
} & CreateUser;

export type CreateUser = {
  email?: string;
};

export type CreateProduct = {
  name: string;
};
