import React from "react";
import { FlatList, ListRenderItem, Text, View } from "react-native";

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
  return ads.length === 0 ? (
    <View style={tw("items-center")}>
      <Text>No ads here yet!</Text>
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
