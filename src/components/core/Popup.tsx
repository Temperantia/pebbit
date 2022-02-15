import React, { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { theme } from "../../../tailwind.config";
import Button from "./Button";
import tw from "../../tailwind";
import { t } from "i18next";

const Popup = ({ type, point }: { type: string; point: string }) => {
  const [seen, setSeen] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      setSeen(await AsyncStorage.getItem(type));
    };
    fetch();
  }, [type]);

  const onSkip = useCallback(async () => {
    await AsyncStorage.setItem(type, "seen");
    setSeen("seen");
  }, [AsyncStorage, setSeen, type]);

  return seen ? (
    <></>
  ) : (
    <View style={tw("relative")}>
      <View
        style={tw(
          "absolute" +
            (point === "top-right" ? " -top-3 right-2" : " -bottom-3 left-20")
        )}
      >
        <View
          style={[
            {
              width: 0,
              height: 0,
              backgroundColor: "transparent",
              borderStyle: "solid",
              borderLeftWidth: 20,
              borderRightWidth: 20,
              borderLeftColor: "transparent",
              borderRightColor: "transparent",
            },
            point === "top-right"
              ? {
                  borderBottomColor: theme.colors["black-background-1"],
                  borderBottomWidth: 20,
                }
              : {
                  borderTopColor: theme.colors["black-background-1"],
                  borderTopWidth: 20,
                },
          ]}
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
            {t("onboarding:" + type + ".title")}
          </Text>
          <Text style={tw("text-center text-white px-4 py-3")}>
            {t("onboarding:" + type + ".description")}
          </Text>
          <View style={tw("m-4 items-center")}>
            <Button onboarding title={t("onboarding:skip")} onPress={onSkip} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Popup;
