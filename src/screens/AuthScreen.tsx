import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Text, SafeAreaView, View } from "react-native";
import Button from "../components/core/Button";

import TextInput from "../components/core/TextInput";
import SocialButton from "../components/SocialButton";
import useAuth from "../hooks/useAuth";
import tw from "../tailwind";

const AuthScreen = () => {
  const { signInWithGoogle, signInWithEmail } = useAuth();
  const { control, handleSubmit } = useForm();
  const onSignInWithGoogle = useCallback(signInWithGoogle, [signInWithGoogle]);
  const onSignIn = useCallback(
    handleSubmit(({ email, password }) => signInWithEmail(email, password)),
    [handleSubmit, signInWithEmail]
  );

  return (
    <View style={tw("mx-5")}>
      <View style={tw(" flex-row justify-center")}>
        <Text style={{ fontFamily: "poppins-medium" }}>
          Sign in or Create an Account
        </Text>
      </View>
      <View>
        <SocialButton type="Google"></SocialButton>
      </View>
      <View>
        <Text style={[tw("m-4 text-xs"), { fontFamily: "poppins-medium" }]}>
          Otherwise, enter your email and password to sign in or create an
          account
        </Text>
        <TextInput name="email" control={control}></TextInput>
        <TextInput name="password" control={control}></TextInput>
      </View>
      <View>
        <Button title="SUBMIT" onPress={onSignIn}></Button>
      </View>
    </View>
  );
};

export default AuthScreen;
