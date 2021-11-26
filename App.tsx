import React, { useEffect } from "react";
import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import * as Notifications from "expo-notifications";
import { RecoilRoot } from "recoil";
import { I18nextProvider } from "react-i18next";

import useCachedResources from "./src/hooks/useCachedResources";
import Navigation from "./src/navigation";
import { AuthProvider } from "./src/hooks/useAuth";
import i18n from "./src/i18n";

const App = () => {
  const isLoadingComplete = useCachedResources();

  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });

    Notifications.addNotificationReceivedListener((notification) => {
      console.log(notification);
    });

    // todo route the user to the proper destination
    Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response);
    });
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <RecoilRoot>
        <I18nextProvider i18n={i18n}>
          <AuthProvider>
            <Navigation />
            <StatusBar style="light" />
          </AuthProvider>
        </I18nextProvider>
      </RecoilRoot>
    );
  }
};

export default App;
