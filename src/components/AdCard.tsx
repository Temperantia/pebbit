import React, { useMemo, useState } from "react";
import { Image, Text, View } from "react-native";

import { currencies } from "../constants";
import tw from "../tailwind";
import { Ad, Price } from "../types";

const AdCard = ({
  data: {
    pictures,
    prices,
    title,
    description,
    currencies: selectedCurrencies,
  },
}: {
  data: {
    title: string;
    description: string;
    pictures: (string | null)[];
    prices: { [currency: string]: Price };
    currencies: string[];
  };
}) => {
  const picture = pictures?.find((picture) => !!picture);
  const currency = selectedCurrencies[0];
  const price = prices[currency + "-amount"];
  return (
    <View style={tw("flex-row p-2 border border-grey-slate rounded")}>
      <View style={tw("w-1/3 mr-4")}>
        {picture && (
          <Image
            style={tw("w-full h-16 mb-2")}
            resizeMode="cover"
            source={{ uri: picture }}
          ></Image>
        )}
        {currency && (
          <View style={tw("flex-row justify-between items-center")}>
            <Image
              style={tw("w-8 h-8")}
              source={currencies[currency].image}
            ></Image>
            <Text style={{ fontFamily: "poppins-semibold" }}>
              {price} {currencies[currency].symbol}
            </Text>
          </View>
        )}
      </View>
      <View style={tw("w-2/3")}>
        {!!title && (
          <View>
            <Text style={{ fontFamily: "poppins-semibold" }}>{title}</Text>
          </View>
        )}
        {!!description && <Text style={tw("text-xs")}>{description}</Text>}
      </View>
    </View>
  );
};

export default AdCard;
