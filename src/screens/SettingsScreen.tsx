import { useNavigation } from "@react-navigation/core";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { KeyboardAvoidingView, ScrollView, Text, View } from "react-native";
import Button from "../components/core/Button";

import TextInput from "../components/core/TextInput";
import { keyboardVerticalOffset } from "../constants/Layout";
import { auth, userCollection } from "../firebase";
import useAuth from "../hooks/useAuth";
import tw from "../tailwind";

const SettingsScreen = () => {
  const { goBack } = useNavigation();
  const { user, authUser } = useAuth();
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
    handleSubmit(async ({ email, phone, address, password, newPassword }) => {
      if (!user) {
        return;
      }
      setLoading(true);
      try {
        if (user.email && email !== user.email) {
          try {
            await auth.signInWithEmailAndPassword(user.email, password);
          } catch (error) {
            alert("Incorrect password");
            setLoading(false);
            return;
          }
          await authUser?.updateEmail(email);
        }
        if (user.email && password && newPassword) {
          try {
            await auth.signInWithEmailAndPassword(user.email, password);
          } catch (error) {
            alert("Incorrect password");
            setLoading(false);
            return;
          }
          await authUser?.updatePassword(newPassword);
        }
        await userCollection.doc(user?.id).update({ email, phone, address });
        goBack();
        reset();
        setLoading(false);
      } catch (error: any) {
        alert(error.message);
      }
    }),
    [
      handleSubmit,
      alert,
      authUser,
      goBack,
      reset,
      setLoading,
      auth,
      userCollection,
      user,
    ]
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
            <TextInput name="email" control={control} label="Email" />
            <TextInput
              password
              optional
              name="password"
              control={control}
              label="Current Password (required if changing email or password)"
            />
            <TextInput
              password
              optional
              name="newPassword"
              control={control}
              label="New Password"
            />
            <TextInput
              optional
              name="phone"
              control={control}
              label="Phone Number"
            />
          </View>
        )}
        <View style={tw("p-5")}>
          <Text style={tw("text-base")}>Shipping Information</Text>
          <Text>
            This is what sellers will use to ship your purchased items, please
            ensure this information is correct.
          </Text>
          <TextInput
            name="address.name"
            control={control}
            label="Addressee Name"
            value={user?.address.name ?? ""}
          />
          <TextInput
            name="address.street"
            control={control}
            label="Street Address or PO Box #"
            value={user?.address.street ?? ""}
          />
          <TextInput
            name="address.city"
            control={control}
            label="City or Town, other Principal Subdivision, and Postage"
            value={user?.address.city ?? ""}
          />
          <TextInput
            name="address.country"
            control={control}
            label="Country"
            value={user?.address.country ?? ""}
          />
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
