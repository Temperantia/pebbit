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
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Icon from "../components/core/Icon";
import tailwindConfig from "../../tailwind.config";
import { categories, currencies } from "../constants";
import TextInput from "../components/core/TextInput";
import Select from "../components/core/Select";
import SearchBar from "../components/SearchBar";
import CryptoCurrency from "../components/CryptoCurrency";

const ListingScreen = () => {
  const { user } = useAuth();
  const [now] = useState<number>(Math.round(Date.now() / 1000));
  const [filtersOpened, setFiltersOpened] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("All");
  //const [term, setTerm] = useState<string | null>(null);
  const [locationInput, setLocationInput] = useState<string>("");
  const [location, setLocation] = useState<string>(user?.address.country ?? "");
  const [currency, setCurrency] = useState<string>("All");
  const [order, setOrder] = useState<string>("Newest first");

  const [searchCategory, setSearchCategory] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const adCollectionFiltered = useMemo(() => {
    let collection = adCollection.where("status", "==", "new");
    //.where("location", "==", location);

    if (category !== "All") {
      collection = collection.where("category", "==", category);
    }

    if (currency !== "All") {
      collection = collection.where("currencies", "array-contains", currency);
    }
    return collection.orderBy(
      "created",
      order === "Newest first" ? "desc" : "asc"
    );
  }, [location, currency, category, order]);

  const [ads, loading, error] = useCollectionDataOnce<Ad>(
    adCollectionFiltered,
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

  /* const onSearch = useCallback(() => {
    setCategory(searchCategory);
    setTerm(searchTerm);
  }, [setCategory, searchCategory, setTerm, searchTerm]); */

  const onRenderAdLine = useCallback(
    ({ item }) => <AdPreview ad={item} />,
    [AdPreview]
  );

  const onOpenFilters = useCallback(() => {
    setFiltersOpened(true);
  }, [setFiltersOpened]);

  const onCloseFilters = useCallback(() => {
    setFiltersOpened(false);
  }, [setFiltersOpened]);

  const onSetCategory = useCallback(
    (category: string) => () => {
      setCategory(category);
    },
    [setCategory]
  );

  const onEndEditingLocation = useCallback(() => {
    setLocation(locationInput);
  }, [setLocation, locationInput]);

  const onRenderCurrencyButton = useCallback(
    (currency) => <CryptoCurrency raw currency={currency} text={currency} />,
    [CryptoCurrency]
  );

  const onRenderCurrencyItem = useCallback(
    (currency) => <CryptoCurrency raw currency={currency} text={currency} />,
    [CryptoCurrency]
  );

  const onRenderOrderButton = useCallback(
    (order) => <Text>{order}</Text>,
    [Text]
  );

  const onRenderOrderItem = useCallback(
    (order) => <Text>{order}</Text>,
    [Text]
  );

  return (
    <ScreenLoading loading={loading} error={error}>
      {ads && (
        <View>
          {/* <View style={tw("px-4 py-2 bg-grey-slate")}>
            <SearchBar
              category={searchCategory}
              onSetCategory={setSearchCategory}
              term={searchTerm}
              onSetTerm={setSearchTerm}
              onSearch={onSearch}
            />
          </View> */}
          <View style={tw("relative")}>
            <View style={tw("px-3 py-1 justify-center")}>
              <Text>
                {adsFiltered.length} Results:{" "}
                <Text style={{ fontFamily: "poppins-semibold" }}>
                  {category}
                </Text>{" "}
                {/* in {location} */}
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
                    <Text>Filter</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <AdList
                ads={adsFiltered}
                numColumns={2}
                renderItem={onRenderAdLine}
              />
            </View>
            {filtersOpened && (
              <ScrollView style={tw("absolute right-0 w-4/5 bg-white p-4")}>
                <View
                  style={tw(
                    "pb-4 flex-row justify-between border-b border-grey-slate"
                  )}
                >
                  <Text style={{ fontFamily: "poppins-semibold" }}>
                    Filter & Refine
                  </Text>
                  <TouchableOpacity onPress={onCloseFilters}>
                    <Icon
                      color={tailwindConfig.theme.colors["red-main"]}
                      size={20}
                      name={"small/36/000000/delete-sign.png"}
                    />
                  </TouchableOpacity>
                </View>
                <View style={tw("py-2 border-b border-grey-slate")}>
                  <Text
                    style={[tw("py-1"), { fontFamily: "poppins-semibold" }]}
                  >
                    Category
                  </Text>
                  <TouchableOpacity
                    style={tw(
                      "p-1 " +
                        ("All" === category ? "bg-red-main bg-opacity-30" : "")
                    )}
                    onPress={onSetCategory("All")}
                  >
                    <Text>All</Text>
                  </TouchableOpacity>
                  {categories.map((c) => (
                    <TouchableOpacity
                      key={c}
                      style={tw(
                        "px-1 " +
                          (c === category ? "bg-red-main bg-opacity-30" : "")
                      )}
                      onPress={onSetCategory(c)}
                    >
                      <Text>{c}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                {/*  <View style={tw("py-2 border-b border-grey-slate")}>
                  <Text
                    style={[tw("py-1"), { fontFamily: "poppins-semibold" }]}
                  >
                    Location
                  </Text>
                  <TextInput
                    style="border border-red-main"
                    placeholder="Leave blank for device location"
                    value={locationInput}
                    onValue={setLocationInput}
                    onEndEditing={onEndEditingLocation}
                  />
                </View> */}
                <View style={tw("py-2 border-b border-grey-slate")}>
                  <Text
                    style={[tw("py-1"), { fontFamily: "poppins-semibold" }]}
                  >
                    Currency
                  </Text>
                  <Select
                    style="border-red-main"
                    data={["All", ...Object.keys(currencies)]}
                    value={currency}
                    onValue={setCurrency}
                    onRenderButton={onRenderCurrencyButton}
                    onRenderItem={onRenderCurrencyItem}
                  />
                </View>
                <View style={tw("py-2")}>
                  <Text
                    style={[tw("py-1"), { fontFamily: "poppins-semibold" }]}
                  >
                    Date Listed
                  </Text>
                  <Select
                    style="border-red-main"
                    data={["Newest first", "Oldest first"]}
                    value={order}
                    onValue={setOrder}
                    onRenderButton={onRenderOrderButton}
                    onRenderItem={onRenderOrderItem}
                  />
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      )}
    </ScreenLoading>
  );
};

export default ListingScreen;
