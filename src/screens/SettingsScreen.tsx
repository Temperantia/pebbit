import { useNavigation } from "@react-navigation/core";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { KeyboardAvoidingView, ScrollView, Text, View } from "react-native";

import Button from "../components/core/Button";
import TextInput from "../components/core/TextInput";
import { keyboardVerticalOffset } from "../constants/Layout";
import useAuth from "../hooks/useAuth";
import tw from "../tailwind";

const SettingsScreen = () => {
  const { goBack } = useNavigation();
  const { user, authUser, saveProfile } = useAuth();
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      email: user?.email ?? "",
      phone: user?.phone ?? "",
      password: "",
      newPassword: "",
      address: user?.address ?? {
        name: "",
        street: "",
        city: "",
        country: "",
      },
    },
  });
  const [loading, setLoading] = useState<boolean>(false);
  const onSave = useCallback(
    handleSubmit(async (data) => {
      setLoading(true);
      await saveProfile(data);
      goBack();
      reset();
      setLoading(false);
    }),
    [saveProfile, handleSubmit, goBack, reset, setLoading]
  );
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <ScrollView style={tw("my-5")}>
        {authUser?.providerData.find(
          (provider) => provider?.providerId === "password"
        ) && (
          <View style={tw("p-5 border-b border-grey-slate")}>
            <Text style={tw("text-base")}>Account Information</Text>
            <Text>Edit your email, password or phone number</Text>
            <View style={tw("mb-2")}>
              <TextInput name="email" control={control} label="Email" />
            </View>
            <View style={tw("mb-2")}>
              <TextInput
                password
                optional
                name="password"
                control={control}
                label="Current Password (required if changing email or password)"
              />
            </View>
            <View style={tw("mb-2")}>
              <TextInput
                password
                optional
                name="newPassword"
                control={control}
                label="New Password"
              />
            </View>
            <View style={tw("mb-2")}>
              <TextInput
                optional
                name="phone"
                control={control}
                label="Phone Number"
              />
            </View>
          </View>
        )}
        <View style={tw("p-5")}>
          <Text style={tw("mb-2 text-base")}>Shipping Information</Text>
          <Text style={tw("mb-2")}>
            This is what sellers will use to ship your purchased items, please
            ensure this information is correct.
          </Text>
          <View style={tw("mb-2")}>
            <TextInput
              name="address.name"
              control={control}
              label="Addressee Name"
              value={user?.address.name ?? ""}
            />
          </View>
          <View style={tw("mb-2")}>
            <TextInput
              name="address.street"
              control={control}
              label="Street Address or PO Box #"
              value={user?.address.street ?? ""}
            />
          </View>
          <View style={tw("mb-2")}>
            <TextInput
              name="address.city"
              control={control}
              label="City or Town, other Principal Subdivision, and Postage"
              value={user?.address.city ?? ""}
            />
          </View>
          <View style={tw("mb-2")}>
            <TextInput
              name="address.country"
              control={control}
              label="Country"
              value={user?.address.country ?? ""}
            />
          </View>
        </View>
        <View style={tw("justify-center flex-row")}>
          <View>
            <Button
              save
              title="Save Changes"
              loading={loading}
              onPress={onSave}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SettingsScreen;
