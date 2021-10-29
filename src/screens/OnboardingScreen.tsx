import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { KeyboardAvoidingView, ScrollView, Text, View } from "react-native";

import Button from "../components/core/Button";
import TextInput from "../components/core/TextInput";
import { keyboardVerticalOffset } from "../constants/Layout";
import useAuth from "../hooks/useAuth";
import tw from "../tailwind";

const OnboardingScreen = () => {
  const { register } = useAuth();
  const { control, handleSubmit } = useForm();
  const onRegister = useCallback(
    handleSubmit(({ username, name, street, city, country }) =>
      register(username, { name, street, city, country })
    ),
    [handleSubmit, register]
  );

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <ScrollView style={tw("px-5")}>
        <View style={tw("my-2 items-center")}>
          <Text style={[tw("text-lg"), { fontFamily: "poppins-medium" }]}>
            Set up your account
          </Text>
        </View>
        <View>
          <Text style={tw("my-4 text-xs")}>
            Please create a username, you cannot change this later
          </Text>
          <TextInput
            label="Username"
            name="username"
            control={control}
          ></TextInput>
        </View>
        <View style={tw("my-2")}>
          <Text style={tw("my-4 text-xs")}>
            Please enter your shipping information, this is what sellers will
            use to ship your purchased items, please ensure this information is
            correct. You can change this later.
          </Text>
          <TextInput
            label="Your Name"
            name="name"
            control={control}
          ></TextInput>
          <TextInput
            label="Street Address or PO Box #"
            name="street"
            control={control}
          ></TextInput>
          <TextInput
            label="City or Town, other Principal Subdivision, and Postage"
            name="city"
            control={control}
          ></TextInput>
          <TextInput
            label="Country"
            name="country"
            control={control}
          ></TextInput>
        </View>
        <View style={tw("p-2 w-full")}>
          <Button title="CONTINUE" onPress={onRegister}></Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default OnboardingScreen;
