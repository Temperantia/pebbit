import React, { useCallback } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/core";

import { Ad } from "../types";
import tw from "../tailwind";
import { statusColors } from "../constants";
import StatusBanner from "./StatusBanner";
import CryptoCurrency from "./CryptoCurrency";

const statusTexts: {
  [status: string]: { title?: string; description: string };
} = {
  new: { description: "Listed" },
  paid: { title: "PAID", description: "Waiting for seller..." },
  sent: { title: "SENT", description: "Waiting for buyer..." },
  received: { title: "RECEIVED", description: "" },
  complete: { title: "SOLD", description: "Sold" },
};

const AdLineMessaging = ({
  disabled,
  ad: { id, title, pictures, prices, status },
}: {
  disabled?: boolean;
  ad: Ad;
}) => {
  const { navigate } = useNavigation();
  const picture = pictures.find((picture) => !!picture);
  const [currency, price] = Object.entries(prices)[0];
  const statusColor = statusColors[status] ?? "";
  const statusTextTitle = statusTexts[status]?.title ?? "";
  const statusTextDescription = statusTexts[status]?.description ?? "";

  const onClick = useCallback(() => {
    navigate("MessagesScreen", { id });
  }, [navigate, id]);

  const children = (
    <>
      {picture && (
        <StatusBanner
          picture={picture}
          text={statusTextTitle}
          color={statusColor}
        />
      )}

      <View style={tw("p-2 w-3/4")}>
        <View style={tw("flex-row justify-between items-start")}>
          <View>
            <Text style={{ fontFamily: "poppins-medium" }}>{title}</Text>
            <Text
              style={tw("text-" + (statusColor ? statusColor : "grey-slate"))}
            >
              {statusTextDescription}
            </Text>
          </View>
          <CryptoCurrency currency={currency} text={price.amount.toString()} />
        </View>
      </View>
    </>
  );

  return (
    <View style={tw("my-2")}>
      {disabled ? (
        <View
          style={tw("flex-row h-20 w-full border border-grey-slate rounded")}
        >
          {children}
        </View>
      ) : (
        <TouchableOpacity
          style={tw("flex-row h-20 w-full border border-grey-slate rounded")}
          onPress={onClick}
        >
          {children}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AdLineMessaging;
