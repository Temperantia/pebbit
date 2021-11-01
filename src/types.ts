/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type RootStackParamList = {
  Root: undefined;
  Settings: undefined;
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
  AdScreen: { id: string };
};

export type ExchangeParamList = {
  ExchangeScreen: undefined;
  AdScreen: { id: string };
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
  id: string;
  created: any;
  paid: any;
  cooldown: number;
  title: string;
  currencies: string[];
  category: string;
  condition: string;
  description: string;
  pictures: string[];
  prices: { [currency: string]: Price };
  status: string;
  userId: string;
  buyer: {
    userId: string;
    currency: string;
    inputAddress: string;
    address: Address;
  };
};

export type User = {
  id: string;
  email: string | null;
  username: string;
  phone: string | null;
  address: Address;
  ads: { [id: string]: Ad };
  buyingList?: Ad[];
  sellingList?: Ad[];
  history?: Ad[];
};

export type Address = {
  name: string;
  street: string;
  city: string;
  country: string;
};
