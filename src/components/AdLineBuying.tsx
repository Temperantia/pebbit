import React, { useCallback, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/core";

import { Ad } from "../types";
import tw from "../tailwind";
import { currencies, statusColors } from "../constants";
import Icon from "./core/Icon";
import TextInput from "./core/TextInput";
import Select from "./core/Select";
import AdStatusSent from "./AdStatusSent";
import AdStatusPaid from "./AdStatusPaid";
import AdStatusPay from "./AdStatusPay";
import AdStatusPending from "./AdStatusPending";
import AdStatusReceived from "./AdStatusReceived";
import StatusBanner from "./StatusBanner";

const services = ["Fedex"];

const statusTexts: {
  [status: string]: { title?: string; description: string };
} = {
  new: { description: "Listed" },
  paid: { title: "PAID", description: "Waiting for seller..." },
  sent: { title: "SENT", description: "" },
  received: { title: "RECEIVED", description: "" },
  complete: { title: "SOLD", description: "Sold" },
};

const AdLineBuying = ({ ad }: { ad: Ad }) => {
  const { navigate } = useNavigation();
  const [expanded, setExpanded] = useState(false);
  const picture = ad.pictures.find((picture) => !!picture);
  const [currency, price] = Object.entries(ad.prices)[0];
  const statusColor = statusColors[ad.status] ?? "";
  const statusTextTitle = statusTexts[ad.status]?.title ?? "";
  const statusTextDescription = statusTexts[ad.status]?.description ?? "";

  let statusComponent;
  if (ad.status === "received" || ad.status === "sold") {
    statusComponent = <AdStatusReceived ad={ad} />;
  } else if (ad.status === "sent") {
    statusComponent = <AdStatusSent ad={ad} />;
  } else if (ad.status === "paid") {
    statusComponent = <AdStatusPaid ad={ad} />;
  } else if (ad.status === "pending") {
    statusComponent = <AdStatusPending />;
  } else if (ad.cooldown > Date.now() / 1000) {
    statusComponent = <AdStatusPay ad={ad} />;
  }

  const onExpand = useCallback(() => {
    setExpanded(!expanded);
  }, [setExpanded, expanded]);

  const onClick = useCallback(() => {
    navigate("AdScreen", { id: ad.id });
  }, [navigate]);

  return (
    <View style={tw("my-2")}>
      <TouchableOpacity
        style={tw("flex-row h-20 w-full border border-grey-slate rounded")}
        onPress={onClick}
      >
        {picture && (
          <StatusBanner
            picture={picture}
            text={statusTextTitle}
            color={statusColor}
          />
        )}

        <View style={tw("p-2 w-3/4")}>
          <View style={tw("flex-row justify-between items-start")}>
            <View>
              <Text style={{ fontFamily: "poppins-medium" }}>{ad.title}</Text>
              <Text
                style={tw("text-" + (statusColor ? statusColor : "grey-slate"))}
              >
                {statusTextDescription}
              </Text>
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
      </TouchableOpacity>
      {expanded ? (
        <View>
          {statusComponent}
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

export default AdLineBuying;
