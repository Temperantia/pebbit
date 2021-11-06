import React from "react";
import { View, Image, Text } from "react-native";

import tw from "../tailwind";

const StatusBanner = ({
  picture,
  color,
  text,
}: {
  picture: string;
  color: string;
  text: string;
}) => (
  <View style={tw("w-1/4 relative")}>
    <Image
      style={tw("h-full")}
      source={{
        uri: picture,
      }}
    />
    <View style={tw("absolute h-full w-1/3" + (color ? " bg-" + color : ""))}>
      <View style={tw("justify-center h-full")} />
    </View>
    <View
      style={[
        tw("absolute w-full h-full items-center"),
        {
          transform: [{ rotate: "270deg" }],
        },
      ]}
    >
      <Text
        style={[
          tw("text-white"),

          {
            fontFamily: "poppins-medium",
          },
        ]}
      >
        {text.toUpperCase()}
      </Text>
    </View>
  </View>
);

export default StatusBanner;
