import React, { useCallback } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useTranslation } from "react-i18next";

import { Ad } from "../../types";
import tw from "../../tailwind";
import { statusColors } from "../../constants";
import StatusBanner from "../status/StatusBanner";
import CryptoCurrency from "../core/CryptoCurrency";
import { ellipsis } from "../../utils/string";

const AdLineMessaging = ({
  disabled,
  ad: { id, title, pictures, prices, status },
}: {
  disabled?: boolean;
  ad: Ad;
}) => {
  const { t } = useTranslation(["statuses"]);
  const { navigate } = useNavigation();
  const picture = pictures.find((picture) => !!picture);
  const [currency, price] = Object.entries(prices)[0];
  const statusColor = statusColors[status] ?? "";
  const statusTextTitle = t("statuses:" + status + ".messaging.title") ?? "";
  const statusTextDescription =
    t("statuses:" + status + ".messaging.description") ?? "";

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
          <View style={tw("w-2/5")}>
            <Text style={[tw("text-xs"), { fontFamily: "poppins-medium" }]}>
              {ellipsis(title, 30)}
            </Text>
            <Text
              style={tw(
                "text-xs text-" + (statusColor ? statusColor : "grey-slate")
              )}
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
          style={tw("flex-row h-24 w-full border border-grey-slate rounded")}
        >
          {children}
        </View>
      ) : (
        <TouchableOpacity
          style={tw("flex-row h-24 w-full border border-grey-slate rounded")}
          onPress={onClick}
        >
          {children}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AdLineMessaging;
