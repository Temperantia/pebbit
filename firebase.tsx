import firebase from "firebase/app";
import "firebase/firestore";

import credentials from "./firebase-credentials.json";
import { CreateProduct } from "./types";

if (firebase.apps.length === 0) {
  firebase.initializeApp(credentials);
}

const converter = <T,>() => ({
  toFirestore: (data: T) => data,
  fromFirestore: (snap: firebase.firestore.QueryDocumentSnapshot) =>
    snap.data() as T,
});

export const firestore = firebase.firestore();
export const productCollection = firestore
  .collection("products")
  .withConverter(converter<CreateProduct>());
