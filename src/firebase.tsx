import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

import credentials from "./firebase-credentials.json";
import { Ad, User, Order } from "./types";

if (firebase.apps.length === 0) {
  firebase.initializeApp(credentials);
}

const converter = <T,>() => ({
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
export default firebase;
