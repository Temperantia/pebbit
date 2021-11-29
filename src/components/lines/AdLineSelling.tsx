import React, { useCallback, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/core";
import { useTranslation } from "react-i18next";

import { Ad } from "../../types";
import tw from "../../tailwind";
import { statusColors } from "../../constants";
import Icon from "../core/Icon";
import TextInput from "../core/TextInput";
import { request } from "../../firebase";
import StatusBanner from "../status/StatusBanner";
import tailwindConfig from "../../../tailwind.config";
import CryptoCurrency from "../core/CryptoCurrency";

const AdLineSelling = ({
  ad: { id, title, pictures, prices, status, buyer },
}: {
  ad: Ad;
}) => {
  const { t } = useTranslation(["common", "statuses", "shipping"]);
  const { navigate } = useNavigation();
  const [expanded, setExpanded] = useState(false);
  const { control, watch } = useForm();
  const info = watch();
  const picture = pictures.find((picture) => !!picture);
  const [currency, price] = Object.entries(prices)[0];
  const statusColor = statusColors[status] ?? "";
  const statusTextTitle = t("statuses:" + status + ".buying.title");
  const statusTextDescription = t("statuses:" + status + ".buying.description");

  const onExpand = useCallback(() => {
    setExpanded(!expanded);
  }, [setExpanded, expanded]);

  const onClick = useCallback(() => {
    navigate("AdScreen", { id });
  }, [navigate, id]);

  useEffect(() => {
    if (status === "paid" && info.service && info.number) {
      request(
        "send?ad=" + id + "&service=" + info.service + "&number=" + info.number
      );
    }
  }, [status, info]);

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
              <Text style={{ fontFamily: "poppins-medium" }}>{title}</Text>
              <Text
                style={tw("text-" + (statusColor ? statusColor : "grey-slate"))}
              >
                {statusTextDescription}
              </Text>
            </View>
            <CryptoCurrency
              currency={currency}
              text={price.amount.toString()}
            />
          </View>
        </View>
      </TouchableOpacity>
      {status === "paid" &&
        (expanded ? (
          <View>
            <Text>Ship to:</Text>
            <View style={tw("flex-row")}>
              <Icon
                size={24}
                color={tailwindConfig.theme.colors["red-main"]}
                name="small/24/000000/user.png"
              />
              <Text style={tw("ml-2")}>{buyer.address.name}</Text>
            </View>
            <View style={tw("flex-row")}>
              <Icon
                size={24}
                color={tailwindConfig.theme.colors["red-main"]}
                name="small/24/000000/map.png"
              />
              <Text style={tw("ml-2")}>
                {[
                  buyer.address.street,
                  buyer.address.city,
                  buyer.address.country,
                ].join(" ")}
              </Text>
            </View>
            <TextInput
              label={t("shipping:service")}
              control={control}
              name="service"
            />
            {!!info.service && (
              <TextInput
                copy
                label={t("shipping:trackingNumber")}
                control={control}
                name="number"
              />
            )}
            <TouchableOpacity
              style={tw(
                "py-2 flex-row items-center justify-center border rounded border-grey-slate"
              )}
              onPress={onExpand}
            >
              <Icon size={12} name="small/8/000000/collapse-arrow.png" />
              <Text style={[tw("ml-2"), { fontFamily: "poppins-medium" }]}>
                {t("common:accordionCollapse")}
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
              {t("common:accordionExpand")}
            </Text>
          </TouchableOpacity>
        ))}
    </View>
  );
};

export default AdLineSelling;
