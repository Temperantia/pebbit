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
import { keyboardVerticalOffset } from "../constants/Layout";

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

  const onRenderItem = useCallback((item) => <Text>{item}</Text>, [Text]);
  const onRenderButton = useCallback((item) => <Text>{item}</Text>, [Text]);

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
        <View style={tw("mb-2")}>
          <Text style={[tw("text-lg"), { fontFamily: "poppins-semibold" }]}>
            Ad Details
          </Text>
        </View>
        <View style={tw("mb-2")}>
          <TextInput name="title" placeholder="Title" control={control} />
        </View>
        <View style={tw("mb-2")}>
          <Select
            data={categories}
            placeholder="Category"
            name="category"
            control={control}
            onRenderButton={onRenderButton}
            onRenderItem={onRenderItem}
          />
        </View>
        <View style={tw("mb-2")}>
          <TextInput
            multiline
            height="h-24"
            name="description"
            placeholder="Description"
            control={control}
          />
        </View>
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
              <AdCard data={newAd} />
            </View>
          )}
        <View style={tw("my-4")}>
          <Button black title="Post Ad" onPress={onSubmit} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateAdScreen;
