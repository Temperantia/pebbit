import { ImageSourcePropType } from "react-native";

export const categories: {
  [key: string]: { [language: string]: string };
} = {
  "Animals Accessories": {
    fr: "Accessoires pour Animaux",
    en: "Animals Accessories",
  },
  "Bikes & Accessories": {
    fr: "Vélos & Accessoires",
    en: "Bikes & Accessories",
  },
  Books: {
    fr: "Livres",
    en: "Books",
  },
  Clothes: {
    fr: "Vêtements",
    en: "Clothes",
  },
  "Home Decor": {
    fr: "Maison & Déco",
    en: "Home Decor",
  },
  "Jewellery & Prec.metals": {
    fr: "Joaillerie & Métaux précieux",
    en: "Jewellery & Prec.metals",
  },
  Miscellaneous: {
    fr: "Divers",
    en: "Miscellaneous",
  },
  Multimedia: {
    fr: "Multimédia",
    en: "Multimedia",
  },
  "Music & Instruments": {
    fr: "Musique & Instruments",
    en: "Music & Instruments",
  },
  Sports: {
    fr: "Sports",
    en: "Sports",
  },
  "Toys & Hobbies": {
    fr: "Jouets & Hobbies",
    en: "Toys & Hobbies",
  },
  "Vehicles & Accessories": {
    fr: "Véhicules & Accessoires",
    en: "Vehicles & Accessories",
  },
};

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
    minimum: 0.0008,
  },
  Litecoin: {
    symbol: "LTC",
    image: require("../assets/images/Litecoin.png"),
    minimum: 0.08,
  },
  "Binance Coin": {
    symbol: "BNB",
    image: require("../assets/images/BinanceCoin.png"),
    minimum: 0.075,
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

export const countries: {
  [key: string]: { [language: string]: string };
} = {
  Algeria: {
    en: "Algeria",
    fr: "Algérie",
  },
  Andorra: {
    en: "Andorra",
    fr: "Andorre",
  },
  "Antigua and Barbuda": {
    en: "Antigua and Barbuda",
    fr: "Antigua-et-Barbuda",
  },
  Argentina: {
    en: "Argentina",
    fr: "Argentine",
  },
  Armenia: {
    en: "Armenia",
    fr: "Arménie",
  },
  Australia: {
    en: "Australia",
    fr: "Australie",
  },
  Austria: {
    en: "Austria",
    fr: "Autriche",
  },
  Azerbaijan: {
    en: "Azerbaijan",
    fr: "Azerbaïdjan",
  },
  Bahamas: {
    en: "Bahamas",
    fr: "Bahamas",
  },
  Bahrain: {
    en: "Bahrain",
    fr: "Bahreïn",
  },
  Barbados: {
    en: "Barbados",
    fr: "Barbade",
  },
  Belarus: {
    en: "Belarus",
    fr: "Biélorussie",
  },
  Bangladesh: {
    en: "Bangladesh",
    fr: "Bangladesh",
  },
  Belgium: {
    en: "Belgium",
    fr: "Belgique",
  },
  Belize: {
    en: "Belize",
    fr: "Bélize",
  },
  Benin: {
    en: "Benin",
    fr: "Bénin",
  },
  Bolivia: {
    en: "Bolivia",
    fr: "Bolivie",
  },
  Brazil: {
    en: "Brazil",
    fr: "Brésil",
  },
  Brunei: {
    en: "Brunei",
    fr: "Brunei",
  },
  Bulgaria: {
    en: "Bulgaria",
    fr: "Bulgarie",
  },
  "Burkina Faso": {
    en: "Burkina Faso",
    fr: "Burkina Faso",
  },
  "Cabo Verde": {
    en: "Cabo Verde",
    fr: "Cap-Vert",
  },
  Cambodia: {
    en: "Cambodia",
    fr: "Cambodge",
  },
  Cameroon: {
    en: "Cameroon",
    fr: "Cameroun",
  },
  Canada: {
    en: "Canada",
    fr: "Canada",
  },
  "Central African Republic (CAR)": {
    en: "Central African Republic (CAR)",
    fr: "Centrafrique",
  },
  Chad: {
    en: "Chad",
    fr: "Tchad",
  },
  Chile: {
    en: "Chile",
    fr: "Chili",
  },
  Colombia: {
    en: "Colombia",
    fr: "Colombie",
  },
  Comoros: {
    en: "Comoros",
    fr: "Comores",
  },
  "Costa Rica": {
    en: "Costa Rica",
    fr: "Costa Rica",
  },
  "Cote d'Ivoire": {
    en: "Cote d'Ivoire",
    fr: "Côte d'Ivoire",
  },
  Croatia: {
    en: "Croatia",
    fr: "Croatie",
  },
  Cuba: {
    en: "Cuba",
    fr: "Cuba",
  },
  Cyprus: {
    en: "Cyprus",
    fr: "Chypre",
  },
  Czechia: {
    en: "Czechia",
    fr: "République Tchèque",
  },
  Denmark: {
    en: "Denmark",
    fr: "Danemark",
  },
  Djibouti: {
    en: "Djibouti",
    fr: "Djibouti",
  },
  Dominica: {
    en: "Dominica",
    fr: "Dominique",
  },
  "Dominican Republic": {
    en: "Dominican Republic",
    fr: "République dominicaine",
  },
  Ecuador: {
    en: "Ecuador",
    fr: "Équateur",
  },
  Egypt: {
    en: "Egypt",
    fr: "Égypte",
  },
  "El Salvador": {
    en: "El Salvador",
    fr: "Salvador",
  },
  "Equatorial Guinea": {
    en: "Equatorial Guinea",
    fr: "Guinée équatoriale",
  },
  Estonia: {
    en: "Estonia",
    fr: "Estonie",
  },
  Fiji: {
    en: "Fiji",
    fr: "Fidji",
  },
  Finland: {
    en: "Finland",
    fr: "Finlande",
  },
  France: {
    en: "France",
    fr: "France",
  },
  Gabon: {
    en: "Gabon",
    fr: "Gabon",
  },
  Germany: {
    en: "Germany",
    fr: "Allemagne",
  },
  Ghana: {
    en: "Ghana",
    fr: "Ghana",
  },
  Greece: {
    en: "Greece",
    fr: "Grèce",
  },
  Grenada: {
    en: "Grenada",
    fr: "Grenade",
  },
  Guatemala: {
    en: "Guatemala",
    fr: "Guatémala",
  },
  Guinea: {
    en: "Guinea",
    fr: "Guinée",
  },
  "Guinea-Bissau": {
    en: "Guinea-Bissau",
    fr: "Guinée-Bissau",
  },
  Guyana: {
    en: "Guyana",
    fr: "Guyane",
  },
  Haiti: {
    en: "Haiti",
    fr: "Haïti",
  },
  Honduras: {
    en: "Honduras",
    fr: "Honduras",
  },
  Hungary: {
    en: "Hungary",
    fr: "Hongrie",
  },
  Iceland: {
    en: "Iceland",
    fr: "Islande",
  },
  India: {
    en: "India",
    fr: "Inde",
  },
  Indonesia: {
    en: "Indonesia",
    fr: "Indonésie",
  },
  Ireland: {
    en: "Ireland",
    fr: "Irlande",
  },
  Israel: {
    en: "Israel",
    fr: "Israël",
  },
  Italy: {
    en: "Italy",
    fr: "Italie",
  },
  Jamaica: {
    en: "Jamaica",
    fr: "Jamaïque",
  },
  Japan: {
    en: "Japan",
    fr: "Japon",
  },
  Jordan: {
    en: "Jordan",
    fr: "Jordanie",
  },
  Kenya: {
    en: "Kenya",
    fr: "Kenya",
  },
  Kuwait: {
    en: "Kuwait",
    fr: "Koweït",
  },
  Kyrgyzstan: {
    en: "Kyrgyzstan",
    fr: "Kirghizistan",
  },
  Lebanon: {
    en: "Lebanon",
    fr: "Liban",
  },
  Liechtenstein: {
    en: "Liechtenstein",
    fr: "Liechtenstein",
  },
  Lithuania: {
    en: "Lithuania",
    fr: "Lituanie",
  },
  Luxembourg: {
    en: "Luxembourg",
    fr: "Luxembourg",
  },
  Madagascar: {
    en: "Madagascar",
    fr: "Madagascar",
  },
  Malaysia: {
    en: "Malaysia",
    fr: "Malaisie",
  },
  Maldives: {
    en: "Maldives",
    fr: "Maldives",
  },
  Mali: {
    en: "Mali",
    fr: "Mali",
  },
  Malta: {
    en: "Malta",
    fr: "Malte",
  },
  "Marshall Islands": {
    en: "Marshall Islands",
    fr: "Îles Marshall",
  },
  Mauritania: {
    en: "Mauritania",
    fr: "Mauritanie",
  },
  Mauritius: {
    en: "Mauritius",
    fr: "Maurice",
  },
  Mexico: {
    en: "Mexico",
    fr: "Mexique",
  },
  Monaco: {
    en: "Monaco",
    fr: "Monaco",
  },
  Mongolia: {
    en: "Mongolia",
    fr: "Mongolie",
  },
  Montenegro: {
    en: "Montenegro",
    fr: "Monténégro",
  },
  Morocco: {
    en: "Morocco",
    fr: "Maroc",
  },
  Mozambique: {
    en: "Mozambique",
    fr: "Mozambique",
  },
  Namibia: {
    en: "Namibia",
    fr: "Namibie",
  },
  Netherlands: {
    en: "Netherlands",
    fr: "Pays bas",
  },
  "New Zealand": {
    en: "New Zealand",
    fr: "Nouvelle-Zélande",
  },
  Nicaragua: {
    en: "Nicaragua",
    fr: "Nicaragua",
  },
  Niger: {
    en: "Niger",
    fr: "Niger",
  },
  Nigeria: {
    en: "Nigeria",
    fr: "Nigéria",
  },
  "North Macedonia": {
    en: "North Macedonia",
    fr: "Macédoine du Nord",
  },
  Norway: {
    en: "Norway",
    fr: "Norvège",
  },
  Oman: {
    en: "Oman",
    fr: "Oman",
  },
  Pakistan: {
    en: "Pakistan",
    fr: "Pakistan",
  },
  Panama: {
    en: "Panama",
    fr: "Panama",
  },
  "Papua New Guinea": {
    en: "Papua New Guinea",
    fr: "Papouasie-Nouvelle-Guinée",
  },
  Paraguay: {
    en: "Paraguay",
    fr: "Paraguay",
  },
  Peru: {
    en: "Peru",
    fr: "Pérou",
  },
  Philippines: {
    en: "Philippines",
    fr: "Philippines",
  },
  Poland: {
    en: "Poland",
    fr: "Pologne",
  },
  Portugal: {
    en: "Portugal",
    fr: "Portugal",
  },
  Qatar: {
    en: "Qatar",
    fr: "Qatar",
  },
  Romania: {
    en: "Romania",
    fr: "Roumanie",
  },
  Russia: {
    en: "Russia",
    fr: "Russie",
  },
  "Saint Kitts and Nevis": {
    en: "Saint Kitts and Nevis",
    fr: "Saint-Christophe-et-Niévès",
  },
  "Saint Lucia": {
    en: "Saint Lucia",
    fr: "Sainte-Lucie",
  },
  "Saint Vincent and the Grenadines": {
    en: "Saint Vincent and the Grenadines",
    fr: "Saint-Vincent-et-les Grenadines",
  },
  Samoa: {
    en: "Samoa",
    fr: "Samoa",
  },
  "San Marino": {
    en: "San Marino",
    fr: "Saint-Marin",
  },
  "Sao Tome and Principe": {
    en: "Sao Tome and Principe",
    fr: "Sao Tomé-et-Principe",
  },
  "Saudi Arabia": {
    en: "Saudi Arabia",
    fr: "Arabie Saoudite",
  },
  Senegal: {
    en: "Senegal",
    fr: "Sénégal",
  },
  Serbia: {
    en: "Serbia",
    fr: "Serbie",
  },
  Seychelles: {
    en: "Seychelles",
    fr: "Seychelles",
  },
  Singapore: {
    en: "Singapore",
    fr: "Singapour",
  },
  Slovakia: {
    en: "Slovakia",
    fr: "Slovaquie",
  },
  Slovenia: {
    en: "Slovenia",
    fr: "Slovénie",
  },
  "Solomon Islands": {
    en: "Solomon Islands",
    fr: "Îles Salomon",
  },
  "South Africa": {
    en: "South Africa",
    fr: "Afrique du Sud",
  },
  "South Korea": {
    en: "South Korea",
    fr: "Corée du Sud",
  },
  Spain: {
    en: "Spain",
    fr: "Espagne",
  },
  "Sri Lanka": {
    en: "Sri Lanka",
    fr: "Sri Lanka",
  },
  Suriname: {
    en: "Suriname",
    fr: "Suriname",
  },
  Sweden: {
    en: "Sweden",
    fr: "Suède",
  },
  Switzerland: {
    en: "Switzerland",
    fr: "Suisse",
  },
  Taiwan: {
    en: "Taiwan",
    fr: "Taïwan",
  },
  Tajikistan: {
    en: "Tajikistan",
    fr: "Tadjikistan",
  },
  Tanzania: {
    en: "Tanzania",
    fr: "Tanzanie",
  },
  Thailand: {
    en: "Thailand",
    fr: "Thaïlande",
  },
  "Timor-Leste": {
    en: "Timor-Leste",
    fr: "Timor oriental",
  },
  Togo: {
    en: "Togo",
    fr: "Togo",
  },
  Tonga: {
    en: "Tonga",
    fr: "Tonga",
  },
  "Trinidad and Tobago": {
    en: "Trinidad and Tobago",
    fr: "Trinité-et-Tobago",
  },
  Tunisia: {
    en: "Tunisia",
    fr: "Tunisie",
  },
  Turkey: {
    en: "Turkey",
    fr: "Turquie",
  },
  Turkmenistan: {
    en: "Turkmenistan",
    fr: "Turkménistan",
  },
  Tuvalu: {
    en: "Tuvalu",
    fr: "Tuvalu",
  },
  Ukraine: {
    en: "Ukraine",
    fr: "Ukraine",
  },
  "United Arab Emirates (UAE)": {
    en: "United Arab Emirates (UAE)",
    fr: "Émirats arabes unis (UAE)",
  },
  "United Kingdom (UK)": {
    en: "United Kingdom (UK)",
    fr: "Royaume-Uni (UK)",
  },
  "United States of America (USA)": {
    en: "United States of America (USA)",
    fr: "États-Unis d'Amérique (USA)",
  },
  Uruguay: {
    en: "Uruguay",
    fr: "Uruguay",
  },
  Vanuatu: {
    en: "Vanuatu",
    fr: "Vanuatu",
  },
  "Vatican City (Holy See)": {
    en: "Vatican City (Holy See)",
    fr: "Cité du Vatican",
  },
  Venezuela: {
    en: "Venezuela",
    fr: "Vénézuéla",
  },
  Vietnam: {
    en: "Vietnam",
    fr: "Vietnam",
  },
};
