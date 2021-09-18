import React from "react";
import { Image, Text, View } from "react-native";
import { t } from "react-native-tailwindcss";

import { Product } from "../types";

const Card = ({ product: { name } }: { product: Product }) => {
  return (
    <View style={[t.w48, t.h40, t.m4, t.shadowXl]}>
      <View style={[t.relative]}>
        <Image
          style={[t.wFull, t.h32]}
          source={{
            uri: "https://i.pinimg.com/originals/ea/ed/80/eaed80673830c17837c7d8ec798b3da5.jpg",
          }}
        ></Image>
        <Text
          style={[
            t.absolute,
            t.left0,
            t.textWhite,
            t.bgCard,
            t.p2,
            { bottom: 20 },
          ]}
        >
          2093 EUR
        </Text>
      </View>
      <View style={[t.p2]}>
        <Text style={[]}>{name}</Text>
        <Text style={[t.textGrey]}>{name}</Text>
      </View>
    </View>
  );
};

export default Card;
