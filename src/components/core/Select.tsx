import React, { Ref, useCallback } from "react";
import { Control, Controller } from "react-hook-form";
import { Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { useTranslation } from "react-i18next";

import tw from "../../tailwind";
import Icon from "./Icon";
import { categories, countries } from "../../constants";

const Select = ({
  category,
  country,
  order,
  data,
  style,
  label,
  placeholder,
  control,
  innerRef,
  name,
  value,
  onValue,
  onRenderButton,
  onRenderItem,
}: {
  category?: boolean;
  country?: boolean;
  order?: boolean;
  data: string[];
  style?: string;
  label?: string;
  placeholder?: string;
  control?: Control<any>;
  innerRef?: Ref<any>;
  name?: string;
  value?: any;
  onValue?: (value: any) => void;
  onRenderButton?: (item: any) => JSX.Element;
  onRenderItem?: (item: any) => JSX.Element;
}) => {
  const {
    t,
    i18n: { resolvedLanguage },
  } = useTranslation(["common"]);

  const onRenderCustomizedButtonChild = useCallback(
    (item) => {
      return (
        <View style={tw("flex-row items-center justify-between")}>
          {item && onRenderButton ? (
            onRenderButton(item)
          ) : item ? (
            <Text style={tw("text-black")}>
              {item === "All"
                ? t("common:all")
                : category
                ? categories[item][resolvedLanguage]
                : country
                ? countries[item][resolvedLanguage]
                : order
                ? t("common:" + item)
                : item}
            </Text>
          ) : (
            <Text style={tw("text-grey-slate")}>{placeholder}</Text>
          )}
          <Icon size={16} name="small/16/000000/expand-arrow.png" />
        </View>
      );
    },
    [View, tw, Text, placeholder, Icon, onRenderButton, t]
  );

  const onRenderItemDefault = useCallback(
    (item) => (
      <Text>
        {item === "All"
          ? t("common:all")
          : category
          ? categories[item][resolvedLanguage]
          : country
          ? countries[item][resolvedLanguage]
          : item === "newestFirst"
          ? t("common:newestFirst")
          : item === "oldestFirst"
          ? t("common:oldestFirst")
          : item}
      </Text>
    ),
    [Text, t]
  );

  const children = (
    value: any,
    onChange: (value: any) => void,
    error?: any
  ) => (
    <View>
      {label && <Text style={tw("text-grey-slate text-xs")}>{label}</Text>}
      <SelectDropdown
        ref={innerRef}
        defaultValue={value}
        data={data}
        buttonStyle={tw(
          "w-full bg-white border border-grey-slate rounded h-10 " +
            (style ?? "")
        )}
        rowStyle={{}}
        renderCustomizedButtonChild={onRenderCustomizedButtonChild}
        renderCustomizedRowChild={onRenderItem ?? onRenderItemDefault}
        onSelect={(selectedItem, index) => {
          onChange(selectedItem);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item;
        }}
      />
      {error && <Text style={tw("text-red-main")}>{error.message}</Text>}
    </View>
  );
  return name && control ? (
    <Controller
      name={name}
      control={control}
      rules={{
        required: "Is required",
      }}
      render={({ field: { value, onChange }, fieldState: { error } }) =>
        children(value, onChange, error)
      }
    />
  ) : value !== undefined && onValue ? (
    children(value, onValue)
  ) : (
    <></>
  );
};

export default Select;
