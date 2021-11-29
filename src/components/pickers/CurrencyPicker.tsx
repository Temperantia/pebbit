import React, { useCallback } from "react";
import { Text, View } from "react-native";
import { Control } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { currencies } from "../../constants";
import MultiSelect from "../core/MultiSelect";
import TextInput from "../core/TextInput";
import CryptoCurrency from "../core/CryptoCurrency";

const CurrencyPicker = ({
  newAd,
  control,
}: {
  newAd: any;
  control: Control<any>;
}) => {
  const { t } = useTranslation(["common", "adCreation"]);
  const onListItem = useCallback(
    (currency: string) => (
      <CryptoCurrency raw key={currency} currency={currency} text={currency} />
    ),
    [CryptoCurrency]
  );

  return (
    <>
      <MultiSelect
        data={Object.keys(currencies)}
        name="currencies"
        placeholder={t("common:currencies")}
        control={control}
        onListItem={onListItem}
      />
      {newAd?.currencies?.map((currency: string) => (
        <TextInput
          number
          price={currency}
          key={currency + "Amount"}
          placeholder={"adCreation:askingPrice"}
          icon={currencies[currency].image}
          name={"prices." + currency + "-amount"}
          control={control}
        />
      ))}
      {newAd?.currencies?.map((currency: string) => (
        <View key={currency + "Address"}>
          <Text>
            {t("adCreation:addAddress1")}
            <Text style={{ fontFamily: "poppins-bold" }}>{currency}</Text>
            {t("adCreation:addAddress2")}
          </Text>
          <TextInput
            name={"prices." + currency + "-address"}
            control={control}
          />
        </View>
      ))}
    </>
  );
};

export default CurrencyPicker;
