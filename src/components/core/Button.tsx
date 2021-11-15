import React from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

import tailwindConfig from "../../../tailwind.config";
import tw from "../../tailwind";

const Button = ({
  black,
  color,
  save,
  loading,
  title,
  onPress,
}: {
  black?: boolean;
  color?: string;
  save?: boolean;
  loading?: boolean;
  title: string;
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
            : " bg-red-main py-5")
      )}
      onPress={onPress}
    >
      <Text
        style={[
          tw(
            !!color
              ? color
              : save
              ? "text-white"
              : black
              ? "text-red-main"
              : "text-white text-2xl"
          ),
          { fontFamily: "poppins-semibold" },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
