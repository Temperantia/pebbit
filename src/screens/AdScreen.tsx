import React, { useCallback, useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useNavigation } from "@react-navigation/core";
import { StackScreenProps } from "@react-navigation/stack";

import tw from "../tailwind";
import Icon from "../components/core/Icon";
import { Ad, ListingParamList } from "../types";
import { timeAgo } from "../utils/time";
import { adCollection } from "../firebase";
import ScreenLoading from "../components/core/ScreenLoading";
import AdStatusBuy from "../components/status/AdStatusBuy";
import AdStatusPay from "../components/status/AdStatusPay";
import AdStatusPending from "../components/status/AdStatusPending";
import AdStatusPaid from "../components/status/AdStatusPaid";
import AdStatusSent from "../components/status/AdStatusSent";
import AdStatusReceived from "../components/status/AdStatusReceived";
import useAuth from "../hooks/useAuth";

const AdScreen = ({
  route: {
    params: { id },
  },
}: StackScreenProps<ListingParamList, "AdScreen">) => {
  const { user } = useAuth();
  const { goBack } = useNavigation();
  const [ad, loading] = useDocumentData<Ad>(adCollection.doc(id), {
    idField: "id",
  });
  const [adStatus, setAdStatus] = useState<JSX.Element | null>(null);

  useEffect(() => {
    if (!ad || !user) {
      return;
    }

    if (user.id === ad.buyer?.userId) {
      if (
        ad.status === "received" ||
        ad.status === "sold" ||
        ad.status === "aborted" ||
        ad.status === "complete"
      ) {
        setAdStatus(<AdStatusReceived amount ad={ad} />);
      } else if (ad.status === "sent") {
        setAdStatus(<AdStatusSent amount ad={ad} />);
      } else if (ad.status === "paid") {
        setAdStatus(<AdStatusPaid amount ad={ad} />);
      } else if (ad.status === "pending") {
        setAdStatus(<AdStatusPending />);
      } else if (ad.cooldown > Date.now() / 1000) {
        setAdStatus(<AdStatusPay ad={ad} />);
      } else {
        setAdStatus(<AdStatusBuy ad={ad} />);
      }
    } else if (user.id !== ad.userId) {
      setAdStatus(<AdStatusBuy ad={ad} />);
    }
  }, [ad, user]);

  const onBack = useCallback(() => {
    goBack();
  }, [goBack]);

  return (
    <ScreenLoading loading={loading}>
      {ad && (
        <ScrollView>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={[tw("my-5 flex-row items-center mx-3")]}
              onPress={onBack}
            >
              <Icon size={16} name="small/16/000000/back.png" />
              <Text
                style={[
                  tw("ml-2 text-red-main"),
                  { fontFamily: "poppins-medium" },
                ]}
              >
                Back to Results
              </Text>
            </TouchableOpacity>
            <Image
              style={tw("h-96")}
              resizeMode="contain"
              source={{ uri: ad.pictures[0] }}
            />
            <View style={tw("p-3")}>
              {ad.pictures.length > 1 && (
                <View style={tw("flex-row w-full justify-between")}>
                  {ad.pictures.map(
                    (picture, index) =>
                      index > 0 && (
                        <View key={index} style={tw("p-1 w-1/5")}>
                          <Image
                            style={tw("h-16")}
                            resizeMode="cover"
                            source={{ uri: picture }}
                          />
                        </View>
                      )
                  )}
                </View>
              )}
              <Text
                style={[tw("text-lg my-3"), { fontFamily: "poppins-semibold" }]}
              >
                {ad.title}
              </Text>
              <Text>{ad.description}</Text>
              <View
                style={tw(
                  "flex-row justify-end border-b border-grey-slate py-4"
                )}
              >
                <Text style={tw("text-grey-slate")}>
                  {timeAgo.format(new Date(ad.created.seconds * 1000))}
                </Text>
              </View>
              {adStatus}
            </View>
          </View>
        </ScrollView>
      )}
    </ScreenLoading>
  );
};

export default AdScreen;
