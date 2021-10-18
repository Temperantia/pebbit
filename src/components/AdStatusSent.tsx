import React, { useCallback } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import tw from "../tailwind";
import { currencies } from "../constants";
import { Ad } from "../types";
import Icon from "../components/core/Icon";
import tailwindConfig from "../../tailwind.config";
import { auth } from "../firebase";

const AdStatusSent = ({ ad }: { ad: Ad }) => {
  const onConfirm = useCallback(async () => {
    const t = await auth.currentUser.getIdToken(true);

    try {
      const result = await fetch(
        "https://us-central1-crypto-2293c.cloudfunctions.net/confirm?ad=" +
          ad.id,
        {
          headers: {
            Authorization: `Bearer ${t}`,
          },
        }
      );
      if (!result.ok) {
        throw Error("Something wrong happened");
      }
    } catch (error) {
      alert(error.message);
    }
  }, [auth, fetch, alert]);

  return (
    <View style={tw("my-2")}>
      <Text>Seller has indicated item was shipped</Text>
      <View style={tw("my-2 flex-row items-center")}>
        <Image
          style={tw("w-full mr-2")}
          width={24}
          height={24}
          source={currencies[ad.buyer.currency].image}
        ></Image>
        <Text style={[tw("text-lg"), { fontFamily: "poppins-semibold" }]}>
          {ad.prices[ad.buyer.currency].amount}{" "}
          {currencies[ad.buyer.currency].symbol}
        </Text>
      </View>
      <TouchableOpacity
        style={tw("flex-row justify-center rounded bg-black-background-2 py-2")}
        onPress={onConfirm}
      >
        <Icon
          size={32}
          color={tailwindConfig.theme.colors["gold-badge-gradient"]}
          name="small/32/000000/ok.png"
        ></Icon>
        <Text
          style={[
            tw("ml-3 text-white text-lg"),
            { fontFamily: "poppins-medium" },
          ]}
        >
          Confirm Transaction Success
        </Text>
      </TouchableOpacity>
      <Text style={tw("text-xs my-2")}>
        If no action is taken within 14 days funds will be released
        automatically
      </Text>
    </View>
  );
};

export default AdStatusSent;
