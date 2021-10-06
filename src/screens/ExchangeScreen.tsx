import React, { useCallback } from "react";
import { Button, ScrollView, Text, View } from "react-native";
import { useForm } from "react-hook-form";

import { auth, adCollection } from "../firebase";
import useAuth from "../hooks/useAuth";
import TextInput from "../components/core/TextInput";
import Select from "../components/core/Select";
import tw from "../tailwind";
import { categories } from "../constants";

const ExchangeScreen = () => {
  return (
    <ScrollView style={tw("mx-5")}>
      <View style={tw("flex-row justify-center my-4")}>
        <Text style={[tw("text-xl"), { fontFamily: "poppins-semibold" }]}>
          Post an Ad
        </Text>
      </View>
      <Text style={[tw("text-lg"), { fontFamily: "poppins-semibold" }]}>
        Ad Details
      </Text>
    </ScrollView>
  );
};

export default ExchangeScreen;
