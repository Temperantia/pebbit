import React, { useCallback, useState } from "react";
import { Control, Controller } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import tailwindConfig from "../../../tailwind.config";

import tw from "../../tailwind";
import Icon from "./Icon";

const SelectList = ({
  data,
  onChange,
  value,
  onListItem,
}: {
  data: string[];
  onChange: (value: string[]) => void;
  value: string[];
  onListItem: (element: string) => JSX.Element;
}) => {
  const onItemClick = (item: string) =>
    useCallback(() => {
      if (value.find((i: string) => i === item)) {
        onChange(value.filter((i: string) => i !== item));
      } else {
        onChange([...value, item]);
      }
    }, [item, onChange, value]);
  return (
    <View style={tw("w-full justify-center border border-grey-slate")}>
      {data.map((item: string) => {
        const isSelected = value.find((i: string) => i === item);
        return (
          <TouchableOpacity
            key={item}
            style={tw(
              "p-2 flex-row items-center" +
                (isSelected ? " bg-red-main bg-opacity-10" : "")
            )}
            onPress={onItemClick(item)}
          >
            <Icon
              name={
                isSelected
                  ? "small/16/000000/checked-checkbox.png"
                  : "small/16/000000/unchecked-checkbox.png"
              }
              color={
                isSelected ? tailwindConfig.theme.colors["red-main"] : undefined
              }
              size={16}
            />
            {onListItem(item)}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const MultiSelect = ({
  data,
  name,
  placeholder,
  control,
  onListItem,
}: {
  data: string[];
  name: string;
  placeholder: string;
  control: Control<any>;
  onListItem: (element: string) => JSX.Element;
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const toggleVisible = useCallback(() => {
    setVisible(!visible);
  }, [visible, setVisible]);

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        validate: (value: string[]) => {
          return value.length === 0 ? "At least 1 currency" : true;
        },
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <View style={tw("my-2 bg-white")}>
            <TouchableOpacity
              style={tw(
                "w-full flex-row items-center justify-between px-4 border border-grey-slate rounded h-10"
              )}
              onPress={toggleVisible}
            >
              <View>
                {value.length > 0 ? (
                  <View style={tw("flex-row")}>
                    {value.map((item: string) => onListItem(item))}
                  </View>
                ) : (
                  <Text
                    style={[
                      tw("text-grey-slate"),
                      { fontFamily: "poppins-medium" },
                    ]}
                  >
                    {placeholder}
                  </Text>
                )}
              </View>
              <Icon
                size={16}
                name={
                  visible
                    ? "small/16/000000/collapse-arrow.png"
                    : "small/16/000000/expand-arrow.png"
                }
              />
            </TouchableOpacity>
            {visible && (
              <SelectList
                data={data}
                onChange={onChange}
                value={value}
                onListItem={onListItem}
              />
            )}
            {error && <Text style={tw("text-red-main")}>{error.message}</Text>}
          </View>
        );
      }}
    />
  );
};

export default MultiSelect;
