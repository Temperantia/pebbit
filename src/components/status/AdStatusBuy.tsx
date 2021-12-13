import React, { useCallback, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";

import { request } from "../../firebase";
import tw from "../../tailwind";
import Button from "../core/Button";
import { Ad } from "../../types";
import CryptoCurrency from "../core/CryptoCurrency";

const AdStatusBuy = ({ ad }: { ad: Ad }) => {
  const { t } = useTranslation(["adBuying"]);
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
    try {
      setLoading(true);
      await request("buy?id=" + ad.id + "&currency=" + selectedCurrency);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert(error);
    }
  }, [setLoading, ad, request, selectedCurrency, alert]);

  return (
    <View style={tw("h-32 justify-evenly")}>
      <View style={tw("my-2")}>
        {Object.keys(ad.currencies).length > 1 && (
          <Text style={[tw("my-3"), { fontFamily: "poppins-medium" }]}>
            {t("adBuying:priceSelection1")}
            <Text style={tw("text-grey-slate text-xs")}>
              {t("adBuying:priceSelection2")}
            </Text>
          </Text>
        )}
        <View style={tw("flex-row")}>
          {Object.entries(ad.prices).map(([currency, price]) =>
            Object.keys(ad.currencies).length > 1 ? (
              <TouchableOpacity
                key={currency}
                style={tw(
                  "rounded mx-1 w-1/3 border border-grey-slate py-1 px-2 items-center" +
                    (currency === selectedCurrency ? " bg-purple-main" : "")
                )}
                onPress={onSelectCurrency(currency)}
              >
                <CryptoCurrency
                  currency={currency}
                  text={price?.amount?.toString()}
                  textColor={
                    currency === selectedCurrency
                      ? "text-black"
                      : "text-grey-slate"
                  }
                />
              </TouchableOpacity>
            ) : (
              <CryptoCurrency
                key={currency}
                currency={currency}
                text={price?.amount?.toString()}
                textColor="text-black"
              />
            )
          )}
        </View>
      </View>
      <Button
        black
        title={t("adBuying:buy")}
        loading={loading}
        onPress={onBuy}
      />
    </View>
  );
};

export default AdStatusBuy;
