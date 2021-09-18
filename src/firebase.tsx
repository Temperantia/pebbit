import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import credentials from "./firebase-credentials.json";
import { CreateProduct, Order } from "./types";

if (firebase.apps.length === 0) {
  firebase.initializeApp(credentials);
}

const converter = <T,>() => ({
  toFirestore: (data: T) => data,
  fromFirestore: (snap: firebase.firestore.QueryDocumentSnapshot) =>
    snap.data() as T,
});

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const productCollection = firestore
  .collection("products")
  .withConverter(converter<CreateProduct>());
export const orderCollection = firestore
  .collection("orders")
  .withConverter(converter<Order>());
export default firebase;
