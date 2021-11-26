import React, { useCallback } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/core";

import { Ad } from "../../types";
import tw from "../../tailwind";
import CryptoCurrency from "../core/CryptoCurrency";

const AdPreview = ({ ad }: { ad: Ad }) => {
  const picture = ad.pictures.find((picture) => !!picture);
  const [currency, price] = Object.entries(ad.prices)[0];
  const { navigate } = useNavigation();

  const onPress = useCallback(() => {
    navigate("AdScreen", { id: ad.id });
  }, [navigate, ad]);

  return (
    <View style={tw("w-1/2 p-3")}>
      <TouchableOpacity
        style={tw("border border-grey-slate rounded")}
        onPress={onPress}
      >
        <View style={tw("relative")}>
          <Image
            style={tw("w-full h-32")}
            source={{
              uri: picture,
            }}
          />
          <View
            style={tw("absolute left-0 p-2 bg-black-background-1 bottom-5")}
          >
            <CryptoCurrency
              currency={currency}
              text={price?.amount?.toString()}
              textColor="text-white"
            />
          </View>
        </View>
        <View style={tw("p-2")}>
          <Text>{ad.title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default AdPreview;
