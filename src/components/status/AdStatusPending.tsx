import React from "react";
import { Text, View } from "react-native";

import tw from "../../tailwind";
import Icon from "../core/Icon";
import tailwindConfig from "../../../tailwind.config";

const AdStatusPending = () => {
  return (
    <View style={tw("my-2")}>
      <Text>Payment pending, awaiting block confirmation</Text>
      <View style={tw("items-center mt-3 mb-1")}>
        <Icon
          size={64}
          color={tailwindConfig.theme.colors["red-main"]}
          name="small/64/000000/wait.png"
        />
      </View>
      <Text style={tw("text-lg text-center mb-1")}>Please Wait...</Text>
      <Text style={tw("text-xs text-center text-grey-slate")}>
        Please allow up to 10 minutes for payment to be processed
      </Text>
    </View>
  );
};

export default AdStatusPending;
