import React, { useCallback, useMemo } from "react";
import { useCollectionDataOnce } from "react-firebase-hooks/firestore";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useTranslation } from "react-i18next";

import { adCollection } from "../firebase";
import ScreenLoading from "../components/core/ScreenLoading";
import { Ad } from "../types";
import CategoryList from "../components/lists/CategoryList";
import tw from "../tailwind";
import AdPreview from "../components/cards/AdPreview";
import useAuth from "../hooks/useAuth";
import Popup from "../components/core/Popup";

const HomeScreen = () => {
  const { t } = useTranslation(["home", "onboarding"]);
  const now = Math.round(Date.now() / 1000);
  const { user } = useAuth();
  const { navigate } = useNavigation();
  const [ads, loading, error] = useCollectionDataOnce<Ad>(
    adCollection
      .where("status", "==", "new")
      .where("userId", "!=", user?.id ?? "")
      .orderBy("userId", "asc")
      .orderBy("created", "desc")
      .limit(4),
    { idField: "id" }
  );

  const adsFiltered = useMemo(() => {
    if (!ads) {
      return [];
    }
    return ads.filter(({ cooldown }) => cooldown < now);
  }, [ads]);

  const onSeeAll = useCallback(() => {
    navigate("Listing");
  }, [navigate]);

  return (
    <ScreenLoading loading={loading} error={error}>
      {ads && (
        <ScrollView contentContainerStyle={tw("h-full")}>
          <Text style={tw("text-center underline my-4 text-red-main")}>
            {t("home:recentlyPosted")}
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
              <Text> {t("home:seeAll")}</Text>
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
          <View
            style={{
              position: "absolute",
              width: "50%",
              top: 15,
              right: 5,
            }}
          >
            <Popup type="welcome" point="top-right" />
          </View>
          <View
            style={{
              position: "absolute",
              width: "50%",
              bottom: 15,
              right: 50,
            }}
          >
            <Popup type="sell" point="bottom" />
          </View>
        </ScrollView>
      )}
    </ScreenLoading>
  );
};

export default HomeScreen;
