import React, { useCallback, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { Ad } from "../types";
import tw from "../tailwind";
import { currencies } from "../constants";
import Icon from "./core/Icon";
import TextInput from "./core/TextInput";
import Select from "./core/Select";
import { useForm } from "react-hook-form";

const services = ["Fedex"];

const AdLineSelling = ({
  ad: { title, pictures, prices, status },
}: {
  ad: Ad;
}) => {
  const [expanded, setExpanded] = useState(false);
  const { control } = useForm();
  const picture = pictures.find((picture) => !!picture);
  const [currency, price] = Object.entries(prices)[0];

  const onExpand = useCallback(() => {
    setExpanded(!expanded);
  }, [setExpanded, expanded]);

  return (
    <View style={tw("my-2")}>
      <View style={tw("flex-row h-20 w-full border border-grey-slate rounded")}>
        <View style={tw("w-1/4 relative")}>
          <Image
            style={tw("h-full")}
            source={{
              uri: picture,
            }}
          ></Image>
          <View style={tw("absolute bg-green-main h-full")}>
            <View style={tw("justify-center h-full")}>
              <Text
                style={[
                  tw("text-white"),
                  {
                    fontFamily: "poppins-medium",
                  },
                  {
                    transform: [{ rotate: "270deg" }],
                  },
                ]}
              >
                {status.toUpperCase()}
              </Text>
            </View>
          </View>
        </View>

        <View style={tw("p-2 w-3/4")}>
          <View style={tw("flex-row justify-between")}>
            <View>
              <Text style={{ fontFamily: "poppins-medium" }}>{title}</Text>
              <Text style={tw("text-green-main")}>{status}</Text>
            </View>
            <View style={tw("flex-row items-center")}>
              <Image
                style={tw("w-6 h-6 mr-2")}
                source={currencies[currency].image}
              ></Image>
              <Text style={[{ fontFamily: "poppins-semibold" }]}>
                {price.amount + " " + currencies[currency].symbol}
              </Text>
            </View>
          </View>
        </View>
      </View>
      {expanded ? (
        <View>
          <Select
            data={services}
            label="Shipping service"
            name="service"
            control={control}
          />
          <TouchableOpacity
            style={tw(
              "py-2 flex-row items-center justify-center border rounded border-grey-slate"
            )}
            onPress={onExpand}
          >
            <Icon size={12} name="small/8/000000/collapse-arrow.png" />
            <Text style={[tw("ml-2"), { fontFamily: "poppins-medium" }]}>
              Collapse Details
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={tw(
            "py-2 flex-row items-center justify-center border rounded border-grey-slate"
          )}
          onPress={onExpand}
        >
          <Icon size={12} name="small/8/000000/expand-arrow.png" />
          <Text style={[tw("ml-2"), { fontFamily: "poppins-medium" }]}>
            Expand Details
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AdLineSelling;
