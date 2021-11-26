import React from "react";
import { FlatList } from "react-native";

import CategoryCard from "../cards/CategoryCard";

const CategoryList = ({ categories }: { categories: any }) => {
  return (
    <FlatList
      data={categories}
      horizontal
      renderItem={({ item }) => <CategoryCard category={item}></CategoryCard>}
      keyExtractor={({ name }) => name}
    />
  );
};

export default CategoryList;
