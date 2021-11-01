import React, { useCallback } from "react";
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

import { request, storage } from "../firebase";
import TextInput from "../components/core/TextInput";
import Select from "../components/core/Select";
import tw from "../tailwind";
import { categories } from "../constants";
import Button from "../components/core/Button";
import AdCard from "../components/AdCard";
import PicturePicker from "../components/PicturePicker";
import CurrencyPicker from "../components/CurrencyPicker";

const keyboardVerticalOffset = Platform.OS === "ios" ? 100 : 0;

const uploadImage = async (uri: string) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  const ref = storage.ref().child(v4());
  await ref.put(blob);
  return await ref.getDownloadURL();
};

const CreateAdScreen = () => {
  const { navigate } = useNavigation();
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
      ad.prices = Object.entries(ad.prices).reduce(
        (prices: any, [key, price]) => {
          const [currency, type] = key.split("-");
          if (!prices[currency]) {
            prices[currency] = {};
          }
          prices[currency][type] = price;
          return prices;
        },
        {}
      );

      ad.pictures = ad.pictures.filter((picture) => !!picture);
      for (const [index, picture] of ad.pictures.entries()) {
        ad.pictures[index] = await uploadImage(picture);
      }

      await request("sell", ad);
      reset({
        category: null,
        title: "",
        description: "",
        prices: {},
        currencies: [],
        pictures: ["", "", "", "", "", ""],
      });
      navigate("Exchange", { screen: "ExchangeScreen" });
    }),
    [reset, navigate, handleSubmit, uploadImage, request]
  );

  console.log(newAd);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <ScrollView style={tw("px-5")}>
        <View style={tw("flex-row justify-center my-4")}>
          <Text style={[tw("text-xl"), { fontFamily: "poppins-semibold" }]}>
            Post an Ad
          </Text>
        </View>
        <Text style={[tw("text-lg"), { fontFamily: "poppins-semibold" }]}>
          Ad Details
        </Text>
        <TextInput
          name="title"
          placeholder="Title"
          control={control}
        ></TextInput>
        <Select
          data={categories}
          placeholder="Category"
          name="category"
          control={control}
        ></Select>
        <TextInput
          multiline
          name="description"
          placeholder="Description"
          control={control}
        ></TextInput>
        <Text>You may choose up to 3 currencies.</Text>
        <CurrencyPicker newAd={newAd} control={control} />
        <View style={tw("my-3")}>
          <Text style={[tw("text-grey-slate"), { fontFamily: "poppins-bold" }]}>
            ESCROW AGREEMENT
          </Text>
          <Text style={tw("text-grey-slate")}>
            Escrow is a neutral holding place where we put the buyer's funds
            aside until the transaction is done. The funds stay there until the
            seller fulfills their obligations and the buyer marks the
            transaction as complete. If an agreement is not made within 30 days
            of the accepted offer, the funds will be returned to the buyer.
          </Text>
        </View>
        <View style={tw("my-3")}>
          <Text style={{ fontFamily: "poppins-semibold" }}>Pictures</Text>
          <Text style={tw("text-xs")}>
            Add up to 6 pictures/videos. You must have at least one picture.
          </Text>
        </View>
        <PicturePicker control={control} />
        {!!newAd.title &&
          !!newAd.description &&
          Object.keys(newAd.prices).length > 0 && (
            <View>
              <Text style={[tw("my-4"), { fontFamily: "poppins-semibold" }]}>
                Ad Preview
              </Text>
              <AdCard data={newAd}></AdCard>
            </View>
          )}
        <View style={tw("my-4")}>
          <Button black title="Post Ad" onPress={onSubmit}></Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateAdScreen;
