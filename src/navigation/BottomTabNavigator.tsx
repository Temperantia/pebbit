/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Image } from "react-native";

import HomeScreen from "../screens/HomeScreen";
import CreateAdScreen from "../screens/CreateAdScreen";
import { BottomTabParamList, CreateAdParamList, HomeParamList } from "../types";
import ListingScreen from "../screens/ListingScreen";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ showLabel: false, style: { paddingTop: 20 } }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
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
        component={ListingScreen}
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
            <TabBarIcon name="windows/48/000000/list.png" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon({ name, color }: { name: string; color: string }) {
  return (
    <Image
      style={{ width: 48, height: 48, tintColor: color }}
      resizeMode={"contain"}
      source={{ uri: "https://img.icons8.com/" + name }}
    ></Image>
  );
}

const HomeStack = createStackNavigator<HomeParamList>();

function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
    </HomeStack.Navigator>
  );
}

const CreateAdStack = createStackNavigator<CreateAdParamList>();

function CreateAdNavigator() {
  return (
    <CreateAdStack.Navigator>
      <CreateAdStack.Screen name="CreateAdScreen" component={CreateAdScreen} />
    </CreateAdStack.Navigator>
  );
}
