import React from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

import tw from "../../tailwind";

const AdStatusUnauthenticated = () => {
  const { t } = useTranslation(["auth"]);

  return (
    <View style={tw("my-2")}>
      <Text>{t("signInRequest")}</Text>
    </View>
  );
};

export default AdStatusUnauthenticated;
