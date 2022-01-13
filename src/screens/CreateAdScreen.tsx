import React, { Ref, useCallback, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useForm } from "react-hook-form";
import "react-native-get-random-values";
import { v4 } from "uuid";
import { useNavigation } from "@react-navigation/core";
import SelectDropdown from "react-native-select-dropdown";
import { useTranslation } from "react-i18next";

import { request, storage } from "../firebase";
import TextInput from "../components/core/TextInput";
import Select from "../components/core/Select";
import tw from "../tailwind";
import { categories, currencies } from "../constants";
import Button from "../components/core/Button";
import AdCard from "../components/cards/AdCard";
import PicturePicker from "../components/pickers/PicturePicker";
import CurrencyPicker from "../components/pickers/CurrencyPicker";
import { keyboardVerticalOffset } from "../constants/Layout";

const uploadImage = async (uri: string) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  const ref = storage.ref().child(v4());
  await ref.put(blob);
  return await ref.getDownloadURL();
};

const CreateAdScreen = () => {
  const { t } = useTranslation(["adCreation"]);
  const { navigate } = useNavigation();
  const scrollRef: Ref<ScrollView> | null = useRef(null);
  const categoryRef: Ref<SelectDropdown> | null = useRef(null);
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      category: null,
      title: "",
      description: "",
      prices: {},
      currencies: [],
      pictures: ["", "", "", "", "", ""],
    },
  });
  const newAd = watch();

  const onSubmit = useCallback(
    handleSubmit(async (ad) => {
      try {
        setLoading(true);
        ad.prices = Object.entries(ad.prices).reduce(
          (prices: any, [key, value]: any) => {
            if (!value) {
              return prices;
            }
            const [currency, type] = key.split("-");
            if (!prices[currency]) {
              prices[currency] = {};
            }
            if (type === "amount") {
              value = parseFloat(value.replace(",", "."));
            }
            prices[currency][type] = value;
            return prices;
          },
          {}
        );

        ad.pictures = ad.pictures.filter((picture) => !!picture);
        for (const [index, picture] of ad.pictures.entries()) {
          ad.pictures[index] = await uploadImage(picture);
        }
        await request("sell", ad);
        setLoading(false);
        reset({
          category: null,
          title: "",
          description: "",
          prices: {},
          currencies: [],
          pictures: ["", "", "", "", "", ""],
        });
        categoryRef.current?.reset();
        scrollRef.current?.scrollTo({ y: 0 });
        navigate("Exchange", { screen: "ExchangeScreen" });
      } catch (error) {
        setLoading(false);
        alert(error);
      }
    }),
    [
      reset,
      navigate,
      handleSubmit,
      setLoading,
      uploadImage,
      request,
      Object,
      alert,
    ]
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <ScrollView
        style={tw("px-5")}
        keyboardDismissMode="interactive"
        ref={scrollRef}
      >
        <View style={tw("flex-row justify-center my-4")}>
          <Text style={[tw("text-xl"), { fontFamily: "poppins-semibold" }]}>
            {t("adCreation:postAnAd")}
          </Text>
        </View>
        <View style={tw("mb-2")}>
          <Text style={[tw("text-lg"), { fontFamily: "poppins-semibold" }]}>
            {t("adCreation:adDetails")}
          </Text>
        </View>
        <View style={tw("mb-2")}>
          <TextInput
            name="title"
            placeholder={t("adCreation:title")}
            control={control}
          />
        </View>
        <View style={tw("mb-2")}>
          <Select
            category
            data={Object.keys(categories)}
            placeholder={t("adCreation:category")}
            name="category"
            control={control}
            innerRef={categoryRef}
          />
        </View>
        <View style={tw("mb-2")}>
          <TextInput
            multiline
            height="h-24"
            name="description"
            placeholder={t("adCreation:description")}
            control={control}
          />
        </View>
        <Text>
          {t("adCreation:chooseCurrencies1") +
            " " +
            Object.keys(currencies).length +
            " " +
            t("adCreation:chooseCurrencies2")}
        </Text>
        <CurrencyPicker newAd={newAd} control={control} />
        <View style={tw("my-3")}>
          <Text style={[tw("text-grey-slate"), { fontFamily: "poppins-bold" }]}>
            {t("adCreation:escrowAgreement")}
          </Text>
          <Text style={tw("text-grey-slate")}>
            {t("adCreation:escrowDescription")}
          </Text>
        </View>
        <View style={tw("my-3")}>
          <Text style={{ fontFamily: "poppins-semibold" }}>
            {t("adCreation:pictures")}
          </Text>
          <Text style={tw("text-xs")}>{t("adCreation:addPictures")}</Text>
        </View>
        <PicturePicker control={control} />
        {!!newAd.title &&
          !!newAd.description &&
          Object.keys(newAd.prices).length > 0 && (
            <View>
              <Text style={[tw("my-4"), { fontFamily: "poppins-semibold" }]}>
                {t("adCreation:adPreview")}
              </Text>
              <AdCard data={newAd} />
            </View>
          )}
        <View style={tw("my-4")}>
          <Button
            black
            title={t("adCreation:postAd")}
            loading={loading}
            onPress={onSubmit}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateAdScreen;
