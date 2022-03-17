/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type RootStackParamList = {
  Root: undefined;
  Profile: undefined;
  Settings: undefined;
  NotFound: undefined;
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
  AdScreen: { id: string };
};

export type ListingParamList = {
  ListingScreen: undefined;
  AdScreen: { id: string };
};

export type ExchangeParamList = {
  ExchangeScreen: undefined;
  AdScreen: { id: string };
  MessagesScreen: { id: string };
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

export type Message = {
  author: {
    id: string;
    username: string;
  };
  created: any;
  content: string;
};

export type Ad = {
  id: string;
  userId: string;
  username: string;
  created: any;
  paid: any;
  title: string;
  currencies: string[];
  category: string;
  condition: string;
  description: string;
  pictures: string[];
  prices: { [currency: string]: Price };
  location: string;
  status: string;
  cooldown: number;
  buyer: {
    userId: string;
    username: string;
    currency: string;
    inputAddress: string;
    address: Address;
    fee: number;
  };
  messages?: Message[];
  service?: string;
  number?: string;
  rate?: number;
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
  messagingList?: Ad[];
  history?: Ad[];
  rates?: number[];
  rate?: number | null;
  coinbase?: { refreshToken: string };
};

export type Address = {
  name: string;
  street: string;
  city: string;
  country: string;
};
