import React, { useCallback, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useTranslation } from "react-i18next";

import { Ad } from "../../types";
import tw from "../../tailwind";
import { statusColors } from "../../constants";
import Icon from "../core/Icon";
import AdStatusSent from "../status/AdStatusSent";
import AdStatusPaid from "../status/AdStatusPaid";
import AdStatusPay from "../status/AdStatusPay";
import AdStatusPending from "../status/AdStatusPending";
import AdStatusReceived from "../status/AdStatusReceived";
import CryptoCurrency from "../core/CryptoCurrency";
import { ellipsis } from "../../utils/string";

const AdLineBuying = ({ ad }: { ad: Ad }) => {
  const { t } = useTranslation(["common", "statuses"]);
  const { navigate } = useNavigation();
  const [expanded, setExpanded] = useState(false);
  const picture = ad.pictures.find((picture) => !!picture);
  const [currency, price] = Object.entries(ad.prices)[0];
  const statusColor = statusColors[ad.status] ?? "";
  const statusTextTitle = t("statuses:" + ad.status + ".buying.title");
  const statusTextDescription = t(
    "statuses:" + ad.status + ".buying.description"
  );

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
  }, [navigate, ad]);

  return (
    <View style={tw("my-2")}>
      <TouchableOpacity
        style={tw("flex-row h-24 w-full border border-grey-slate rounded")}
        onPress={onClick}
      >
        {picture && (
          <Image
            style={tw("w-1/4 h-full")}
            source={{
              uri: picture,
            }}
          />
        )}

        <View style={tw("p-2 w-3/4")}>
          <View style={tw("flex h-full justify-between items-start")}>
            <Text style={[tw("text-xs"), { fontFamily: "poppins-medium" }]}>
              {ellipsis(ad.title, 30)}
            </Text>
            <CryptoCurrency
              currency={currency}
              text={price?.amount?.toString()}
            />
            <Text
              style={tw(
                "text-xs text-" + (statusColor ? statusColor : "grey-slate")
              )}
            >
              {statusTextDescription}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      {ad.status === "sent" &&
        (expanded ? (
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
                {t("accordionCollapse")}
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
              {t("accordionExpand")}
            </Text>
          </TouchableOpacity>
        ))}
    </View>
  );
};

export default AdLineBuying;
