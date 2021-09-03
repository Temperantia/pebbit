import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Text, TouchableOpacity, View } from "react-native";
import { t } from "react-native-tailwindcss";

import { productCollection } from "../firebase";
import ScreenLoading from "../components/ScreenLoading";
import { Product } from "../types";
import ProductList from "../components/ProductList";
import CategoryList from "../components/CategoryList";

const HomeScreen = () => {
  const [products, loading, error] =
    useCollectionData<Product>(productCollection);
  return (
    <ScreenLoading loading={loading} error={error}>
      {products && (
        <View style={[t.itemsCenter, t.justifyCenter]}>
          <ProductList products={products}></ProductList>
          <ProductList products={products}></ProductList>
          <TouchableOpacity style={[t.mY2]} onPress={() => {}}>
            <Text
              style={[
                t.textBlack,
                t.border2,
                t.rounded,
                t.pX8,
                t.pY2,
                t.fontBold,
              ]}
            >
              See all
            </Text>
          </TouchableOpacity>
          <Text style={[t.text2xl, t.mT2, t.fontBold]}>
            Featured Categories
          </Text>
          <Text style={[t.mT2, t.textGrey, t.fontBold]}>
            Browse through our most popular categories
          </Text>
          <CategoryList
            categories={[
              { name: "Electronics & Computer" },
              { name: "Vehicles" },
              { name: "Home & Garden" },
            ]}
          ></CategoryList>
        </View>
      )}
    </ScreenLoading>
  );
};

export default HomeScreen;
