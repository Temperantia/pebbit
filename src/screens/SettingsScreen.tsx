import { useNavigation } from "@react-navigation/core";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import BackArrow from "../components/core/BackArrow";

import Button from "../components/core/Button";
import TextInput from "../components/core/TextInput";
import { keyboardVerticalOffset } from "../constants/Layout";
import useAuth from "../hooks/useAuth";
import tw from "../tailwind";

const SettingsScreen = () => {
  const { t } = useTranslation(["common", "profile"]);
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
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <ScrollView style={tw("my-2")}>
        <BackArrow label="Back" />
        {authUser?.providerData.find(
          (provider) => provider?.providerId === "password"
        ) && (
          <View style={tw("py-2 px-5 border-b border-grey-slate")}>
            <Text style={tw("text-base")}>
              {t("profile:accountInformation")}
            </Text>
            <Text>{t("profile:editInfo")}</Text>
            <View style={tw("mb-2")}>
              <TextInput
                name="email"
                control={control}
                label={t("profile:email")}
              />
            </View>
            <View style={tw("mb-2")}>
              <TextInput
                password
                optional
                name="password"
                control={control}
                label={t("profile:password")}
              />
            </View>
            <View style={tw("mb-2")}>
              <TextInput
                password
                optional
                name="newPassword"
                control={control}
                label={t("profile:newPassword")}
              />
            </View>
            <View style={tw("mb-2")}>
              <TextInput
                optional
                name="phone"
                control={control}
                label={t("profile:phoneNumber")}
              />
            </View>
          </View>
        )}
        <View style={tw("p-5")}>
          <Text style={tw("mb-2 text-base")}>{t("profile:shippingInfo")}</Text>
          <Text style={tw("mb-2")}>{t("profile:shippingDescription")}</Text>
          <View style={tw("mb-2")}>
            <TextInput
              name="address.name"
              control={control}
              label={t("profile:addresseeName")}
              value={user?.address.name ?? ""}
            />
          </View>
          <View style={tw("mb-2")}>
            <TextInput
              name="address.street"
              control={control}
              label={t("profile:streetAddress")}
              value={user?.address.street ?? ""}
            />
          </View>
          <View style={tw("mb-2")}>
            <TextInput
              name="address.city"
              control={control}
              label={t("profile:city")}
              value={user?.address.city ?? ""}
            />
          </View>
          <View style={tw("mb-2")}>
            <TextInput
              name="address.country"
              control={control}
              label={t("profile:country")}
              value={user?.address.country ?? ""}
            />
          </View>
        </View>
        <View style={tw("justify-center flex-row")}>
          <View>
            <Button
              save
              title={t("profile:saveChanges")}
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
