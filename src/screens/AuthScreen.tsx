import React, { useCallback, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";

import Button from "../components/core/Button";
import TextInput from "../components/core/TextInput";
import SocialButton from "../components/SocialButton";
import useAuth from "../hooks/useAuth";
import tw from "../tailwind";

const AuthScreen = () => {
  const { signInWithEmail, newUser } = useAuth();
  const { navigate } = useNavigation();
  const { control, handleSubmit } = useForm();
  const onSignIn = useCallback(
    handleSubmit(({ email, password }) => signInWithEmail(email, password)),
    [handleSubmit, signInWithEmail]
  );

  useEffect(() => {
    if (newUser) {
      navigate("Onboarding");
    }
  }, [newUser]);

  return (
    <View style={tw("mx-5")}>
      <View style={tw("my-6 items-center")}>
        <Text style={[tw("text-lg"), { fontFamily: "poppins-medium" }]}>
          Sign in or Create an Account
        </Text>
      </View>
      <View style={tw("my-2")}>
        <SocialButton type="Google"></SocialButton>
      </View>
      <View style={tw("my-10")}>
        <Text style={tw("my-4 text-xs")}>
          Otherwise, enter your email and password to sign in or create an
          account
        </Text>
        <TextInput
          email
          label="Email"
          name="email"
          control={control}
        ></TextInput>
        <TextInput
          password
          label="Password"
          name="password"
          control={control}
        ></TextInput>
      </View>
      <View style={tw("items-center bg-black-background-1 bg-opacity-5")}>
        <Text style={tw("px-4 py-3 text-grey-slate")}>
          By signing up, you agree to our terms of service and privacy policy
        </Text>
        <View style={tw("p-2 w-full")}>
          <Button title="SUBMIT" onPress={onSignIn}></Button>
        </View>
      </View>
    </View>
  );
};

export default AuthScreen;
