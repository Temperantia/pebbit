import { ImageSourcePropType } from "react-native";

export const categories = [
  "Home & Garden",
  "Cars & Vehicles",
  "Clothing & Jewelry",
  "Electronics & Computer",
  "Baby & Children",
  "Antiques, Art & Collectibles",
  "Books, Music & Games",
  "Miscellaneous Goods",
  "Pets",
  "Real Estate",
  "Boats & Jet Skis",
  "Community",
  "Tickets",
  "Services For Hire",
];

export const currencies: {
  [currency: string]: { symbol: string; image: ImageSourcePropType };
} = {
  Bitcoin: { symbol: "BTC", image: require("../assets/images/Bitcoin.png") },
  Ethereum: { symbol: "ETH", image: require("../assets/images/Ethereum.png") },
};
