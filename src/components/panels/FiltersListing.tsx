import React, { useCallback } from "react";
import { Text, ScrollView, View, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";

import tailwindConfig from "../../../tailwind.config";
import { categories, countries, currencies } from "../../constants";
import Icon from "../core/Icon";
import Select from "../core/Select";
import tw from "../../tailwind";
import { useRecoilState } from "recoil";
import { openedFiltersState } from "../../atoms";
import CryptoCurrency from "../core/CryptoCurrency";

const FiltersListing = ({
  category,
  location,
  currency,
  order,
  setCategory,
  setLocation,
  setCurrency,
  setOrder,
}: {
  category: string;
  location: string;
  currency: string;
  order: string;
  setCategory: (category: string) => void;
  setLocation: (location: string) => void;
  setCurrency: (currency: string) => void;
  setOrder: (order: string) => void;
}) => {
  const { t } = useTranslation(["common"]);
  const [openedFilters, setOpenedFilters] = useRecoilState(openedFiltersState);

  const onCloseFilters = useCallback(() => {
    setOpenedFilters(false);
  }, [setOpenedFilters]);

  const onSetCategory = useCallback(
    (category: string) => () => {
      setCategory(category);
    },
    [setCategory]
  );

  const onRenderCurrencyButton = useCallback(
    (currency) => <CryptoCurrency raw currency={currency} text={currency} />,
    [CryptoCurrency]
  );

  const onRenderCurrencyItem = useCallback(
    (currency) => <CryptoCurrency raw currency={currency} text={currency} />,
    [CryptoCurrency]
  );

  return openedFilters ? (
    <ScrollView
      contentContainerStyle={tw("p-4")}
      style={tw("w-4/5 bg-white absolute top-0 bottom-0 right-0")}
    >
      <View style={tw("flex-row justify-between border-b border-grey-slate")}>
        <Text style={{ fontFamily: "poppins-semibold" }}>Filter & Refine</Text>
        <TouchableOpacity onPress={onCloseFilters}>
          <Icon
            color={tailwindConfig.theme.colors["red-main"]}
            size={20}
            name={"small/36/000000/delete-sign.png"}
          />
        </TouchableOpacity>
      </View>
      <View style={tw("py-2 border-b border-grey-slate")}>
        <Text style={[tw("py-1"), { fontFamily: "poppins-semibold" }]}>
          {t("common:category")}
        </Text>
        <TouchableOpacity
          style={tw(
            "p-1 " + ("All" === category ? "bg-red-main bg-opacity-30" : "")
          )}
          onPress={onSetCategory("All")}
        >
          <Text>{t("common:all")}</Text>
        </TouchableOpacity>
        {categories.map((c) => (
          <TouchableOpacity
            key={c}
            style={tw(
              "px-1 " + (c === category ? "bg-red-main bg-opacity-30" : "")
            )}
            onPress={onSetCategory(c)}
          >
            <Text>{c}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={tw("py-2 border-b border-grey-slate")}>
        <Text style={[tw("py-1"), { fontFamily: "poppins-semibold" }]}>
          {t("common:location")}
        </Text>
        <Select
          style="border-red-main"
          data={[t("common:all"), ...countries]}
          value={location}
          onValue={setLocation}
        />
      </View>
      <View style={tw("py-2 border-b border-grey-slate")}>
        <Text style={[tw("py-1"), { fontFamily: "poppins-semibold" }]}>
          {t("common:currency")}
        </Text>
        <Select
          style="border-red-main"
          data={[t("common:all"), ...Object.keys(currencies)]}
          value={currency}
          onValue={setCurrency}
          onRenderButton={onRenderCurrencyButton}
          onRenderItem={onRenderCurrencyItem}
        />
      </View>
      <View style={tw("py-2")}>
        <Text style={[tw("py-1"), { fontFamily: "poppins-semibold" }]}>
          {t("common:dateListed")}
        </Text>
        <Select
          style="border-red-main"
          data={[t("common:newestFirst"), t("common:oldestFirst")]}
          value={order}
          onValue={setOrder}
        />
      </View>
    </ScrollView>
  ) : (
    <></>
  );
};

export default FiltersListing;
