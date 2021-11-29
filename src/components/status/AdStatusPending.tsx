import React from "react";
import { Text, View } from "react-native";
import { useTranslation } from "react-i18next";

import tw from "../../tailwind";
import Icon from "../core/Icon";
import tailwindConfig from "../../../tailwind.config";

const AdStatusPending = () => {
  const { t } = useTranslation(["adBuying"]);
  return (
    <View style={tw("my-2")}>
      <Text>{t("adBuying:pendingPayment")}</Text>
      <View style={tw("items-center mt-3 mb-1")}>
        <Icon
          size={64}
          color={tailwindConfig.theme.colors["red-main"]}
          name="small/64/000000/wait.png"
        />
      </View>
      <Text style={tw("text-lg text-center mb-1")}>
        {t("adBuying:pendingWait")}
      </Text>
      <Text style={tw("text-xs text-center text-grey-slate")}>
        {t("adBuying:processTime")}
      </Text>
    </View>
  );
};

export default AdStatusPending;
