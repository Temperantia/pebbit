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
        category: "Category",
        all: "All",
        location: "Location",
        currency: "Currency",
        currencies: "Currencies",
        dateListed: "Date Listed",
        completedOn: "Completed on",
        newestFirst: "Newest first",
        oldestFirst: "Oldest first",
        accordionExpand: "Expand Details",
        accordionCollapse: "Collapse Details",
        submit: "SUBMIT",
      },
      errors: {
        isRequired: "Is required",
        invalidEmail: "Invalid",
        invalidPassword:
          "Your password must contain at least 8 characters, one letter, one number and one special character",
        invalidMinimumPrice: "Price must be at least",
        wrongCredentials: "Incorrect credentials",
        wrongPassword: "Incorrect password",
        notificationToken: "Failed to get push token for push notification!",
        noCurrencySelected: "At least 1 currency",
        noPictureSelected: "At least 1 picture",
        cameraPermission: "Permission to access camera roll is required!",
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
          selling: {
            title: "SENT",
            description: "",
          },
        },
        received: {
          buying: { title: "RECEIVED", description: "" },
          messaging: { title: "RECEIVED", description: "" },
          selling: { title: "RECEIVED", description: "" },
        },
        complete: {
          buying: { title: "SOLD", description: "Sold" },
          history: { sold: "SOLD", bought: "BOUGHT" },
          messaging: { title: "SOLD", description: "Sold" },
          selling: { title: "SOLD", description: "Sold" },
        },
      },
      auth: {
        password: "Password",
        signInWith: "Sign in with",
        title: "Sign in or Create an Account",
        description:
          "Otherwise, enter your email and password to sign in or create an account",
        disclaimer:
          "By signing up, you agree to our terms of service and privacy policy",
        signIn: "Sign In",
        signOut: "Sign Out",
        signInRequest: "Please sign in to purchase this item",
      },
      navigation: {
        home: "Home",
        myProfile: "My Profile",
        accountSettings: "Account Settings",
        backToResults: "Back to Results",
      },
      shipping: {
        service: "Shipping service:",
        trackingNumber: "Tracking number:",
      },
      adBuying: {
        priceSelection1: "Price ",
        priceSelection2: "(select one)",
        buy: "BUY IT NOW",
        timeExpired: "Time Expired",
        send1: "Please send ",
        sendBold: "exactly ",
        send2: " to the address listed below:",
        sendDisclaimer:
          "This cannot be refunded, please ensure the amount is correct.",
        paymentReceived: "Payment received, thank you for your purchase",
        pendingPayment: "Payment pending, awaiting block confirmation",
        pendingWait: "Please Wait...",
        processTime:
          "Please allow up to 10 minutes for payment to be processed",
        waitingSeller: "Waiting for Seller...",
        sentIndication: "Seller has indicated item was shipped",
        sentConfirmation: "Confirm Transaction Success",
        sentGuarantee:
          "If no action is taken within 14 days funds will be released automatically",
        receivedConfirmation: "Thank you for confirming",
        receivedTransaction: "Transaction Complete",
        ratingRequest: "Please rate your experience with this seller",
        ratingConfirmation: "Thank you for rating",
      },
      adCreation: {
        askingPrice: "Asking Price",
        addAddress1: "Add your ",
        addAddress2: " wallet address below.",
      },
    },
  },
});

export default i18n;
