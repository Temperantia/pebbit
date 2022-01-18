import { Dimensions, Platform } from "react-native";

const width = Dimensions.get("window").width;
export const height = Dimensions.get("window").height;
export const keyboardVerticalOffset = 100;

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
};
