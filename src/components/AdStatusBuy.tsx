import React, { useCallback, useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { request } from "../firebase";
import tw from "../tailwind";
import Button from "../components/core/Button";
import { currencies } from "../constants";
import { Ad } from "../types";
import useAuth from "../hooks/useAuth";

const AdStatusBuy = ({ ad }: { ad: Ad }) => {
  const { token } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);

  useEffect(() => {
    if (!ad) {
      return;
    }

    setSelectedCurrency(Object.entries(ad.prices)[0][0]);
  }, [ad, setSelectedCurrency]);

  const onSelectCurrency = useCallback(
    (currency) => () => {
      setSelectedCurrency(currency);
    },
    [setSelectedCurrency]
  );

  const onBuy = useCallback(async () => {
    setLoading(true);
    await request(
      "buy?id=" + ad.id + "&currency=" + selectedCurrency + "&token=" + token
    );
    setLoading(false);
  }, [setLoading, ad, request, token, selectedCurrency]);

  return (
    <>
      <View style={tw("my-2")}>
        <Text style={[tw("my-3"), { fontFamily: "poppins-medium" }]}>
          Price <Text style={tw("text-grey-slate text-xs")}>(select one)</Text>
        </Text>
        <View style={tw("flex-row")}>
          {Object.entries(ad.prices).map(([currency, price]) => (
            <TouchableOpacity
              key={currency}
              style={tw(
                "flex-row justify-between rounded mx-1 w-1/3 border border-grey-slate py-1 px-2 items-center" +
                  (currency === selectedCurrency ? " bg-purple-main" : "")
              )}
              onPress={onSelectCurrency(currency)}
            >
              <Image
                style={tw("w-8 h-8")}
                source={currencies[currency].image}
              ></Image>
              <Text
                style={[
                  tw(currency === selectedCurrency ? "" : "text-grey-slate"),
                  { fontFamily: "poppins-semibold" },
                ]}
              >
                {price.amount} {currencies[currency].symbol}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <Button
        black
        title="BUY IT NOW"
        loading={loading}
        onPress={onBuy}
      ></Button>
    </>
  );
};

export default AdStatusBuy;
