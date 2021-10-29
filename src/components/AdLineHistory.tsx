import React, { useCallback, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { format } from "date-fns";

import { Ad } from "../types";
import tw from "../tailwind";
import { currencies } from "../constants";
import useAuth from "../hooks/useAuth";
import StatusBanner from "./StatusBanner";

const services = ["Fedex"];

const AdLineHistory = ({ ad }: { ad: Ad }) => {
  const { navigate } = useNavigation();
  const { user } = useAuth();
  const isSeller = user?.id === ad.userId;
  const picture = ad.pictures.find((picture) => !!picture);
  const [currency, price] = Object.entries(ad.prices)[0];
  const statusColor = isSeller ? "blue-main" : "green-main";
  const statusTextTitle = isSeller ? "SOLD" : "BOUGHT";

  const onClick = useCallback(() => {
    navigate("AdScreen", { id: ad.id });
  }, [navigate]);

  return (
    <View style={tw("my-2")}>
      <TouchableOpacity
        style={tw("flex-row h-20 w-full border border-grey-slate rounded")}
        onPress={onClick}
      >
        {picture && (
          <StatusBanner
            picture={picture}
            text={statusTextTitle}
            color={statusColor}
          />
        )}

        <View style={tw("w-3/4 p-2")}>
          <Text style={{ fontFamily: "poppins-medium" }}>{ad.title}</Text>
          <View style={tw("flex-row items-center")}>
            <Image
              style={tw("w-6 h-6 mr-2")}
              source={currencies[currency].image}
            ></Image>
            <Text
              style={[
                tw(
                  "text-xl" + (isSeller ? " text-green-main" : " text-red-main")
                ),
                { fontFamily: "poppins-semibold" },
              ]}
            >
              {(isSeller ? "+" : "-") +
                price.amount +
                " " +
                currencies[currency].symbol}
            </Text>
          </View>
          <Text style={tw("text-xs text-grey-slate")}>
            Completed on:{" "}
            {format(new Date(ad.created.seconds * 1000), "d/M/yy h:m")}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default AdLineHistory;
