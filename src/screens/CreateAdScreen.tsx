import React, { useCallback } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import "react-native-get-random-values";
import { v4 } from "uuid";

import {
  serverTimestamp,
  adCollection,
  storage,
  userCollection,
} from "../firebase";
import useAuth from "../hooks/useAuth";
import TextInput from "../components/core/TextInput";
import Select from "../components/core/Select";
import tw from "../tailwind";
import { categories, currencies } from "../constants";
import MultiSelect from "../components/core/MultiSelect";
import Button from "../components/core/Button";
import tailwindConfig from "../../tailwind.config";
import Icon from "../components/core/Icon";
import AdCard from "../components/AdCard";
import { Ad } from "../types";

const keyboardVerticalOffset = Platform.OS === "ios" ? 100 : 0;

const CreateAdScreen = () => {
  const { control, handleSubmit, watch } = useForm();
  const { token, user } = useAuth();
  const newAd = watch();

  const uploadImage = async (uri: string) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = storage.ref().child(v4());
    await ref.put(blob);
    return await ref.getDownloadURL();
  };

  //todo it needs a sell function
  const onSubmit = useCallback(
    handleSubmit(async (ad: Ad) => {
      for (const [index, picture] of ad.pictures.entries()) {
        if (picture) {
          ad.pictures[index] = await uploadImage(picture);
        }
      }
      ad.pictures.filter((picture) => !!picture);
      ad = {
        ...ad,
        created: serverTimestamp(),
        status: "new",
        cooldown: 0,
        userId: user.id,
      };
      const ref = await adCollection.add(ad);
      await userCollection.doc(user.id).update({
        ["ads." + ref.id]: ad,
      });
    }),
    [handleSubmit, adCollection]
  );

  const onListItem = useCallback(
    (item: string) => (
      <View key={item} style={tw("flex-row items-center pr-2")}>
        <Image
          style={tw("w-full")}
          width={24}
          height={24}
          source={currencies[item].image}
        ></Image>
        <Text style={[tw("pl-1"), { fontFamily: "poppins-medium" }]}>
          {item}
        </Text>
      </View>
    ),
    [tw]
  );

  const onPickPicture = useCallback(
    (index: number, pictures: any[], onChange: (pictures: any) => void) =>
      async () => {
        const permissionResult =
          await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
          alert("Permission to access camera roll is required!");
          return;
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync();

        if (pickerResult.cancelled === true) {
          return;
        }

        pictures[index] = pickerResult.uri;

        onChange(pictures);
      },
    [ImagePicker, alert]
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
        <MultiSelect
          data={Object.keys(currencies)}
          name="currencies"
          placeholder="Currencies"
          control={control}
          onListItem={onListItem}
        ></MultiSelect>
        {newAd?.currencies?.map((currency: string) => (
          <TextInput
            key={currency + "Amount"}
            number
            placeholder="Asking Price"
            icon={currencies[currency].image}
            name={"prices." + currency + ".amount"}
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
              name={"prices." + currency + ".address"}
              control={control}
            ></TextInput>
          </View>
        ))}
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
        <Controller
          name="pictures"
          defaultValue={[null, null, null, null, null, null]}
          control={control}
          rules={{
            validate: (value: string[]) => {
              return value.filter((picture) => !!picture).length === 0
                ? "At least 1 picture"
                : true;
            },
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <View style={tw("flex-row flex-wrap justify-center")}>
              {value.map((picture: string, index: number) => (
                <TouchableOpacity
                  style={tw(
                    "w-24 h-24 mr-3 mb-3 border border-grey-slate flex-row justify-center items-center"
                  )}
                  key={index}
                  onPress={onPickPicture(index, value, onChange)}
                >
                  {picture ? (
                    <Image
                      style={tw("w-24 h-24")}
                      resizeMode="cover"
                      source={{ uri: picture }}
                    ></Image>
                  ) : (
                    <Icon
                      size={36}
                      name="small/32/000000/plus-math.png"
                      color={tailwindConfig.theme.colors["grey-slate"]}
                    ></Icon>
                  )}
                </TouchableOpacity>
              ))}
              {error && (
                <View style={tw("w-full")}>
                  <Text style={tw("text-red-main")}>{error.message}</Text>
                </View>
              )}
            </View>
          )}
        ></Controller>
        {!!newAd.title && !!newAd.description && (
          <View>
            <Text style={[tw("my-4"), { fontFamily: "poppins-semibold" }]}>
              Ad Preview
            </Text>
            <AdCard data={newAd as Ad}></AdCard>
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
