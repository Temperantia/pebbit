import React, { useCallback, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";

import tw from "../tailwind";
import MessagingList from "../components/lists/MessagingList";
import BuyingList from "../components/lists/BuyingList";
import SellingList from "../components/lists/SellingList";
import HistoryList from "../components/lists/HistoryList";

const tabs: { [tab: string]: JSX.Element } = {
  selling: <SellingList />,
  buying: <BuyingList />,
  messages: <MessagingList />,
  history: <HistoryList />,
};

const ExchangeScreen = () => {
  const { t } = useTranslation(["navigation"]);
  const [currentTab, setCurrentTab] = useState("selling");

  const onSetCurrentTab = useCallback(
    (tab) => () => {
      setCurrentTab(tab);
    },
    [setCurrentTab]
  );

  return (
    <View style={tw("h-full")}>
      <View style={tw("flex-row justify-evenly my-4")}>
        {Object.keys(tabs).map((tab) => (
          <TouchableOpacity key={tab} onPress={onSetCurrentTab(tab)}>
            <Text
              style={[
                tw(
                  currentTab === tab
                    ? " text-red-main underline"
                    : " text-black"
                ),
                { fontFamily: "poppins-semibold" },
              ]}
            >
              {t("navigation:" + tab)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {tabs[currentTab]}
    </View>
  );
};

export default ExchangeScreen;
