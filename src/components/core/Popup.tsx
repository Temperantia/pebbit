import React from "react";
import { Text, View } from "react-native";
import { theme } from "../../../tailwind.config";
import Button from "./Button";
import tw from "../../tailwind";

const Popup = () => {
  return (
    <View style={tw("relative")}>
      <View style={tw("absolute -top-3 right-2")}>
        <View
          style={{
            width: 0,
            height: 0,
            backgroundColor: "transparent",
            borderStyle: "solid",
            borderLeftWidth: 20,
            borderRightWidth: 20,
            borderBottomWidth: 20,
            borderLeftColor: "transparent",
            borderRightColor: "transparent",
            borderBottomColor: theme.colors["black-background-1"],
          }}
        ></View>
      </View>
      <View
        style={{
          backgroundColor: theme.colors["black-background-1"],
          borderRadius: 20,
        }}
      >
        <View>
          <Text style={tw("text-center text-white px-4 py-3")}>
            Hey, Welcome to Pebbit! Let's not waste more time and get you an
            account right away!
          </Text>
          <View style={tw("m-4")}>
            <Button title="Skip" onPress={() => {}} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Popup;
