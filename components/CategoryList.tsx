import React from "react";
import { FlatList } from "react-native";

import CategoryCard from "./CategoryCard";

const ProductList = ({ categories }: { categories: any }) => {
  return (
    <FlatList
      data={categories}
      horizontal
      renderItem={({ item }) => <CategoryCard category={item}></CategoryCard>}
      keyExtractor={({ id }) => id}
    ></FlatList>
  );
};

export default ProductList;
