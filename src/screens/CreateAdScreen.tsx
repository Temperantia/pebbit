import React, { useCallback } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";

import { auth, adCollection } from "../firebase";
import useAuth from "../hooks/useAuth";
import TextInput from "../components/core/TextInput";
import Select from "../components/core/Select";
import tw from "../tailwind";
import { categories, currencies } from "../constants";
import MultiSelect from "../components/core/MultiSelect";
import Button from "../components/core/Button";
import tailwindConfig from "../../tailwind.config";
import Icon from "../components/core/Icon";

const CreateAdScreen = () => {
  const { control, handleSubmit, watch } = useForm();
  const { token } = useAuth();
  const newAd = watch();

  const onSubmit = useCallback(
    handleSubmit(async ({ title, category }) => {
      console.log(category);
      //await adCollection.add({ title });
    }),
    [handleSubmit, adCollection]
  );

  const onBuy = useCallback(async () => {
    const currency = "btc";
    const ad = "UowXDil964nlELDJBftj";
    const t = await auth.currentUser.getIdToken(true);

    try {
      const result = await fetch(
        "https://us-central1-crypto-2293c.cloudfunctions.net/buy?id=" +
          ad +
          "&currency=" +
          currency +
          "&token=" +
          token,
        {
          headers: {
            Authorization: `Bearer ${t}`,
          },
        }
      );
      if (result.status === 409) {
        throw Error("Under transaction");
      } else if (!result.ok) {
        throw Error("Something wrong happened");
      }
      const order = await result.json();
      console.log(order.id, "pay the amount in btc at", order.inputAddress);
      /* const timeout = setInterval(async () => {
        const status = (await orderCollection.doc(order.id).get()).data()
          .status;
        //console.log(order, status);
        if (status === "paid") {
          console.log("paid");
          clearTimeout(timeout);
        }
      }, 15000); */
    } catch (error) {
      alert(error.message);
    }
  }, [auth, fetch, token, alert]);

  const onConfirm = useCallback(async () => {
    const order = "UowXDil964nlELDJBftj";
    const t = await auth.currentUser.getIdToken(true);

    try {
      const result = await fetch(
        "https://us-central1-crypto-2293c.cloudfunctions.net/confirm?id=" +
          order,
        {
          headers: {
            Authorization: `Bearer ${t}`,
          },
        }
      );
      if (!result.ok) {
        throw Error("Something wrong happened");
      }
    } catch (error) {
      alert(error.message);
    }
  }, [auth, fetch, token, alert]);

  const onListItem = useCallback(
    (item: string) => (
      <View key={item} style={tw("flex-row items-center pr-2")}>
        <Image
          style={tw("w-full")}
          width={24}
          height={24}
          source={currencies[item]}
        ></Image>
        <Text style={[tw("pl-1"), { fontFamily: "poppins-medium" }]}>
          {item}
        </Text>
      </View>
    ),
    [tw]
  );

  const onPickPicture = useCallback(async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      return;
    }
  }, []);

  return (
    <ScrollView style={tw("px-5")}>
      <View style={tw("flex-row justify-center my-4")}>
        <Text style={[tw("text-xl"), { fontFamily: "poppins-semibold" }]}>
          Post an Ad
        </Text>
      </View>
      <Text style={[tw("text-lg"), { fontFamily: "poppins-semibold" }]}>
        Ad Details
      </Text>
      <TextInput name="title" placeholder="Title" control={control}></TextInput>
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
          placeholder="Asking Price"
          icon={currencies[currency]}
          name={currency + ".amont"}
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
            placeholder=""
            name={currency + ".address"}
            control={control}
          ></TextInput>
        </View>
      ))}
      <View style={tw("my-3")}>
        <Text style={[tw("text-grey-slate"), { fontFamily: "poppins-bold" }]}>
          ESCROW AGREEMENT
        </Text>
        <Text style={tw("text-grey-slate")}>
          Escrow is a neutral holding place where we put the buyer's funds aside
          until the transaction is done. The funds stay there until the seller
          fulfills their obligations and the buyer marks the transaction as
          complete. If an agreement is not made within 30 days of the accepted
          offer, the funds will be returned to the buyer.
        </Text>
      </View>
      <View style={tw("my-3")}>
        <Text style={{ fontFamily: "poppins-semibold" }}>Pictures</Text>
        <Text>
          Add up to 6 pictures/videos. You must have at least one picture.
        </Text>
      </View>
      <View style={tw("flex-row flex-wrap justify-center")}>
        <Controller
          name="pictures"
          defaultValue={[null, null, null, null, null, null]}
          control={control}
          rules={{}}
          render={({ field: { onChange, value }, fieldState: { error } }) =>
            value.map((picture, index: number) => (
              <TouchableOpacity
                style={tw(
                  "w-24 h-24 mr-3 mb-3 border border-grey-slate flex-row justify-center items-center"
                )}
                key={index}
                onPress={onPickPicture}
              >
                {picture ? (
                  <Image
                    style={tw("w-1/3")}
                    resizeMode="contain"
                    source={picture}
                  ></Image>
                ) : (
                  <Icon
                    size={36}
                    name="small/32/000000/plus-math.png"
                    color={tailwindConfig.theme.colors["grey-slate"]}
                  ></Icon>
                )}
              </TouchableOpacity>
            ))
          }
        ></Controller>
      </View>

      <Button title="Add Ad" onPress={onSubmit}></Button>
    </ScrollView>
  );
};

export default CreateAdScreen;
