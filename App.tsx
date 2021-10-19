import React, { useEffect } from "react";
import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import * as Notifications from "expo-notifications";
import { RecoilRoot } from "recoil";

import useCachedResources from "./src/hooks/useCachedResources";
import Navigation from "./src/navigation";
import { AuthProvider } from "./src/hooks/useAuth";

export default function App() {
  const isLoadingComplete = useCachedResources();

  /* useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });

    Notifications.addNotificationReceivedListener((notification) => {
      console.log(notification);
    });

    Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response);
    });
  }, []); */

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <RecoilRoot>
        <AuthProvider>
          <Navigation />
          <StatusBar style="light" />
        </AuthProvider>
      </RecoilRoot>
    );
  }
}
