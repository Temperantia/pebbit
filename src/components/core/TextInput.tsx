import React from "react";
import { Control, Controller } from "react-hook-form";
import { TextInput as RNTextInput, View } from "react-native";

const TextInput = ({
  height,
  multiline,
  number,
  placeholder,
  control,
  name,
  value,
  onChange,
}: {
  height?: number;
  number?: boolean;
  multiline?: boolean;
  placeholder?: string;
  control?: Control<any>;
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
}) => {
  return control && name ? (
    <View
      style={{
        flexDirection: "row",
        borderWidth: 1,
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 5,
        marginVertical: 10,
        borderColor: "grey",
      }}
    >
      <Controller
        name={name}
        defaultValue=""
        control={control}
        rules={{
          required: true,
        }}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <RNTextInput
            keyboardType={number ? "number-pad" : "default"}
            multiline={multiline}
            style={{
              flex: 1,
              backgroundColor: "transparent",
              height,
              marginVertical: 5,
              borderColor: "white",
              borderBottomWidth: 0,
            }}
            placeholder={placeholder}
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
          ></RNTextInput>
        )}
      ></Controller>
    </View>
  ) : (
    <RNTextInput
      style={{
        width: "100%",
        height,
        marginVertical: 5,
        backgroundColor: "transparent",
      }}
      value={value}
      onChangeText={(newValue) => {
        onChange?.(newValue);
      }}
    ></RNTextInput>
  );
};

export default TextInput;
