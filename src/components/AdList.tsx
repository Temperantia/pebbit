import React from "react";
import { FlatList } from "react-native";

import { Ad } from "../types";
import Card from "./Card";

const AdList = ({ ads }: { ads: Ad[] }) => {
  return (
    <FlatList
      data={ads}
      horizontal
      renderItem={({ item }) => <Card ad={item}></Card>}
      keyExtractor={({ id }) => id}
    ></FlatList>
  );
};

export default AdList;
