import React from "react";
import { Image, TouchableOpacity } from "react-native";

const Icon = ({
  size,
  color,
  name,
  onPress,
}: {
  size: number;
  color?: string;
  name: string;
  onPress?: () => void;
}) =>
  onPress ? (
    <TouchableOpacity onPress={onPress}>
      <Image
        style={{ tintColor: color }}
        width={size}
        height={size}
        source={{ uri: "https://img.icons8.com/" + name }}
      ></Image>
    </TouchableOpacity>
  ) : (
    <Image
      style={{ tintColor: color }}
      width={size}
      height={size}
      source={{ uri: "https://img.icons8.com/" + name }}
    ></Image>
  );

export default Icon;
