import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";

import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <>
        <Navigation />
        <StatusBar />
      </>
    );
  }
}
