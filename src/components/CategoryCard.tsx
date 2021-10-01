import React from "react";
import { Image, Text, View } from "react-native";

import tw from "../tailwind";

const CategoryCard = ({
  category: { name },
}: {
  category: { name: string };
}) => {
  return (
    <View style={tw("w-48 m-4")}>
      <View style={tw("relative")}>
        <Image
          style={tw("w-full h-48")}
          source={{
            uri: "https://i.pinimg.com/originals/ea/ed/80/eaed80673830c17837c7d8ec798b3da5.jpg",
          }}
        ></Image>
        <View
          style={[
            tw("absolute left-0 w-40 bg-card p-2 items-center"),
            { bottom: 20 },
          ]}
        >
          <Text style={tw("text-primary font-bold")}>{name}</Text>
          <Text style={tw("text-grey")}>89,343 ads</Text>
        </View>
      </View>
    </View>
  );
};

export default CategoryCard;
