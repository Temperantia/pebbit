import React, { useCallback, useEffect, useState } from "react";
import { Clipboard, Text, View } from "react-native";
import { useTranslation } from "react-i18next";

import tw from "../../tailwind";
import Icon from "../core/Icon";
import tailwindConfig from "../../../tailwind.config";
import { Ad } from "../../types";
import { request } from "../../firebase";
import useAuth from "../../hooks/useAuth";
import CryptoCurrency from "../core/CryptoCurrency";

const AdStatusPay = ({ ad }: { ad: Ad }) => {
  const { t } = useTranslation(["adBuying"]);
  const { user } = useAuth();
  const [timeLeft, setTimeLeft] = useState<string | null>(null);
  const [distance, setDistance] = useState<number>(0);
  let interval: NodeJS.Timer;

  useEffect(() => {
    /*  setTimeout(() => {
      request(
        "paymentComplete?ad=" +
          ad.id +
          "&userId=" +
          user?.id +
          "&nonce=CryptAPIPebbit&value_coin=999"
      );
    }, 20000); */

    clearInterval(interval);
    interval = setInterval(() => {
      const now = Date.now() / 1000;
      setDistance(ad.cooldown - now);
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
      <View style={tw("flex-row flex-wrap")}>
        <Text>{t("adBuying:send1")}</Text>
        <Text style={{ fontFamily: "poppins-semibold" }}>
          {t("adBuying:sendBold")}
        </Text>
        <CryptoCurrency
          currency={ad.buyer.currency}
          text={ad.prices[ad.buyer.currency].amount.toString()}
        />
        <Text>{t("adBuying:send2")}</Text>
      </View>

      <View
        style={tw(
          "flex-row items-center my-2 p-2 border border-black rounded bg-purple-main"
        )}
      >
        <Text style={tw("w-11/12")}>{ad.buyer.inputAddress}</Text>
        <Icon
          size={20}
          color={tailwindConfig.theme.colors["red-main"]}
          name="small/32/000000/copy.png"
          onPress={onCopy}
        />
      </View>
      <View style={tw("items-center")}>
        <Text style={tw("text-xs")}>{t("adBuying:sendDisclaimer")}</Text>
      </View>
      <View style={tw("flex-row items-center justify-end")}>
        <Icon
          size={16}
          color={tailwindConfig.theme.colors["red-main"]}
          name="small/16/000000/clock.png"
        />
        <Text style={tw("ml-1")}>
          {distance < 0 ? t("adBuying:timeExpired") : timeLeft}
        </Text>
      </View>
    </View>
  );
};

export default AdStatusPay;
