import React from "react";
import { FlatList, ListRenderItem, Text, View } from "react-native";
import { useTranslation } from "react-i18next";

import { Ad } from "../../types";
import tw from "../../tailwind";

const AdList = ({
  ads,
  numColumns,
  renderItem,
}: {
  ads: Ad[];
  numColumns?: number;
  renderItem: ListRenderItem<Ad>;
}) => {
  const { t } = useTranslation(["common"]);

  return ads.length === 0 ? (
    <View style={tw("items-center")}>
      <Text>{t("common:noAdsYet")}</Text>
    </View>
  ) : (
    <FlatList
      data={ads}
      numColumns={numColumns}
      renderItem={renderItem}
      keyExtractor={({ id }) => id}
    />
  );
};

export default AdList;
