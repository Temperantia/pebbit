import React from "react";
import { FlatList } from "react-native";

import { Product } from "../types";
import Card from "./Card";

const ProductList = ({ products }: { products: Product[] }) => {
  return (
    <FlatList
      data={products}
      horizontal
      renderItem={({ item }) => <Card product={item}></Card>}
      keyExtractor={({ id }) => id}
    ></FlatList>
  );
};

export default ProductList;
