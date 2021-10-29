import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import tw from "../tailwind";
import { currencies } from "../constants";
import { Ad } from "../types";
import Icon from "../components/core/Icon";
import tailwindConfig from "../../tailwind.config";
import { request } from "../firebase";

const AdStatusSent = ({ ad, amount }: { ad: Ad; amount?: boolean }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const onConfirm = useCallback(async () => {
    setLoading(true);
    await request("receive?ad=" + ad.id);
    setLoading(false);
  }, [setLoading, request, ad]);

  return (
    <View style={tw("my-2")}>
      <Text>Seller has indicated item was shipped</Text>
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
      {loading ? (
        <ActivityIndicator color={tailwindConfig.theme.colors["red-main"]} />
      ) : (
        <TouchableOpacity
          style={tw(
            "flex-row justify-center rounded bg-black-background-2 py-2"
          )}
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
      )}
      <Text style={tw("text-xs my-2")}>
        If no action is taken within 14 days funds will be released
        automatically
      </Text>
    </View>
  );
};

export default AdStatusSent;
