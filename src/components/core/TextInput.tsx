import React, { useCallback } from "react";
import { Control, Controller } from "react-hook-form";
import {
  Button,
  Clipboard,
  Image,
  ImageSourcePropType,
  InputAccessoryView,
  Keyboard,
  Platform,
  Text,
  TextInput as RNTextInput,
  View,
} from "react-native";
import { useTranslation } from "react-i18next";

import tw from "../../tailwind";
import { currencies } from "../../constants";
import Icon from "./Icon";
import tailwindConfig from "../../../tailwind.config";

const TextInput = ({
  style,
  optional,
  email,
  copy,
  password,
  price,
  multiline,
  number,
  label,
  icon,
  height,
  left,
  right,
  value,
  placeholder,
  control,
  name,
  onValue,
}: {
  style?: string;
  optional?: boolean;
  email?: boolean;
  copy?: boolean;
  password?: boolean;
  price?: string;
  number?: boolean;
  multiline?: boolean;
  label?: string;
  icon?: ImageSourcePropType;
  height?: string;
  left?: JSX.Element;
  right?: JSX.Element;
  value?: string;
  placeholder?: string;
  control?: Control<any>;
  name?: string;
  onValue?: (value: string) => void;
}) => {
  const { t } = useTranslation(["errors"]);

  const onDismiss = useCallback(() => {
    Keyboard.dismiss();
  }, [Keyboard]);

  const children = (
    v: string,
    onChange: (text: string) => void,
    error?: any,
    onCopy?: () => void,
    onBlur?: () => void
  ) => (
    <View>
      {label && <Text style={tw("text-grey-slate text-xs")}>{label}</Text>}
      <View
        style={tw(
          "flex-row bg-white border border-grey-slate rounded " +
            (height ?? " h-10 ") +
            (icon || copy || right ? " items-center " : "") +
            (style ?? "") +
            (!left ? " px-4 " : "")
        )}
      >
        {copy && (
          <Icon
            size={28}
            color={tailwindConfig.theme.colors["red-main"]}
            name="small/32/000000/copy.png"
            onPress={onCopy}
          />
        )}
        {icon && <Image style={tw("w-8 h-8 mr-2")} source={icon} />}
        {left}
        <RNTextInput
          keyboardAppearance="dark"
          editable={!copy}
          style={[tw("flex-grow"), { fontFamily: "poppins-medium" }]}
          placeholderTextColor={tailwindConfig.theme.colors["grey-slate"]}
          secureTextEntry={password}
          keyboardType={number ? "numeric" : "default"}
          multiline={multiline}
          placeholder={placeholder}
          value={v}
          onBlur={onBlur ?? (() => {})}
          onChangeText={onChange}
          inputAccessoryViewID="done"
        />
        {right}
      </View>
      {error && <Text style={tw("text-red-main")}>{error.message}</Text>}
      {Platform.OS === "ios" && (
        <InputAccessoryView
          nativeID="done"
          backgroundColor={tailwindConfig.theme.colors["black-background-1"]}
        >
          <Button onPress={onDismiss} title="Done" color="white" />
        </InputAccessoryView>
      )}
    </View>
  );

  return name && control ? (
    <Controller
      name={name}
      defaultValue={value}
      control={control}
      rules={{
        required: optional ? undefined : (t("isRequired") as string),
        pattern: email
          ? {
              value:
                /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
              message: t("invalidEmail"),
            }
          : password
          ? {
              value:
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
              message: t("invalidPassword"),
            }
          : undefined,
        validate: (value) => {
          if (!price) {
            return true;
          }
          value = value.replace(",", ".");
          return isNaN(value) || parseFloat(value) < currencies[price].minimum
            ? t("invalidMinimumPrice") +
                " " +
                currencies[price].minimum +
                " " +
                price
            : true;
        },
      }}
      render={({
        field: { onChange, onBlur, value: fieldValue },
        fieldState: { error },
      }) => {
        const onCopy = useCallback(async () => {
          onChange(await Clipboard.getString());
        }, [onChange, Clipboard]);

        return children(fieldValue, onChange, error, onCopy, onBlur);
      }}
    />
  ) : value !== undefined && onValue ? (
    children(value, onValue)
  ) : (
    <></>
  );
};

export default TextInput;
