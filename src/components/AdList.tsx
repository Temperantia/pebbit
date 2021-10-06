import React from "react";
import { FlatList } from "react-native";

import { Ad } from "../types";
import AdPreview from "./AdPreview";

const AdList = ({ ads }: { ads: Ad[] }) => {
  return (
    <FlatList
      data={ads}
      numColumns={2}
      renderItem={({ item }) => <AdPreview ad={item}></AdPreview>}
      keyExtractor={({ id }) => id}
    ></FlatList>
  );
};

export default AdList;
