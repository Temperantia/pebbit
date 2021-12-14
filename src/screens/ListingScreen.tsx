import React, { useCallback, useMemo, useState } from "react";
import { useCollectionDataOnce } from "react-firebase-hooks/firestore";
import { Text, TouchableOpacity, View } from "react-native";
import { useSetRecoilState } from "recoil";
import { useTranslation } from "react-i18next";

import tw from "../tailwind";
import { adCollection } from "../firebase";
import ScreenLoading from "../components/core/ScreenLoading";
import { Ad } from "../types";
import AdList from "../components/lists/AdList";
import useAuth from "../hooks/useAuth";
import AdPreview from "../components/cards/AdPreview";
import Icon from "../components/core/Icon";
import tailwindConfig from "../../tailwind.config";
import { openedFiltersState } from "../atoms";
import FiltersListing from "../components/panels/FiltersListing";

const ListingScreen = () => {
  const { t } = useTranslation(["listing"]);
  const { user } = useAuth();
  const setOpenedFilters = useSetRecoilState(openedFiltersState);
  const [now] = useState<number>(Math.round(Date.now() / 1000));
  const [category, setCategory] = useState<string>("All");
  const [location, setLocation] = useState<string>("All");
  const [currency, setCurrency] = useState<string>("All");
  const [order, setOrder] = useState<string>("newestFirst");

  const adCollectionFiltered = useMemo(() => {
    let collection = adCollection
      .where("status", "==", "new")
      .where("userId", "!=", user?.id ?? "");

    if (category !== "All") {
      collection = collection.where("category", "==", category);
    }

    if (location !== "All") {
      collection = collection.where("location", "==", location);
    }

    if (currency !== "All") {
      collection = collection.where("currencies", "array-contains", currency);
    }
    return collection
      .orderBy("userId", "asc")
      .orderBy("created", order === "newestFirst" ? "desc" : "asc");
  }, [user, location, currency, category, order]);

  const [ads, loading, error] = useCollectionDataOnce<Ad>(
    adCollectionFiltered,
    { idField: "id" }
  );

  const adsFiltered = useMemo(() => {
    if (!ads) {
      return [];
    }
    return ads.filter(({ cooldown }) => cooldown < now);
  }, [ads]);

  /* const onSearch = useCallback(() => {
    setCategory(searchCategory);
    setTerm(searchTerm);
  }, [setCategory, searchCategory, setTerm, searchTerm]); */

  const onRenderAdLine = useCallback(
    ({ item }) => <AdPreview ad={item} />,
    [AdPreview]
  );

  const onOpenFilters = useCallback(() => {
    setOpenedFilters(true);
  }, [setOpenedFilters]);

  return (
    <ScreenLoading loading={loading} error={error}>
      {ads && (
        <View style={tw("h-full")}>
          {/* <View style={tw("px-4 py-2 bg-grey-slate")}>
            <SearchBar
              category={searchCategory}
              onSetCategory={setSearchCategory}
              term={searchTerm}
              onSetTerm={setSearchTerm}
              onSearch={onSearch}
            />
          </View> */}
          <View style={tw("relative h-full")}>
            <View>
              <View style={[tw("px-3 py-1"), { height: "10%" }]}>
                <Text>
                  {adsFiltered.length + " " + t("listing:results") + ": "}
                  <Text style={{ fontFamily: "poppins-semibold" }}>
                    {category === "All" ? t("common:all") : category}
                  </Text>
                  {" - "}
                  {location === "All" ? t("common:all") : location}
                </Text>
                <View style={tw("flex-row justify-end")}>
                  <TouchableOpacity
                    style={tw("border border-red-main p-1")}
                    onPress={onOpenFilters}
                  >
                    <View style={tw("flex-row items-center")}>
                      <Icon
                        color={tailwindConfig.theme.colors["red-main"]}
                        size={16}
                        name="small/16/000000/filter.png"
                      />
                      <Text>{t("listing:filter")}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ height: "90%" }}>
                <AdList
                  ads={adsFiltered}
                  numColumns={2}
                  renderItem={onRenderAdLine}
                />
              </View>
            </View>
            <FiltersListing
              category={category}
              location={location}
              currency={currency}
              order={order}
              setCategory={setCategory}
              setLocation={setLocation}
              setCurrency={setCurrency}
              setOrder={setOrder}
            />
          </View>
        </View>
      )}
    </ScreenLoading>
  );
};

export default ListingScreen;
