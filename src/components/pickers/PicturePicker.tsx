import React, { useCallback } from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import { Control, Controller } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import { useTranslation } from "react-i18next";

import tailwindConfig from "../../../tailwind.config";
import Icon from "../core/Icon";
import tw from "../../tailwind";

const PicturePicker = ({ control }: { control: Control<any> }) => {
  const { t } = useTranslation(["errors"]);
  const onPickPicture = useCallback(
    (index: number, pictures: any[], onChange: (pictures: any) => void) =>
      async () => {
        const permissionResult =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
          alert(t("errors:cameraPermission"));
          return;
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [5, 2],
          quality: 0.5,
        });
        if (pickerResult.cancelled === true) {
          return;
        }

        pictures[index] = pickerResult.uri;

        onChange(pictures);
      },
    [ImagePicker, alert, t]
  );

  return (
    <Controller
      name="pictures"
      control={control}
      rules={{
        validate: (value: string[]) => {
          return value.filter((picture) => !!picture).length === 0
            ? (t("errors:noPictureSelected") as string)
            : true;
        },
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View style={tw("flex-row flex-wrap justify-center")}>
          {value.map((picture: string, index: number) => (
            <TouchableOpacity
              style={tw(
                "w-24 h-24 mr-3 mb-3 border border-grey-slate flex-row justify-center items-center"
              )}
              key={index}
              onPress={onPickPicture(index, value, onChange)}
            >
              {picture ? (
                <Image
                  style={tw("w-24 h-24")}
                  resizeMode="cover"
                  source={{ uri: picture }}
                />
              ) : (
                <Icon
                  size={36}
                  name="small/32/000000/plus-math.png"
                  color={tailwindConfig.theme.colors["grey-slate"]}
                />
              )}
            </TouchableOpacity>
          ))}
          {error && (
            <View style={tw("w-full")}>
              <Text style={tw("text-red-main")}>{error.message}</Text>
            </View>
          )}
        </View>
      )}
    ></Controller>
  );
};

export default PicturePicker;
