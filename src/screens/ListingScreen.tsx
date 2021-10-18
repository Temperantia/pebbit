import React, { useState } from "react";
import { useCollectionDataOnce } from "react-firebase-hooks/firestore";
import { View } from "react-native";

import tw from "../tailwind";
import { adCollection } from "../firebase";
import ScreenLoading from "../components/ScreenLoading";
import { Ad } from "../types";
import AdList from "../components/AdList";

const ListingScreen = () => {
  const [now] = useState<number>(Math.round(Date.now() / 1000));
  const [ads, loading, error] = useCollectionDataOnce<Ad>(
    adCollection.where("status", "==", "new").where("cooldown", "<", now),
    { idField: "id" }
  );
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
