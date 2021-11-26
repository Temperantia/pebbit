import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

i18n.use(initReactI18next).init({
  lng: Localization.locale,
  fallbackLng: "en",
  nonExplicitSupportedLngs: true,
  defaultNS: "common",
  resources: {
    en: {
      common: {
        ads: "ads",
        completedOn: "Completed on",
        accordionExpand: "Expand Details",
        accordionCollapse: "Collapse Details",
      },
      errors: {
        isRequired: "Is required",
        invalidEmail: "Invalid",
        invalidPassword:
          "Your password must contain at least 8 characters, one letter, one number and one special character",
        invalidMinimumPrice: "Price must be at least",
        noCurrencySelected: "At least 1 currency",
      },
      statuses: {
        new: {
          buying: {
            title: "",
            description: "Listed",
          },
          messaging: {
            title: "",
            description: "Listed",
          },
          selling: {
            title: "",
            description: "Listed",
          },
        },
        paid: {
          buying: { title: "PAID", description: "Waiting for seller..." },
          messaging: {
            title: "PAID",
            description: "Waiting for seller...",
          },
          selling: {
            title: "PAID",
            description: "Waiting for seller...",
          },
        },
        sent: {
          buying: { title: "SENT", description: "" },
          messaging: {
            title: "SENT",
            description: "Waiting for buyer...",
          },
        },
        received: {
          buying: { title: "RECEIVED", description: "" },
          messaging: { title: "RECEIVED", description: "" },
        },
        complete: {
          buying: { title: "SOLD", description: "Sold" },
          history: { sold: "SOLD", bought: "BOUGHT" },
          messaging: { title: "SOLD", description: "Sold" },
        },
      },
      auth: {
        signInWith: "Sign in with",
        signOut: "Sign Out",
      },
      navigation: {
        home: "Home",
        myProfile: "My Profile",
        accountSettings: "Account Settings",
      },
    },
  },
});

export default i18n;
