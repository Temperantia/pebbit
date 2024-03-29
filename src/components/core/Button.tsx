import React from "react";
import { ActivityIndicator, Image, Text, TouchableOpacity } from "react-native";

import tailwindConfig from "../../../tailwind.config";
import tw from "../../tailwind";

const Button = ({
  coinbase,
  black,
  color,
  save,
  onboarding,
  loading,
  title,
  onPress,
}: {
  coinbase?: boolean;
  black?: boolean;
  color?: string;
  save?: boolean;
  onboarding?: boolean;
  loading?: boolean;
  title?: string;
  onPress: () => void;
}) => {
  return loading ? (
    <ActivityIndicator color={tailwindConfig.theme.colors["red-main"]} />
  ) : (
    <TouchableOpacity
      style={tw(
        "w-full flex-row justify-center rounded" +
          (color
            ? ""
            : save || black
            ? " bg-black-background-2 py-3"
            : onboarding
            ? " w-32 bg-red-main py-2"
            : " bg-red-main py-5")
      )}
      onPress={onPress}
    >
      {coinbase ? (
        <Image
          style={tw("w-20 h-6")}
          source={require("../../assets/images/coinbase.png")}
        />
      ) : (
        <Text
          style={[
            tw(
              !!color
                ? color
                : save
                ? "text-white"
                : black
                ? "text-red-main"
                : onboarding
                ? "text-white"
                : "text-white text-2xl"
            ),
            { fontFamily: "poppins-semibold" },
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
