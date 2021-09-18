/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
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
  name: string;
};

export type Order = {
  id: string;
  address: string;
  product: string;
  currency: string;
  price: number;
  status: string;
};

export type CreateProduct = {
  name: string;
};
