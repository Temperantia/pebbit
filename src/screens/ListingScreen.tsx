import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Text, TouchableOpacity, View } from "react-native";
import tw from "../tailwind";

import { adCollection } from "../firebase";
import ScreenLoading from "../components/ScreenLoading";
import { Ad } from "../types";
import AdList from "../components/AdList";
import CategoryList from "../components/CategoryList";

const ListingScreen = () => {
  const [ads, loading, error] = useCollectionData<Ad>(adCollection);
  return (
    <ScreenLoading loading={loading} error={error}>
      {ads && (
        <View style={tw("items-center justify-center")}>
          <AdList ads={ads}></AdList>
          <AdList ads={ads}></AdList>
          <TouchableOpacity style={tw("my-2")} onPress={() => {}}>
            <Text style={tw("border-2 rounded px-8 py-2 font-bold")}>
              See all
            </Text>
          </TouchableOpacity>
          <Text style={tw("text-2xl mt-2 font-bold")}>Featured Categories</Text>
          <Text style={tw("mt-2 font-bold")}>
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
