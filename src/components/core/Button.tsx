import React from "react";
import { Text, TouchableOpacity } from "react-native";

import tw from "../../tailwind";

const Button = ({ title, onPress }: { title: string; onPress: () => void }) => {
  return (
    <TouchableOpacity
      style={tw("bg-red-main w-full flex-row justify-center p-5 rounded")}
      onPress={onPress}
    >
      <Text
        style={[tw("text-white text-2xl"), { fontFamily: "poppins-semibold" }]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
