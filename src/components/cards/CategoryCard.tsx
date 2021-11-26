import React from "react";
import { Image, Text, View } from "react-native";
import { useTranslation } from "react-i18next";

import tw from "../../tailwind";

const CategoryCard = ({
  category: { name },
}: {
  category: { name: string };
}) => {
  const { t } = useTranslation();
  return (
    <View style={tw("w-48 m-4")}>
      <View style={tw("relative")}>
        <Image
          style={tw("w-full h-48")}
          source={{
            uri: "https://i.pinimg.com/originals/ea/ed/80/eaed80673830c17837c7d8ec798b3da5.jpg",
          }}
        />
        <View
          style={[tw("absolute left-0 w-40 p-2 items-center"), { bottom: 20 }]}
        >
          <Text style={tw("font-bold")}>{name}</Text>
          <Text style={tw("")}>89,343 {t("ads")}</Text>
        </View>
      </View>
    </View>
  );
};

export default CategoryCard;
