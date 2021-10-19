import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useState, useEffect } from "react";
import { setCustomText } from "react-native-global-props";

const useCachedResources = () => {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    const loadResourcesAndDataAsync = async () => {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          poppins: require("../assets/fonts/Poppins-Regular.ttf"),
          "poppins-medium": require("../assets/fonts/Poppins-Medium.ttf"),
          "poppins-semibold": require("../assets/fonts/Poppins-SemiBold.ttf"),
          "poppins-bold": require("../assets/fonts/Poppins-Bold.ttf"),
          "poppins-black": require("../assets/fonts/Poppins-Black.ttf"),
        });
        setCustomText({ style: { fontFamily: "poppins" } });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    };

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
};

export default useCachedResources;
