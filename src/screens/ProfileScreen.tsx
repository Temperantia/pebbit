import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import tailwindConfig from "../../tailwind.config";
import Icon from "../components/core/Icon";
import CryptoCurrency from "../components/CryptoCurrency";
import useAuth from "../hooks/useAuth";
import tw from "../tailwind";

const ProfileScreen = () => {
  const { user } = useAuth();
  const rates: number[] = (user?.sellingList ?? [])
    .filter(({ rate }) => !!rate)
    .map(({ rate }) => rate) as number[];
  const rate =
    rates.length > 0
      ? Math.round(rates.reduce((sum, value) => sum + value, 0) / rates.length)
      : null;

  const history = user?.history ?? [];
  const recentTransactions = [];
  for (let index = 0; index < 4 && index < history.length; index++) {
    recentTransactions.push(history[index]);
  }

  return (
    <View>
      <View style={tw("p-5 border-b border-grey-slate")}>
        <Text style={tw("text-4xl")}>{user?.username}</Text>
        {rate && (
          <View style={tw("flex-row")}>
            {[...Array(5).keys()].map((_value, index) => (
              <Icon
                key={index}
                size={20}
                color={tailwindConfig.theme.colors["gold-badge"]}
                name={
                  "small/32/000000/star" +
                  (rate > index ? "-filled" : "") +
                  ".png"
                }
              />
            ))}
            <Text>({rates.length})</Text>
          </View>
        )}
      </View>
      <View style={tw("p-5 items-center")}>
        <Text>Recent Transactions</Text>
        {recentTransactions.map(({ id, pictures, title, userId, prices }) => {
          const isSeller = userId === user?.id;
          const picture = pictures.find((picture) => !!picture);
          const [currency, price] = Object.entries(prices)[0];
          return (
            <TouchableOpacity style={tw("flex-row my-4")} key={id}>
              <Image
                style={tw("w-full h-32")}
                source={{
                  uri: picture,
                }}
              />
              <View>
                <Text>{title}</Text>
                <Text>{isSeller ? "Sold" : "Bought"}</Text>
              </View>
              <CryptoCurrency
                currency={currency}
                text={price.amount.toString()}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default ProfileScreen;
