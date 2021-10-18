import React, { PropsWithChildren } from "react";
import { ActivityIndicator, Alert } from "react-native";
import firebase from "firebase";

const ScreenLoading = ({
  loading,
  error,
  children,
}: PropsWithChildren<{
  loading: boolean;
  error?: firebase.FirebaseError;
}>): JSX.Element => {
  if (loading) {
    return <ActivityIndicator></ActivityIndicator>;
  }
  if (error) {
    console.error(error);
    Alert.alert("Error", error.message);
  }
  return <>{children}</>;
};

export default ScreenLoading;
