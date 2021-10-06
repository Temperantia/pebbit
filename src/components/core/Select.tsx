import React from "react";
import { Control, Controller } from "react-hook-form";
import { Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";

import tw from "../../tailwind";
import Icon from "./Icon";

const Select = ({
  data,
  label,
  placeholder,
  control,
  name,
}: {
  data: string[];
  label?: string;
  placeholder?: string;
  control: Control<any>;
  name: string;
}) => (
  <Controller
    name={name}
    defaultValue=""
    control={control}
    rules={{
      required: "Is required",
    }}
    render={({ field: { onChange }, fieldState: { error } }) => (
      <View style={tw("my-2")}>
        {label && <Text style={tw("text-grey-slate text-xs")}>{label}</Text>}
        <SelectDropdown
          data={data}
          buttonStyle={tw("w-full border border-grey-slate rounded h-10")}
          rowStyle={{}}
          renderCustomizedButtonChild={(item) => (
            <View style={tw("flex-row items-center justify-between")}>
              <Text style={tw(item ? "" : "text-grey-slate")}>
                {item ?? placeholder}
              </Text>
              <Icon size={16} name="small/16/000000/expand-arrow.png"></Icon>
            </View>
          )}
          renderCustomizedRowChild={(item) => <Text>{item}</Text>}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
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
    )}
  ></Controller>
);

export default Select;
