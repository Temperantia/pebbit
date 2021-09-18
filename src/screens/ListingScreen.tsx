import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Text, TouchableOpacity, View } from "react-native";
import { t } from "react-native-tailwindcss";
import tw from "../tailwind";

import { productCollection } from "../firebase";
import ScreenLoading from "../components/ScreenLoading";
import { Product } from "../types";
import ProductList from "../components/ProductList";
import CategoryList from "../components/CategoryList";

const ListingScreen = () => {
  const [products, loading, error] =
    useCollectionData<Product>(productCollection);
  return (
    <ScreenLoading loading={loading} error={error}>
      {products && (
        <View style={tw("items-center justify-center")}>
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
          <Text style={tw("text-2xl mt-2 font-bold text-primary")}>
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

export default ListingScreen;
