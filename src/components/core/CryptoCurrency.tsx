import React from "react";
import { Image, Text, View } from "react-native";

import { currencies } from "../../constants";
import tw from "../../tailwind";
import { ellipsis } from "../../utils/string";

export enum Delta {
  Positive,
  Negative,
}

const CryptoCurrency = ({
  currency,
  text,
  raw,
  delta,
  textColor,
}: {
  currency: string;
  text: string;
  raw?: boolean;
  delta?: Delta;
  textColor?: string;
}) => (
  <View style={tw("flex-row items-center")}>
    {currency !== "All" && (
      <Image style={tw("w-6 h-6 mr-2")} source={currencies[currency].image} />
    )}
    <Text
      style={[
        tw("text-xs"),
        delta !== undefined || textColor
          ? tw(
              (delta === Delta.Positive
                ? "text-green-main"
                : delta === Delta.Negative
                ? "text-red-main"
                : "") +
                " " +
                (textColor ?? "")
            )
          : undefined,
        { fontFamily: "poppins-semibold" },
      ]}
    >
      {(delta === Delta.Positive ? "+" : delta === Delta.Negative ? "-" : "") +
        (raw ? text : ellipsis(text, 8) + " " + currencies[currency].symbol)}
    </Text>
    {currency === "Binance Coin" && raw && (
      <Text
        style={[
          tw("text-xs text-red-main"),
          { fontFamily: "poppins-semibold" },
        ]}
      >
        {" Binance Smart Chain"}
      </Text>
    )}
  </View>
);

export default CryptoCurrency;
