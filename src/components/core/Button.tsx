import React from "react";
import { Text, TouchableOpacity } from "react-native";

import tw from "../../tailwind";

const Button = ({
  black,
  title,
  onPress,
}: {
  black?: boolean;
  title: string;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      style={tw(
        "w-full flex-row justify-center rounded" +
          (black ? " bg-black-background-2 py-3" : " bg-red-main py-5")
      )}
      onPress={onPress}
    >
      <Text
        style={[
          tw(black ? "text-red-main" : "text-white text-2xl"),
          { fontFamily: "poppins-semibold" },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
