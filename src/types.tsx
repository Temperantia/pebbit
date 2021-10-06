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
  Onboarding: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Listing: undefined;
  CreateAd: undefined;
  Exchange: undefined;
};

export type HomeParamList = {
  HomeScreen: undefined;
};

export type ListingParamList = {
  ListingScreen: undefined;
  AdScreen: { ad: Ad };
};

export type Order = {
  id: string;
  address: string;
  ad: string;
  currency: string;
  price: number;
  status: string;
};

export type Price = {
  address: string;
  amount: number;
};

export type Ad = {
  id?: string;
  title: string;
  category: string;
  condition: string;
  description: string;
  pictures: string[];
  prices: { [currency: string]: Price };
};

export type User = {
  id: string;
  email: string;
  username: string;
  address: Address;
  ads: Ad[];
  orders: Order[];
};

export type Address = {
  name: string;
  street: string;
  city: string;
  country: string;
};
