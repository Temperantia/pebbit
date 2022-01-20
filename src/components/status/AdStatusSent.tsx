import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  Clipboard,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import tw from "../../tailwind";
import { Ad } from "../../types";
import Icon from "../core/Icon";
import tailwindConfig from "../../../tailwind.config";
import { request } from "../../firebase";
import CryptoCurrency from "../core/CryptoCurrency";

const AdStatusSent = ({ ad, amount }: { ad: Ad; amount?: boolean }) => {
  const { t } = useTranslation(["adBuying", "shipping"]);
  const [loading, setLoading] = useState<boolean>(false);
  const onConfirm = useCallback(async () => {
    setLoading(true);
    await request("receive?ad=" + ad.id);
    setLoading(false);
  }, [setLoading, request, ad]);

  const onCopy = useCallback(() => {
    Clipboard.setString(ad.number ?? "");
  }, [ad, Clipboard]);

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
            "flex-row justify-center items-center rounded bg-black-background-2 py-2"
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
              tw("ml-1 text-white text-base"),
              { fontFamily: "poppins-medium" },
            ]}
          >
            {t("adBuying:sentConfirmation")}
          </Text>
        </TouchableOpacity>
      )}
      <Text style={tw("text-xs my-2")}>{t("adBuying:sentGuarantee")}</Text>
      <View style={tw("border-t border-black p-2")}>
        <Text style={tw("text-grey-slate")}>
          {t("shipping:trackingNumber")}
        </Text>
        <View
          style={tw(
            "h-14 flex-row items-center my-2 border border-black rounded bg-purple-main"
          )}
        >
          <View
            style={tw(
              "h-full justify-center border-r border-grey-slate p-1 w-3/12"
            )}
          >
            <Text>{ad.service}</Text>
          </View>
          <View
            style={tw(
              "h-full flex-grow justify-center border-r border-grey-slate p-1 w-8/12"
            )}
          >
            <Text>{ad.number}</Text>
          </View>
          <View style={tw("p-1")}>
            <Icon
              size={20}
              color={tailwindConfig.theme.colors["red-main"]}
              name="small/32/000000/copy.png"
              onPress={onCopy}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default AdStatusSent;
