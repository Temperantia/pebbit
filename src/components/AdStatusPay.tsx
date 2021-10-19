import React, { useCallback, useEffect, useState } from "react";
import { Clipboard, Image, Text, View } from "react-native";

import tw from "../tailwind";
import Icon from "../components/core/Icon";
import { currencies } from "../constants";
import tailwindConfig from "../../tailwind.config";
import { Ad } from "../types";

const AdStatusPay = ({ ad }: { ad: Ad }) => {
  const [timeLeft, setTimeLeft] = useState<string | null>(null);
  let interval: NodeJS.Timer;

  useEffect(() => {
    clearInterval(interval);
    interval = setInterval(() => {
      const now = Date.now() / 1000;
      const distance = ad.cooldown - now;
      const minutes = Math.floor((distance % (60 * 60)) / 60);
      const seconds = Math.floor(distance % 60);
      setTimeLeft(minutes + ":" + seconds);
      if (distance < 0) {
        clearInterval(interval);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [ad]);

  const onCopy = useCallback(() => {
    Clipboard.setString(ad.buyer.inputAddress);
  }, [ad, Clipboard]);

  return (
    <View style={tw("my-2")}>
      <Text>
        Please send{" "}
        <Text style={{ fontFamily: "poppins-semibold" }}>exactly</Text>
        <Image
          style={tw("w-6 h-6")}
          source={currencies[ad.buyer.currency].image}
        ></Image>
        <Text style={[{ fontFamily: "poppins-semibold" }]}>
          {ad.prices[ad.buyer.currency].amount}{" "}
          {currencies[ad.buyer.currency].symbol}
        </Text>{" "}
        to the address listed below:
      </Text>
      <View
        style={tw(
          "flex-row justify-between items-center my-2 p-2 border border-black rounded bg-purple-main"
        )}
      >
        <Text>{ad.buyer.inputAddress}</Text>
        <Icon
          size={20}
          color={tailwindConfig.theme.colors["red-main"]}
          name="small/32/000000/copy.png"
          onPress={onCopy}
        ></Icon>
      </View>
      <View style={tw("items-center")}>
        <Text style={tw("text-xs")}>
          This cannot be refunded, please ensure the amount is correct.
        </Text>
      </View>
      <View style={tw("flex-row items-center justify-end")}>
        <Icon
          size={16}
          color={tailwindConfig.theme.colors["red-main"]}
          name="small/16/000000/clock.png"
        ></Icon>
        <Text style={tw("ml-1")}>{timeLeft}</Text>
      </View>
    </View>
  );
};

export default AdStatusPay;
