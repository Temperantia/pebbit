import { ImageSourcePropType } from "react-native";

export const categories: string[] = [
  "Animals Accessories",
  "Bikes & Accessories",
  "Books",
  "Clothes",
  "Home & Déco",
  "Jewellery & Prec.metals",
  "Miscellaneous",
  "Multimedia",
  "Music & Instruments",
  "Sports",
  "Toys & Hobbies",
  "Vehicles & Accessories",
];

export const currencies: {
  [currency: string]: {
    symbol: string;
    image: ImageSourcePropType;
    minimum: number;
  };
} = {
  Bitcoin: {
    symbol: "BTC",
    image: require("../assets/images/Bitcoin.png"),
    minimum: 0.0001,
  },
  Litecoin: {
    symbol: "LTC",
    image: require("../assets/images/Litecoin.png"),
    minimum: 0.0001,
  },
  "Binance Coin": {
    symbol: "BNB",
    image: require("../assets/images/BinanceCoin.png"),
    minimum: 0.0001,
  },
  /*  Ethereum: {
    symbol: "ETH",
    image: require("../assets/images/Ethereum.png"),
    minimum: 0.16,
  }, */
};

export const statusColors: { [status: string]: string } = {
  paid: "red-main",
  sent: "orange-main",
  received: "gold-badge-gradient",
  complete: "green-main",
};

export const countries: string[] = [
  "Algeria",
  "Andorra",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Barbados",
  "Belarus",
  "Bangladesh",
  "Belgium",
  "Belize",
  "Benin",
  "Bolivia",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic (CAR)",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Costa Rica",
  "Cote d'Ivoire",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czechia",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Estonia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kenya",
  "Kuwait",
  "Kyrgyzstan",
  "Lebanon",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Namibia",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "South Africa",
  "South Korea",
  "Spain",
  "Sri Lanka",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Ukraine",
  "United Arab Emirates (UAE)",
  "United Kingdom (UK)",
  "United States of America (USA)",
  "Uruguay",
  "Vanuatu",
  "Vatican City (Holy See)",
  "Venezuela",
  "Vietnam",
];
