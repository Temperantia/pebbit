import React, { useCallback, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  ScrollView,
  View,
} from "react-native";
import { useTranslation } from "react-i18next";

import Button from "../components/core/Button";
import TextInput from "../components/core/TextInput";
import SocialButton from "../components/auth/SocialButton";
import useAuth from "../hooks/useAuth";
import tw from "../tailwind";
import { keyboardVerticalOffset } from "../constants/Layout";

const AuthScreen = () => {
  const { t } = useTranslation(["auth", "common"]);
  const { signInWithEmail, newUser } = useAuth();
  const { navigate } = useNavigation();
  const { control, handleSubmit } = useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const onSignIn = useCallback(
    handleSubmit(async ({ email, password }) => {
      setLoading(true);
      await signInWithEmail(email, password);
      setLoading(false);
      navigate("Home");
    }),
    [handleSubmit, signInWithEmail, setLoading]
  );

  useEffect(() => {
    if (newUser) {
      navigate("Onboarding");
    }
  }, [newUser]);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <ScrollView contentContainerStyle={tw("justify-evenly h-full mx-5")}>
        <View style={tw("my-6 items-center")}>
          <Text style={[tw("text-lg"), { fontFamily: "poppins-medium" }]}>
            {t("auth:title")}
          </Text>
        </View>
        {Platform.OS === "ios" ? (
          <SocialButton type="Apple" />
        ) : (
          <SocialButton type="Google" />
        )}
        <View style={tw("my-10")}>
          <Text style={tw("my-4 text-xs")}>{t("auth:description")}</Text>
          <TextInput email label="Email" name="email" control={control} />
          <TextInput
            password
            label={t("auth:password")}
            name="password"
            control={control}
          />
        </View>
        <View style={tw("items-center bg-black-background-1 bg-opacity-5")}>
          <Text style={tw("px-4 py-3 text-grey-slate")}>
            {t("auth:disclaimer")}
          </Text>
          <View style={tw("p-2 w-full")}>
            <Button
              title={t("common:submit")}
              loading={loading}
              onPress={onSignIn}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AuthScreen;
