import React from "react";
import { FlatList, ListRenderItem } from "react-native";

import { Ad } from "../types";
import tw from "../tailwind";

const AdList = ({
  ads,
  numColumns,
  renderItem,
}: {
  ads: Ad[];
  numColumns?: number;
  renderItem: ListRenderItem<Ad>;
}) => {
  return (
    <FlatList
      style={tw("w-full")}
      data={ads}
      numColumns={numColumns}
      renderItem={renderItem}
      keyExtractor={({ id }) => id}
    />
  );
};

export default AdList;
