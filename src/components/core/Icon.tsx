import React from "react";
import { Image, TouchableOpacity } from "react-native";

import tw from "../../tailwind";

const Icon = ({
  size,
  style,
  color,
  name,
  onPress,
}: {
  size: number;
  style?: string;
  color?: string;
  name: string;
  onPress?: () => void;
}) =>
  onPress ? (
    <TouchableOpacity
      style={tw("flex-row items-center " + (style ?? ""))}
      onPress={onPress}
    >
      <Image
        style={{ tintColor: color }}
        width={size}
        height={size}
        source={{ uri: "https://img.icons8.com/" + name }}
      />
    </TouchableOpacity>
  ) : (
    <Image
      style={[tw(style ?? ""), { tintColor: color }]}
      width={size}
      height={size}
      source={{ uri: "https://img.icons8.com/" + name }}
    />
  );

export default Icon;
