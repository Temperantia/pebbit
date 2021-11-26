import React, { PropsWithChildren } from "react";
import { ActivityIndicator, Alert } from "react-native";
import firebase from "firebase";

import tailwindConfig from "../../../tailwind.config";

const ScreenLoading = ({
  loading,
  error,
  children,
}: PropsWithChildren<{
  loading: boolean;
  error?: firebase.FirebaseError;
}>): JSX.Element => {
  if (loading) {
    return (
      <ActivityIndicator color={tailwindConfig.theme.colors["red-main"]} />
    );
  }
  if (error) {
    console.error(error);
    Alert.alert("Error", error.message);
  }
  return <>{children}</>;
};

export default ScreenLoading;
