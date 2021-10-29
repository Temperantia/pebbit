import React from "react";
import { Image, Text, View } from "react-native";

import tw from "../tailwind";
import { currencies } from "../constants";
import { Ad } from "../types";
import Icon from "../components/core/Icon";
import tailwindConfig from "../../tailwind.config";

const AdStatusReceived = ({ ad, amount }: { ad: Ad; amount?: boolean }) => {
  return (
    <View style={tw("my-2")}>
      <Text>Thank you for confirming</Text>
      {amount && (
        <View style={tw("my-2 flex-row items-center")}>
          <Image
            style={tw("w-8 h-8 mr-2")}
            source={currencies[ad.buyer.currency].image}
          ></Image>
          <Text style={[tw("text-lg"), { fontFamily: "poppins-semibold" }]}>
            {ad.prices[ad.buyer.currency].amount}{" "}
            {currencies[ad.buyer.currency].symbol}
          </Text>
        </View>
      )}
      <View
        style={tw(
          "flex-row justify-center rounded border border-grey-slate py-2"
        )}
      >
        <Icon
          size={32}
          color={tailwindConfig.theme.colors["green-main"]}
          name="small/32/000000/ok.png"
        ></Icon>
        <Text style={tw("ml-3 text-grey-slate text-lg")}>
          Transaction Complete
        </Text>
      </View>
    </View>
  );
};

export default AdStatusReceived;
