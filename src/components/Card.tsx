import React from "react";
import { Image, Text, View } from "react-native";

import { Ad } from "../types";
import tw from "../tailwind";

const Card = ({ ad: { title } }: { ad: Ad }) => {
  return (
    <View style={tw("w-48 h-40 m-4")}>
      <View style={tw("relative")}>
        <Image
          style={tw("w-full h-32")}
          source={{
            uri: "https://i.pinimg.com/originals/ea/ed/80/eaed80673830c17837c7d8ec798b3da5.jpg",
          }}
        ></Image>
        <Text style={[tw("absolute left-0 text-white p-2"), { bottom: 20 }]}>
          2093 EUR
        </Text>
      </View>
      <View style={tw("p-2")}>
        <Text style={[]}>{title}</Text>
        <Text style={tw("")}>{title}</Text>
      </View>
    </View>
  );
};

export default Card;
