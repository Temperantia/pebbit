import React, { useCallback, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import tw from "../tailwind";
import MessagingList from "../components/MessagingList";
import BuyingList from "../components/BuyingList";
import SellingList from "../components/SellingList";
import HistoryList from "../components/HistoryList";

const tabs: { [tab: string]: JSX.Element } = {
  Selling: <SellingList />,
  Buying: <BuyingList />,
  Messages: <MessagingList />,
  History: <HistoryList />,
};

const ExchangeScreen = () => {
  const [currentTab, setCurrentTab] = useState("Selling");

  const onSetCurrentTab = useCallback(
    (tab) => () => {
      setCurrentTab(tab);
    },
    [setCurrentTab]
  );

  return (
    <View style={tw("mx-5")}>
      <View style={tw("flex-row justify-evenly my-4")}>
        {Object.keys(tabs).map((tab) => (
          <TouchableOpacity key={tab} onPress={onSetCurrentTab(tab)}>
            <Text
              style={[
                tw(
                  "text-lg" +
                    (currentTab === tab ? " text-red-main underline" : "")
                ),
                { fontFamily: "poppins-semibold" },
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {tabs[currentTab]}
    </View>
  );
};

export default ExchangeScreen;
