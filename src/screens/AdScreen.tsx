import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useTranslation } from "react-i18next";
import { StackScreenProps } from "@react-navigation/stack";

import tw from "../tailwind";
import Icon from "../components/core/Icon";
import { Ad, ListingParamList, User } from "../types";
import { timeAgo } from "../utils/time";
import { adCollection, userCollection } from "../firebase";
import ScreenLoading from "../components/core/ScreenLoading";
import AdStatusBuy from "../components/status/AdStatusBuy";
import AdStatusPay from "../components/status/AdStatusPay";
import AdStatusPending from "../components/status/AdStatusPending";
import AdStatusPaid from "../components/status/AdStatusPaid";
import AdStatusSent from "../components/status/AdStatusSent";
import AdStatusReceived from "../components/status/AdStatusReceived";
import useAuth from "../hooks/useAuth";
import AdStatusUnauthenticated from "../components/status/AdStatusUnauthenticated";
import tailwindConfig from "../../tailwind.config";
import BackArrow from "../components/core/BackArrow";

const AdScreen = ({
  route: {
    params: { id },
  },
}: StackScreenProps<ListingParamList, "AdScreen">) => {
  const { t } = useTranslation(["navigation"]);
  const { user } = useAuth();
  const [ad, loading] = useDocumentData<Ad>(adCollection.doc(id), {
    idField: "id",
  });
  const [adStatus, setAdStatus] = useState<JSX.Element | null>(null);
  const [seller, setSeller] = useState<User | null>(null);

  useEffect(() => {
    if (!ad) {
      return;
    }

    if (!user) {
      setAdStatus(<AdStatusUnauthenticated />);
      return;
    }

    getSeller(ad);

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

  const getSeller = async (ad: Ad) => {
    const data = (await userCollection.doc(ad.userId).get()).data();
    if (!data) {
      return;
    }
    const ads = Object.entries(data.ads).map(([id, ad]) => ({
      ...ad,
      id,
    }));
    data.sellingList = ads.filter(({ userId }) => userId === data.id);
    data.rates = (data.sellingList ?? [])
      .filter(({ rate }) => !!rate)
      .map(({ rate }) => rate) as number[];
    data.rate =
      data.rates.length > 0
        ? Math.round(
            data.rates.reduce((sum, value) => sum + value, 0) /
              data.rates.length
          )
        : null;
    setSeller(data);
  };

  return (
    <ScreenLoading loading={loading}>
      {ad && (
        <ScrollView>
          <View style={{ flex: 1 }}>
            <BackArrow label={t("navigation:backToResults")} />
            <Image
              style={tw("h-32")}
              resizeMode="cover"
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
              <View>
                <Text
                  style={[
                    tw("text-base my-3"),
                    { fontFamily: "poppins-semibold" },
                  ]}
                >
                  About Seller
                </Text>
                <Text style={tw("text-xl")}>{seller?.username}</Text>
                {seller && (
                  <View style={tw("flex-row py-1")}>
                    {[...Array(5).keys()].map((_value, index) => (
                      <Icon
                        key={index}
                        size={20}
                        color={tailwindConfig.theme.colors["gold-badge"]}
                        name={
                          "small/32/000000/star" +
                          (seller.rate && seller.rate > index
                            ? "-filled"
                            : "") +
                          ".png"
                        }
                      />
                    ))}
                    <Text>({seller.rates?.length})</Text>
                  </View>
                )}
              </View>
              <View style={tw("border border-grey-slate p-2")}>{adStatus}</View>
            </View>
          </View>
        </ScrollView>
      )}
    </ScreenLoading>
  );
};

export default AdScreen;
