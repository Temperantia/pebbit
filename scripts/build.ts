import "dotenv/config";
import { writeFileSync } from "fs";
import config from "../app.config";

const version = config.version;
const versionCode = config.android?.versionCode;

const newConfig = config;

const versionSplit = version?.split(".") ?? "1.0.0";
newConfig.version =
  versionSplit[0] +
  "." +
  versionSplit[1] +
  "." +
  (parseInt(versionSplit[2]) + 1);
newConfig.android = {
  ...newConfig.android,
  versionCode: (versionCode ?? 0) + 1,
};

newConfig.extra = {
  appEnv: process.env.APP_ENV,
  functionsEndpoint:
    process.env.APP_ENV === "prod"
      ? "https://us-central1-crypto-2293c.cloudfunctions.net/"
      : "https://us-central1-pebbit-test.cloudfunctions.net/",
  firebaseConfig:
    process.env.APP_ENV === "prod"
      ? '{"apiKey": "AIzaSyCwTK8s0P6tUqEevJ61Ycut12lrtTJ18Og","authDomain": "crypto-2293c.firebaseapp.com","projectId": "crypto-2293c","storageBucket": "crypto-2293c.appspot.com","messagingSenderId": "876715407348","appId": "1:876715407348:web:3aec09ff57df5a54f52ba1","measurementId": "G-FC15NDED83"}'
      : '{"apiKey": "AIzaSyDlSg1y7gCtonpo6dHjkZJWNsrDp5_EBUM","authDomain": "pebbit-test.firebaseapp.com","projectId": "pebbit-test","storageBucket": "pebbit-test.appspot.com","messagingSenderId": "156877205943","appId": "1:156877205943:web:5d21f5cf9b5f79bbcef832","measurementId": "G-3JDHFTBFYV"}',
};

writeFileSync(
  "app.config.ts",
  'import { ExpoConfig } from "@expo/config-types"; const config: ExpoConfig = ' +
    JSON.stringify(newConfig) +
    "; export default config;"
);
