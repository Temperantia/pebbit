/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Image } from "react-native";
import { SvgXml } from "react-native-svg";

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

const postAdSvg = `<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 24.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_3" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 278.5 333.9" style="enable-background:new 0 0 278.5 333.9;" xml:space="preserve">
<g>
	<path d="M192.8,0.1c0,0-100.4-0.6-101.8,0.8v27h73v82h87v175c0,0,0,19.5-19.5,19.5H47c0,0-19.7,2-19.7-19.8V88.9H0v198
		c0,0-2,47,47,47h185c0,0,46.5,0,46.5-46.5V85.9L192.8,0.1z M192,80.9v-39c1.1,0,40,39,40,39H192z"/>
	<polygon points="45,109.9 73,109.9 73,69.9 111,69.9 111,44.9 73,44.9 73,7.9 45,7.9 45,44.9 8,44.9 8,71.9 45,71.9 	"/>
	<rect x="83" y="163.9" width="109" height="26"/>
	<rect x="83" y="219.9" width="80" height="26"/>
</g>
</svg>`;
const BottomTab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ showLabel: false }}
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
        }}
      />
      <BottomTab.Screen
        name="Listing"
        component={ListingNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="windows/48/000000/list.png" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="CreateAd"
        component={CreateAdScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <SvgXml width={30} height={30} xml={postAdSvg} fill={color} />
          ),
        }}
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
        }}
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
