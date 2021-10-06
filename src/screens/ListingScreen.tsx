import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { View } from "react-native";

import tw from "../tailwind";
import { adCollection } from "../firebase";
import ScreenLoading from "../components/ScreenLoading";
import { Ad } from "../types";
import AdList from "../components/AdList";

const ListingScreen = () => {
  const [ads, loading, error] = useCollectionData<Ad>(adCollection);
  return (
    <ScreenLoading loading={loading} error={error}>
      {ads && (
        <View style={tw("items-center justify-center")}>
          <AdList ads={ads}></AdList>
        </View>
      )}
    </ScreenLoading>
  );
};

export default ListingScreen;
