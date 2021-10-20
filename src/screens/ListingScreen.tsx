import React, { useCallback, useMemo, useState } from "react";
import { useCollectionDataOnce } from "react-firebase-hooks/firestore";
import { Text, View } from "react-native";

import tw from "../tailwind";
import { adCollection } from "../firebase";
import ScreenLoading from "../components/ScreenLoading";
import { Ad } from "../types";
import AdList from "../components/AdList";
import useAuth from "../hooks/useAuth";
import AdPreview from "../components/AdPreview";

const ListingScreen = () => {
  const { user } = useAuth();
  const [now] = useState<number>(Math.round(Date.now() / 1000));
  const [ads, loading, error] = useCollectionDataOnce<Ad>(
    adCollection.where("status", "==", "new").where("cooldown", "<", now),
    { idField: "id" }
  );

  const adsFiltered = useMemo(() => {
    if (!ads) {
      return [];
    }
    return ads.filter(({ userId }) => userId !== user?.id);
  }, [ads]);

  const onRenderItem = useCallback(
    ({ item }) => <AdPreview ad={item}></AdPreview>,
    [AdPreview]
  );

  return (
    <ScreenLoading loading={loading} error={error}>
      {ads && (
        <View style={tw("px-3 py-1 justify-center")}>
          <Text>{adsFiltered.length} Results</Text>
          <AdList
            ads={adsFiltered}
            numColumns={2}
            renderItem={onRenderItem}
          ></AdList>
        </View>
      )}
    </ScreenLoading>
  );
};

export default ListingScreen;
