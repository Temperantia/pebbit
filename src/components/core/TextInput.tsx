import React, { useCallback } from "react";
import { Control, Controller } from "react-hook-form";
import {
  Clipboard,
  Image,
  ImageSourcePropType,
  Text,
  TextInput as RNTextInput,
  View,
} from "react-native";

import tw from "../../tailwind";
import tailwind from "../../../tailwind.config";
import { currencies } from "../../constants";
import Icon from "./Icon";
import tailwindConfig from "../../../tailwind.config";

const TextInput = ({
  email,
  copy,
  password,
  price,
  multiline,
  number,
  label,
  icon,
  placeholder,
  control,
  name,
}: {
  email?: boolean;
  copy?: boolean;
  password?: boolean;
  price?: string;
  number?: boolean;
  multiline?: boolean;
  label?: string;
  icon?: ImageSourcePropType;
  placeholder?: string;
  control: Control<any>;
  name: string;
}) => {
  return (
    <Controller
      name={name}
      defaultValue=""
      control={control}
      rules={{
        required: "Is required",
        pattern: email
          ? {
              value:
                /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
              message: "Invalid",
            }
          : password
          ? {
              value:
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
              message:
                "Your password must contain at least 8 characters, one letter, one number and one special character",
            }
          : undefined,
        validate: (value) => {
          if (!price) {
            return true;
          }
          return isNaN(value) || parseFloat(value) < currencies[price].minimum
            ? "Price must be at least " +
                currencies[price].minimum +
                " " +
                price
            : true;
        },
      }}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => {
        const onCopy = useCallback(async () => {
          onChange(await Clipboard.getString());
        }, [onChange, Clipboard]);

        return (
          <View style={tw("my-2")}>
            {label && (
              <Text style={tw("text-grey-slate text-xs")}>{label}</Text>
            )}
            <View
              style={tw(
                "flex-row px-4 border border-grey-slate rounded" +
                  (multiline ? " h-24" : " h-10") +
                  (icon || copy ? " items-center" : "")
              )}
            >
              {copy && (
                <Icon
                  size={28}
                  color={tailwindConfig.theme.colors["red-main"]}
                  name="small/32/000000/copy.png"
                  onPress={onCopy}
                ></Icon>
              )}
              {icon && <Image style={tw("w-8 h-8 mr-2")} source={icon}></Image>}
              <RNTextInput
                editable={!copy}
                style={[tw("flex-grow"), { fontFamily: "poppins-medium" }]}
                placeholderTextColor={tailwind.theme.colors["grey-slate"]}
                secureTextEntry={password}
                keyboardType={number ? "numeric" : "default"}
                multiline={multiline}
                placeholder={placeholder}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              ></RNTextInput>
            </View>
            {error && <Text style={tw("text-red-main")}>{error.message}</Text>}
          </View>
        );
      }}
    ></Controller>
  );
};

export default TextInput;
