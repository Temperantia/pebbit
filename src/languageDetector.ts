import AsyncStorage from "@react-native-async-storage/async-storage";
import { locale } from "expo-localization";

export default function (fallback?: any) {
  return {
    type: "languageDetector",
    async: true,
    init: () => {},
    detect: async function (callback: any) {
      try {
        const language = await AsyncStorage.getItem(
          "@i18next-async-storage/user-language"
        );
        callback(language ?? locale);
      } catch (error) {}
    },
    cacheUserLanguage: async function (language: string) {},
  };
}
