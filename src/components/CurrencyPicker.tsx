import React, { useCallback } from "react";
import { Image, Text, View } from "react-native";
import { Control } from "react-hook-form";

import { currencies } from "../constants";
import MultiSelect from "./core/MultiSelect";
import tw from "../tailwind";
import TextInput from "./core/TextInput";

const CurrencyPicker = ({
  newAd,
  control,
}: {
  newAd: any;
  control: Control<any>;
}) => {
  const onListItem = useCallback(
    (item: string) => (
      <View key={item} style={tw("flex-row items-center pr-2")}>
        <Image style={tw("w-8 h-8")} source={currencies[item].image}></Image>
        <Text style={[tw("pl-1"), { fontFamily: "poppins-medium" }]}>
          {item}
        </Text>
      </View>
    ),
    [tw]
  );

  return (
    <>
      <MultiSelect
        data={Object.keys(currencies)}
        name="currencies"
        placeholder="Currencies"
        control={control}
        onListItem={onListItem}
      ></MultiSelect>
      {newAd?.currencies?.map((currency: string) => (
        <TextInput
          number
          price={currency}
          key={currency + "Amount"}
          placeholder="Asking Price"
          icon={currencies[currency].image}
          name={"prices." + currency + "-amount"}
          control={control}
        ></TextInput>
      ))}
      {newAd?.currencies?.map((currency: string) => (
        <View key={currency + "Address"}>
          <Text>
            Add your{" "}
            <Text style={{ fontFamily: "poppins-bold" }}>{currency}</Text>{" "}
            wallet address below.
          </Text>
          <TextInput
            name={"prices." + currency + "-address"}
            control={control}
          ></TextInput>
        </View>
      ))}
    </>
  );
};

export default CurrencyPicker;
