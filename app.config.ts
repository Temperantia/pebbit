import { ExpoConfig } from "@expo/config-types";
const config: ExpoConfig = {
  name: "Pebbit",
  slug: "pebbit",
  version: "0.9.39",
  android: {
    versionCode: 41,
    package: "com.magna_numeris.pebbit",
    googleServicesFile: "./google-services.json",
  },
  ios: {
    bundleIdentifier: "com.magnanumeris.pebbit",
    supportsTablet: true,
    usesAppleSignIn: true,
    infoPlist: {
      NSCameraUsageDescription:
        "This app needs to access your pictures or camera to publish your item on the application. The pictures will be displayed on the listing of the application and on the sales section.",
    },
  },
  orientation: "portrait",
  icon: "./src/assets/images/appIcon.png",
  scheme: "pebbit",
  owner: "magna-numeris",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./src/assets/images/splash.png",
    resizeMode: "cover",
    backgroundColor: "#ffffff",
  },
  updates: { fallbackToCacheTimeout: 0 },
  assetBundlePatterns: ["**/*"],
  plugins: [
    [
      "expo-image-picker",
      {
        photosPermission:
          "This app needs to access your pictures to publish your item on the application. The pictures will be displayed on the listing of the application and on the sales section.",
      },
    ],
    [
      "expo-notifications",
      {
        icon: "./src/assets/images/appIcon.png",
        color: "#ffffff",
        sounds: ["./src/assets/sounds/rock-debris-spill-SBA-300114527.wav"],
      },
    ],
  ],
  extra: {
    appEnv: "prod",
    functionsEndpoint: "https://us-central1-crypto-2293c.cloudfunctions.net/",
    firebaseConfig:
      '{"apiKey": "AIzaSyCwTK8s0P6tUqEevJ61Ycut12lrtTJ18Og","authDomain": "crypto-2293c.firebaseapp.com","projectId": "crypto-2293c","storageBucket": "crypto-2293c.appspot.com","messagingSenderId": "876715407348","appId": "1:876715407348:web:3aec09ff57df5a54f52ba1","measurementId": "G-FC15NDED83"}',
  },
};
export default config;
