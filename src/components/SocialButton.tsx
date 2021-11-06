import React, { useCallback } from "react";
import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import useAuth from "../hooks/useAuth";

import tw from "../tailwind";

const SocialButton = ({ type }: { type: string }) => {
  const { signInWithGoogle } = useAuth();

  const types: {
    [provider: string]: {
      icon: ImageSourcePropType;
      bgColor: string;
      color: string;
      handler: () => Promise<void>;
    };
  } = {
    Google: {
      icon: require("../assets/images/google.png"),
      bgColor: "bg-white border border-grey-slate",
      color: "text-grey-slate",
      handler: signInWithGoogle,
    },
  };
  const { icon, bgColor, color, handler } = types[type];
  const onPress = useCallback(() => {
    handler();
  }, [handler]);
  return (
    <TouchableOpacity
      style={tw("w-full flex-row items-center p-2 rounded " + bgColor)}
      onPress={onPress}
    >
      <View style={tw("pl-2 pr-6")}>
        <Image width={16} height={16} style={tw("w-8 h-8")} source={icon} />
      </View>
      <Text
        style={[tw("text-lg " + color), { fontFamily: "poppins-semibold" }]}
      >
        {"Sign in with " + type}
      </Text>
    </TouchableOpacity>
  );
};

export default SocialButton;
