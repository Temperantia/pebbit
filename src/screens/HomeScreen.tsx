import React, { useCallback, useMemo } from "react";
import { useCollectionDataOnce } from "react-firebase-hooks/firestore";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/core";

import { adCollection } from "../firebase";
import ScreenLoading from "../components/core/ScreenLoading";
import { Ad } from "../types";
import CategoryList from "../components/lists/CategoryList";
import tw from "../tailwind";
import AdPreview from "../components/cards/AdPreview";
import useAuth from "../hooks/useAuth";

const HomeScreen = () => {
  const now = Math.round(Date.now() / 1000);
  const { user } = useAuth();
  const { navigate } = useNavigation();
  const [ads, loading, error] = useCollectionDataOnce<Ad>(
    adCollection
      .where("status", "==", "new")
      .orderBy("created", "desc")
      .limit(4),
    { idField: "id" }
  );

  const adsFiltered = useMemo(() => {
    if (!ads) {
      return [];
    }
    return ads.filter(
      ({ userId, cooldown }) => userId !== user?.id && cooldown < now
    );
  }, [ads]);

  const onSeeAll = useCallback(() => {
    navigate("Listing");
  }, [navigate]);

  return (
    <ScreenLoading loading={loading} error={error}>
      {ads && (
        <ScrollView>
          <Text style={tw("text-center underline my-4 text-red-main")}>
            Recently Posted
          </Text>
          <View style={tw("flex-row flex-wrap")}>
            {adsFiltered.map((ad) => (
              <AdPreview key={ad.id} ad={ad} />
            ))}
          </View>
          <View style={tw("items-center")}>
            <TouchableOpacity
              style={tw("border border-black rounded px-8 py-2")}
              onPress={onSeeAll}
            >
              <Text>See all</Text>
            </TouchableOpacity>
            {/*  <Text style={[tw("text-xl mt-2"), { fontFamily: "poppins-bold" }]}>
              Featured Categories
            </Text>
            <Text style={tw("mt-2 text-grey-slate")}>
              Browse through our most popular categories
            </Text> */}
          </View>
          {/* <CategoryList
            categories={[
              { name: "Electronics & Computer" },
              { name: "Vehicles" },
              { name: "Home & Garden" },
            ]}
          /> */}
        </ScrollView>
      )}
    </ScreenLoading>
  );
};

export default HomeScreen;
