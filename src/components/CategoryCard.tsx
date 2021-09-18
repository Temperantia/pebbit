import React from "react";
import { Image, Text, View } from "react-native";
import { t } from "react-native-tailwindcss";

const CategoryCard = ({
  category: { name },
}: {
  category: { name: string };
}) => {
  return (
    <View style={[t.w48, t.m4, t.shadowXl]}>
      <View style={[t.relative]}>
        <Image
          style={[t.wFull, t.h48]}
          source={{
            uri: "https://i.pinimg.com/originals/ea/ed/80/eaed80673830c17837c7d8ec798b3da5.jpg",
          }}
        ></Image>
        <View
          style={[
            t.absolute,
            t.left0,
            t.w40,
            t.bgCard,
            t.p2,
            t.itemsCenter,
            { bottom: 20 },
          ]}
        >
          <Text style={[t.textPrimary, t.fontBold]}>{name}</Text>
          <Text style={[t.textGrey]}>89,343ads</Text>
        </View>
      </View>
    </View>
  );
};

export default CategoryCard;
