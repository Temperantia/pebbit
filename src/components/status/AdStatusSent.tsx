import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

import tw from "../../tailwind";
import { Ad } from "../../types";
import Icon from "../core/Icon";
import tailwindConfig from "../../../tailwind.config";
import { request } from "../../firebase";
import CryptoCurrency from "../core/CryptoCurrency";

const AdStatusSent = ({ ad, amount }: { ad: Ad; amount?: boolean }) => {
  const { t } = useTranslation(["adBuying"]);
  const [loading, setLoading] = useState<boolean>(false);
  const onConfirm = useCallback(async () => {
    setLoading(true);
    await request("receive?ad=" + ad.id);
    setLoading(false);
  }, [setLoading, request, ad]);

  return (
    <View style={tw("my-2")}>
      <Text>{t("adBuying:sentIndication")}</Text>
      {amount && (
        <CryptoCurrency
          currency={ad.buyer.currency}
          text={ad.prices[ad.buyer.currency].amount.toString()}
        />
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
          />
          <Text
            style={[
              tw("ml-3 text-white text-lg"),
              { fontFamily: "poppins-medium" },
            ]}
          >
            {t("adBuying:sentConfirmation")}
          </Text>
        </TouchableOpacity>
      )}
      <Text style={tw("text-xs my-2")}>{t("adBuying:sentGuarantee")}</Text>
    </View>
  );
};

export default AdStatusSent;
