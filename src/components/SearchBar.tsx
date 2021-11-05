import React, { useCallback } from "react";
import { Text, View } from "react-native";
import { categories } from "../constants";
import Icon from "./core/Icon";
import Select from "./core/Select";
import TextInput from "./core/TextInput";

import tw from "../tailwind";
import tailwindConfig from "../../tailwind.config";

const SearchBar = ({
  category,
  onSetCategory,
  term,
  onSetTerm,
  onSearch,
}: {
  category: string;
  onSetCategory: (category: string) => void;
  term: string;
  onSetTerm: (term: string) => void;
  onSearch: () => void;
}) => {
  const onRenderButton = useCallback(
    (category) => (
      <View>
        <Icon size={32} name="windows/32/000000/list.png" />
        <Text>{category}</Text>
      </View>
    ),
    [View, Icon, Text]
  );
  const onRenderItem = useCallback(
    (category) => (
      <View>
        <Text>{category}</Text>
      </View>
    ),
    [View, Text]
  );

  return (
    <View style={tw("flex-row items-center")}>
      <View style={tw("flex-grow")}>
        <TextInput
          /* left={
      <View style={tw("w-1/3")}>
        <Select
          data={["All", ...categories]}
          value={category}
          onValue={onSetCategory}
          onRenderButton={onRenderButton}
          onRenderItem={onRenderItem}
        />
      </View>
    } */
          value={term}
          onValue={onSetTerm}
        />
      </View>

      <Icon
        style="px-3 bg-black-background-2 h-full"
        color={tailwindConfig.theme.colors["red-main"]}
        size={32}
        name="small/32/000000/search.png"
        onPress={onSearch}
      />
    </View>
  );
};

export default SearchBar;
