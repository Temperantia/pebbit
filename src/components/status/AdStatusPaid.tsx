import React from "react";
import { Text, View } from "react-native";
import { useTranslation } from "react-i18next";

import tw from "../../tailwind";
import { Ad } from "../../types";
import Icon from "../core/Icon";
import tailwindConfig from "../../../tailwind.config";
import CryptoCurrency from "../core/CryptoCurrency";

const AdStatusPaid = ({ ad, amount }: { ad: Ad; amount?: boolean }) => {
  const { t } = useTranslation(["adBuying"]);
  return (
    <View style={tw("my-2")}>
      <Text>{t("adBuying:paymentReceived")}</Text>
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
          color={tailwindConfig.theme.colors["gold-badge-gradient"]}
          name="small/32/000000/in-progress.png"
        />
        <Text style={tw("ml-3 text-grey-slate text-lg")}>
          {t("adBuying:waitingSeller")}
        </Text>
      </View>
    </View>
  );
};

export default AdStatusPaid;
