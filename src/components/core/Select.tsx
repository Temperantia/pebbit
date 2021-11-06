import React, { useCallback } from "react";
import { Control, Controller } from "react-hook-form";
import { Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";

import tw from "../../tailwind";
import Icon from "./Icon";

const Select = ({
  data,
  style,
  label,
  placeholder,
  control,
  name,
  value,
  onValue,
  onRenderButton,
  onRenderItem,
}: {
  data: string[];
  style?: string;
  label?: string;
  placeholder?: string;
  control?: Control<any>;
  name?: string;
  value?: any;
  onValue?: (value: any) => void;
  onRenderButton: (item: any) => JSX.Element;
  onRenderItem: (item: any) => JSX.Element;
}) => {
  const onRenderCustomizedButtonChild = useCallback(
    (item) => (
      <View style={tw("flex-row items-center justify-between")}>
        {item ? (
          onRenderButton(item)
        ) : (
          <Text style={tw("text-grey-slate")}>{placeholder}</Text>
        )}
        <Icon size={16} name="small/16/000000/expand-arrow.png" />
      </View>
    ),
    [View, tw, Text, placeholder, Icon]
  );

  const children = (
    value: any,
    onChange: (value: any) => void,
    error?: any
  ) => (
    <View>
      {label && <Text style={tw("text-grey-slate text-xs")}>{label}</Text>}
      <SelectDropdown
        defaultValue={value}
        data={data}
        buttonStyle={tw(
          "w-full bg-white border border-grey-slate rounded h-10 " +
            (style ?? "")
        )}
        rowStyle={{}}
        renderCustomizedButtonChild={onRenderCustomizedButtonChild}
        renderCustomizedRowChild={onRenderItem}
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
