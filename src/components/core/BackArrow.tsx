import React, { useCallback } from "react";
import { Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/core";

import tw from "../../tailwind";
import Icon from "./Icon";

const BackArrow = ({ label }: { label: string }) => {
  const { goBack } = useNavigation();
  const onBack = useCallback(() => {
    goBack();
  }, [goBack]);

  return (
    <TouchableOpacity
      style={[tw("my-2 flex-row items-center mx-1")]}
      onPress={onBack}
    >
      <Icon size={16} name="small/16/000000/back.png" />
      <Text
        style={[tw("ml-2 text-red-main"), { fontFamily: "poppins-medium" }]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default BackArrow;
