/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Image } from "react-native";
import { SvgXml } from "react-native-svg";
import { useSetRecoilState } from "recoil";

import HomeScreen from "../screens/HomeScreen";
import CreateAdScreen from "../screens/CreateAdScreen";
import {
  BottomTabParamList,
  ExchangeParamList,
  HomeParamList,
  ListingParamList,
} from "../types";
import ListingScreen from "../screens/ListingScreen";
import AdScreen from "../screens/AdScreen";
import ExchangeScreen from "../screens/ExchangeScreen";
import MessagesScreen from "../screens/MessagesScreen";
import { openedFiltersState } from "../atoms";
import useAuth from "../hooks/useAuth";
import { t } from "i18next";

const postAdSvg = `<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 24.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 115.3 145.5" style="enable-background:new 0 0 115.3 145.5;" xml:space="preserve">
<path d="M61.5,107.7c0.7,0,1.3-0.6,1.3-1.3V84.9h21.6c0.7,0,1.3-0.6,1.3-1.3V73.1c0-0.7-0.6-1.3-1.3-1.3H62.8V50.3
	c0-0.7-0.6-1.3-1.3-1.3H51c-0.7,0-1.3,0.6-1.3,1.3v21.5H28.2c-0.7,0-1.3,0.6-1.3,1.3v10.5c0,0.7,0.6,1.3,1.3,1.3h21.5v21.5
	c0,0.7,0.6,1.3,1.3,1.3H61.5z"/>
<path d="M113.6,28.3L84.6,1.4C83.6,0.5,82.3,0,81,0H8.1C3.6,0,0,3.6,0,8.1v129.2c0,4.5,3.6,8.1,8.1,8.1h99.1c4.5,0,8.1-3.6,8.1-8.1
	V32.1C115.3,30.7,114.7,29.3,113.6,28.3z M83.7,7.9l25.9,24H86.5c-1.5,0-2.8-1.2-2.8-2.8V7.9z M110,137.4c0,1.5-1.2,2.8-2.8,2.8H8.1
	c-1.5,0-2.8-1.2-2.8-2.8V8.1c0-1.5,1.2-2.8,2.8-2.8h70.3v23.8c0,4.5,3.6,8.1,8.1,8.1H110V137.4z"/>
</svg>
`;

const BottomTab = createBottomTabNavigator<BottomTabParamList>();
const BottomTabNavigator = () => {
  const { user } = useAuth();
  const setOpenedFilters = useSetRecoilState(openedFiltersState);

  const listeners = {
    tabPress: () => {
      setOpenedFilters(false);
    },
  };
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        style: { display: user ? "flex" : "none" },
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              name="material-outlined/48/000000/home--v2.png"
              color={color}
            />
          ),
          tabBarLabel: t("navigation:home"),
        }}
        listeners={listeners}
      />
      <BottomTab.Screen
        name="Listing"
        component={ListingNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="windows/48/000000/list.png" color={color} />
          ),
          tabBarLabel: t("navigation:browse"),
        }}
      />
      <BottomTab.Screen
        name="CreateAd"
        component={CreateAdScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <SvgXml width={30} height={30} xml={postAdSvg} fill={color} />
          ),
          tabBarLabel: t("navigation:post"),
        }}
        listeners={listeners}
      />
      <BottomTab.Screen
        name="Exchange"
        component={ExchangeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              name="small/64/000000/transfer-between-users.png"
              color={color}
            />
          ),
          tabBarLabel: t("navigation:exchanges"),
        }}
        listeners={listeners}
      />
    </BottomTab.Navigator>
  );
};
// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
const TabBarIcon = ({ name, color }: { name: string; color: string }) => {
  return (
    <Image
      style={{ width: 36, height: 36, tintColor: color }}
      resizeMode={"contain"}
      source={{ uri: "https://img.icons8.com/" + name }}
    />
  );
};

const HomeStack = createStackNavigator<HomeParamList>();
const HomeNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <ListingStack.Screen name="AdScreen" component={AdScreen} />
    </HomeStack.Navigator>
  );
};

const ListingStack = createStackNavigator<ListingParamList>();
const ListingNavigator = () => {
  return (
    <ListingStack.Navigator screenOptions={{ headerShown: false }}>
      <ListingStack.Screen name="ListingScreen" component={ListingScreen} />
      <ListingStack.Screen name="AdScreen" component={AdScreen} />
    </ListingStack.Navigator>
  );
};

const ExchangeStack = createStackNavigator<ExchangeParamList>();
const ExchangeNavigator = () => {
  return (
    <ExchangeStack.Navigator screenOptions={{ headerShown: false }}>
      <ExchangeStack.Screen name="ExchangeScreen" component={ExchangeScreen} />
      <ExchangeStack.Screen name="AdScreen" component={AdScreen} />
      <ExchangeStack.Screen name="MessagesScreen" component={MessagesScreen} />
    </ExchangeStack.Navigator>
  );
};

export default BottomTabNavigator;
