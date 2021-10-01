import React, { useCallback } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/core";
import { useRecoilValue } from "recoil";

import { tokenState } from "../atoms";
import { auth, productCollection } from "../firebase";
import useAuth from "../hooks/useAuth";

const CreateAdScreen = () => {
  const { control, handleSubmit, reset } = useForm();
  const { token } = useAuth();

  const onSubmit = useCallback(
    handleSubmit(async ({ name }) => {
      await productCollection.add({ name });
      reset();
    }),
    [handleSubmit, productCollection]
  );

  const onBuy = useCallback(async () => {
    const currency = "btc";
    const product = "UowXDil964nlELDJBftj";
    const t = await auth.currentUser.getIdToken(true);

    console.log(token);

    try {
      const result = await fetch(
        "https://us-central1-crypto-2293c.cloudfunctions.net/buy?id=" +
          product +
          "&currency=" +
          currency +
          "&token=" +
          token,
        {
          headers: {
            Authorization: `Bearer ${t}`,
          },
        }
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
      alert(error.message);
    }
  }, [auth, fetch, token, alert]);

  const onConfirm = useCallback(async () => {
    const order = "UowXDil964nlELDJBftj";
    const t = await auth.currentUser.getIdToken(true);

    try {
      const result = await fetch(
        "https://us-central1-crypto-2293c.cloudfunctions.net/confirm?id=" +
          order,
        {
          headers: {
            Authorization: `Bearer ${t}`,
          },
        }
      );
      if (!result.ok) {
        throw Error("Something wrong happened");
      }
    } catch (error) {
      alert(error.message);
    }
  }, [auth, fetch, token, alert]);

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
      <Button title="Confirm" onPress={onConfirm}></Button>
    </View>
  );
};

export default CreateAdScreen;
