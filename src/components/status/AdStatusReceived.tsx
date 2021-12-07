import React, { useCallback, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { useTranslation } from "react-i18next";

import tw from "../../tailwind";
import { Ad } from "../../types";
import Icon from "../core/Icon";
import tailwindConfig from "../../../tailwind.config";
import CryptoCurrency from "../core/CryptoCurrency";
import { request } from "../../firebase";

const AdStatusReceived = ({ ad, amount }: { ad: Ad; amount?: boolean }) => {
  const { t } = useTranslation(["adBuying"]);
  const [loading, setLoading] = useState(false);
  const onRate = useCallback(
    (rate) => async () => {
      setLoading(true);
      try {
        await request("rate?ad=" + ad.id + "&rate=" + (rate + 1));
      } catch (error) {
        alert(error);
      }
      setLoading(false);
    },
    [request, ad, setLoading, alert]
  );

  return (
    <View style={tw("my-2")}>
      <Text>{t("adBuying:receivedConfirmation")}</Text>
      {amount && (
        <CryptoCurrency
          currency={ad.buyer.currency}
          text={ad.prices[ad.buyer.currency].amount.toString()}
        />
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
        />
        <Text style={tw("ml-3 text-grey-slate text-lg")}>
          {t("adBuying:receivedTransaction")}
        </Text>
      </View>
      <Text>
        {ad.rate
          ? t("adBuying:ratingConfirmation")
          : t("adBuying:ratingRequest")}
      </Text>
      <View style={tw("flex-row")}>
        {loading ? (
          <ActivityIndicator color={tailwindConfig.theme.colors["red-main"]} />
        ) : (
          [...Array(5).keys()].map((_value, index) => (
            <Icon
              key={index}
              size={32}
              color={
                tailwindConfig.theme.colors[
                  ad.rate && ad.rate > index ? "gold-badge" : "grey-slate"
                ]
              }
              name={
                "small/32/000000/star" +
                (ad.rate && ad.rate > index ? "-filled" : "") +
                ".png"
              }
              onPress={ad.rate ? undefined : onRate(index)}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default AdStatusReceived;
