import React from "react";
import { Control, Controller } from "react-hook-form";
import {
  Image,
  ImageSourcePropType,
  Text,
  TextInput as RNTextInput,
  View,
} from "react-native";

import tw from "../../tailwind";
import tailwind from "../../../tailwind.config";

const TextInput = ({
  email,
  password,
  multiline,
  number,
  label,
  icon,
  placeholder,
  control,
  name,
}: {
  email?: boolean;
  password?: boolean;
  number?: boolean;
  multiline?: boolean;
  label?: string;
  icon?: ImageSourcePropType;
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
      pattern: email
        ? {
            value:
              /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
            message: "Invalid",
          }
        : undefined,
      minLength: password
        ? {
            value: 8,
            message: "At least 8 characters",
          }
        : undefined,
    }}
    render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
      <View style={tw("my-2")}>
        {label && <Text style={tw("text-grey-slate text-xs")}>{label}</Text>}
        <View
          style={tw(
            "flex-row px-4 border border-grey-slate rounded" +
              (multiline ? " h-24" : " h-10") +
              (icon ? " items-center" : "")
          )}
        >
          {icon && (
            <Image
              style={tw("w-full mr-2")}
              width={24}
              height={24}
              source={icon}
            ></Image>
          )}
          <RNTextInput
            style={[tw("flex-grow"), { fontFamily: "poppins-medium" }]}
            placeholderTextColor={tailwind.theme.colors["grey-slate"]}
            secureTextEntry={password}
            keyboardType={number ? "number-pad" : "default"}
            multiline={multiline}
            placeholder={placeholder}
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
          ></RNTextInput>
        </View>
        {error && <Text style={tw("text-red-main")}>{error.message}</Text>}
      </View>
    )}
  ></Controller>
);

export default TextInput;
