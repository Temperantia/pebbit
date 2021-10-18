import React, { useCallback, useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { auth } from "../firebase";

import tw from "../tailwind";
import Button from "../components/core/Button";
import { currencies } from "../constants";
import { Ad } from "../types";
import useAuth from "../hooks/useAuth";

const AdStatusBuy = ({ ad }: { ad: Ad }) => {
  const { token } = useAuth();
  const [selectedCurrency, setSelectedCurrency] = useState(null);

  useEffect(() => {
    if (!ad) {
      return;
    }

    setSelectedCurrency(Object.entries(ad.prices)[0][0]);
  }, [ad]);

  const onSelectCurrency = useCallback(
    (currency) => () => {
      setSelectedCurrency(currency);
    },
    [setSelectedCurrency]
  );

  const onBuy = useCallback(async () => {
    const t = await auth.currentUser.getIdToken(true);
    const url =
      "https://us-central1-crypto-2293c.cloudfunctions.net/buy?id=" +
      ad.id +
      "&currency=" +
      selectedCurrency +
      "&token=" +
      token;
    console.log(url);
    try {
      const result = await fetch(url, {
        headers: {
          Authorization: `Bearer ${t}`,
        },
      });
      if (result.status === 409) {
        throw Error("Under transaction");
      } else if (!result.ok) {
        throw Error("Something wrong happened");
      }
      /* const order = await result.json();
        console.log(order.id, "pay the amount in btc at", order.inputAddress); */
    } catch (error) {
      alert(error.message);
    }
  }, [auth, fetch, token, alert, selectedCurrency]);

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
                style={tw("w-full")}
                width={24}
                height={24}
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
      <Button black title="BUY IT NOW" onPress={onBuy}></Button>
    </>
  );
};

export default AdStatusBuy;
