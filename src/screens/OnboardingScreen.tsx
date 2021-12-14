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

const OnboardingScreen = () => {
  const { t } = useTranslation(["auth"]);
  const { navigate } = useNavigation();
  const { register } = useAuth();
  const { control, handleSubmit } = useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const onRegister = useCallback(
    handleSubmit(async ({ username, name, street, city, country }) => {
      setLoading(true);
      await register(username, { name, street, city, country });
      setLoading(false);
      navigate("Home");
    }),
    [handleSubmit, register, setLoading]
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <ScrollView style={tw("h-full px-5")}>
        <BackArrow label="Back" />
        <View style={tw("my-2 items-center")}>
          <Text style={[tw("text-lg"), { fontFamily: "poppins-medium" }]}>
            {t("auth:setUpAccount")}
          </Text>
        </View>
        <View>
          <Text style={tw("my-4 text-xs")}>
            {t("auth:pleaseCreateUsername")}
          </Text>
          <TextInput label="Username" name="username" control={control} />
        </View>
        <View style={tw("my-2")}>
          <Text style={tw("my-4 text-xs")}>
            {t("auth:pleaseEnterShipping")}
          </Text>
          <TextInput label={t("auth:yourName")} name="name" control={control} />
          <TextInput
            label={t("auth:streetAddress")}
            name="street"
            control={control}
          />
          <TextInput label={t("auth:city")} name="city" control={control} />
          <TextInput
            label={t("auth:country")}
            name="country"
            control={control}
          />
        </View>
        <View style={tw("p-2 w-full")}>
          <Button
            title={t("auth:continue")}
            loading={loading}
            onPress={onRegister}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default OnboardingScreen;
