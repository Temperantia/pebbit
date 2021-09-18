import React, { useCallback, useEffect } from "react";
import { Button, Platform, Text, TextInput, View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/core";
import firebase from "firebase";
import * as Notifications from "expo-notifications";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import * as GoogleAuthentication from "expo-google-app-auth";

import { tokenState } from "../atoms";
import { auth, productCollection } from "../firebase";

const CreateAdScreen = () => {
  const { control, handleSubmit, reset } = useForm();
  const [token, setToken] = useRecoilState(tokenState);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log(user);
    });
  }, []);

  const onSubmit = useCallback(
    handleSubmit(async ({ name }) => {
      Notifications.scheduleNotificationAsync({
        content: {
          title: "You've got mail! 📬",
          body: "Here is the notification body",
          data: { data: "goes here" },
        },
        trigger: { seconds: 2 },
      });
      return;
      await productCollection.add({ name });
      reset();
    }),
    [handleSubmit, productCollection]
  );

  const registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    const data = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(data);
    setToken(data);

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
  };

  const onBuy = useCallback(async () => {
    const currency = "btc";
    const product = "UowXDil964nlELDJBftj";

    try {
      const result = await fetch(
        "https://us-central1-crypto-2293c.cloudfunctions.net/buy?id=" +
          product +
          "&currency=" +
          currency +
          "&token=" +
          token
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
      console.log(error.message);
    }
  }, [fetch, token]);

  return (
    <View>
      <Controller
        control={control}
        rules={{ required: true }}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <View>
            <TextInput
              placeholder="Name"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            ></TextInput>
            {error && <Text>Required</Text>}
          </View>
        )}
        name="name"
      ></Controller>
      <Button title="Add Product" onPress={onSubmit}></Button>
      <Button title="Buy" onPress={onBuy}></Button>
      <Button
        title="Google"
        onPress={async () => {
          const result = await GoogleAuthentication.logInAsync({
            androidClientId:
              "876715407348-atebc1ufg3vjuf794gg4i5jl7p47mdae.apps.googleusercontent.com",
            iosClientId:
              "876715407348-e3i42a85ib2d18peimbjppfchj83pjru.apps.googleusercontent.com",
            iosStandaloneAppClientId:
              "876715407348-2uon6puq90m7b5as4nffa7e6nbpqkofk.apps.googleusercontent.com",

            scopes: ["profile", "email"],
          });
          if (result.type === "success") {
            const { idToken, accessToken } = result;
            const credential = firebase.auth.GoogleAuthProvider.credential(
              idToken,
              accessToken
            );

            const res = await auth.signInWithCredential(credential);
            console.log(res);

            await registerForPushNotificationsAsync();
          }
        }}
      ></Button>
    </View>
  );
};

export default CreateAdScreen;
