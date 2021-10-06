import React from "react";
import { Image } from "react-native";

const Icon = ({
  size,
  color,
  name,
}: {
  size: number;
  color?: string;
  name: string;
}) => (
  <Image
    style={{ tintColor: color }}
    width={size}
    height={size}
    source={{ uri: "https://img.icons8.com/" + name }}
  ></Image>
);

export default Icon;
