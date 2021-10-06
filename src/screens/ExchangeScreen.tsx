import React, { useCallback } from "react";
import { Button, ScrollView, Text, View } from "react-native";
import { useForm } from "react-hook-form";

import { auth, adCollection } from "../firebase";
import useAuth from "../hooks/useAuth";
import TextInput from "../components/core/TextInput";
import Select from "../components/core/Select";
import tw from "../tailwind";
import { categories } from "../constants";

const ExchangeScreen = () => {
  const { control, handleSubmit } = useForm();
  const { token } = useAuth();

  const onSubmit = useCallback(
    handleSubmit(async ({ title, category }) => {
      console.log(category);
      //await adCollection.add({ title });
    }),
    [handleSubmit, adCollection]
  );

  return (
    <ScrollView style={tw("mx-5")}>
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
      <Button title="Add Ad" onPress={onSubmit}></Button>
    </ScrollView>
  );
};

export default ExchangeScreen;
