import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

import credentials from "./firebase-credentials.json";
import testCredentials from "./firebase-credentials-test.json";
import { Ad, User, Order } from "./types";

if (firebase.apps.length === 0) {
  firebase.initializeApp(
    process.env.NODE_ENV === "production" ? credentials : testCredentials
  );
}

const functionsEndpoint =
  "https://us-central1-crypto-2293c.cloudfunctions.net/";

const converter = <T>() => ({
  toFirestore: (data: T) => data,
  fromFirestore: (snap: firebase.firestore.QueryDocumentSnapshot) =>
    snap.data() as T,
});

export const auth = firebase.auth();
export const storage = firebase.storage();
export const firestore = firebase.firestore();
export const FieldValue = firebase.firestore.FieldValue;
export const serverTimestamp = FieldValue.serverTimestamp;
export const adCollection = firestore
  .collection("ads")
  .withConverter(converter<Ad>());
export const orderCollection = firestore
  .collection("orders")
  .withConverter(converter<Order>());
export const userCollection = firestore
  .collection("users")
  .withConverter(converter<User>());

export const request = async (endpoint: string, body?: any) => {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    return;
  }
  const token = await currentUser.getIdToken(true);
  const url = functionsEndpoint + endpoint;
  const result = await fetch(url, {
    method: body ? "POST" : "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  if (!result.ok) {
    throw Error("Something wrong happened");
  }
};

export default firebase;
