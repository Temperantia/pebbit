import React, { useCallback } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";

import { Ad } from "../../types";
import tw from "../../tailwind";
import useAuth from "../../hooks/useAuth";
import StatusBanner from "../status/StatusBanner";
import CryptoCurrency, { Delta } from "../core/CryptoCurrency";

const AdLineHistory = ({ ad }: { ad: Ad }) => {
  const { t } = useTranslation(["common", "statuses"]);
  const { navigate } = useNavigation();
  const { user } = useAuth();
  const isSeller = user?.id === ad.userId;
  const picture = ad.pictures.find((picture) => !!picture);
  const [currency, price] = Object.entries(ad.prices)[0];
  const statusColor = isSeller ? "blue-main" : "green-main";
  const statusTextTitle = isSeller
    ? t("statuses:complete.history.sold")
    : t("statuses:complete.history.bought");

  const onClick = useCallback(() => {
    navigate("AdScreen", { id: ad.id });
  }, [navigate, ad]);

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
          <CryptoCurrency
            currency={currency}
            text={price.amount.toString()}
            delta={isSeller ? Delta.Positive : Delta.Negative}
          />
          <Text style={tw("text-xs text-grey-slate")}>
            {t("completedOn") + ": "}
            {format(new Date(ad.created.seconds * 1000), "d/M/yy h:m")}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default AdLineHistory;
