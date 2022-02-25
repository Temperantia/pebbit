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
    appEnv: "dev",
    functionsEndpoint: "https://us-central1-pebbit-test.cloudfunctions.net/",
    firebaseConfig:
      '{"apiKey": "AIzaSyDlSg1y7gCtonpo6dHjkZJWNsrDp5_EBUM","authDomain": "pebbit-test.firebaseapp.com","projectId": "pebbit-test","storageBucket": "pebbit-test.appspot.com","messagingSenderId": "156877205943","appId": "1:156877205943:web:5d21f5cf9b5f79bbcef832","measurementId": "G-3JDHFTBFYV"}',
  },
};
export default config;
