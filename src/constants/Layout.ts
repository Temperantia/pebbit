import { Dimensions, Platform } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
export const keyboardVerticalOffset = Platform.OS === "ios" ? 100 : 0;

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
};
