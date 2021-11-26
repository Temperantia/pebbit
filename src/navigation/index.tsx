/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import React from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { AuthStackParamList, RootStackParamList } from "../types";
import BottomTabNavigator from "./BottomTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";
import tailwindConfig from "../../tailwind.config";
import Header from "../components/core/Header";
import AuthScreen from "../screens/AuthScreen";
import useAuth from "../hooks/useAuth";
import OnboardingScreen from "../screens/OnboardingScreen";
import { ActivityIndicator } from "react-native";
import SettingsScreen from "../screens/SettingsScreen";
import ProfileScreen from "../screens/ProfileScreen";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...tailwindConfig.theme.colors,
    primary: tailwindConfig.theme.colors["red-main"],
    card: tailwindConfig.theme.colors["black-background-2"],
    text: tailwindConfig.theme.colors["grey-slate"],
  },
};

export default () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <ActivityIndicator color={tailwindConfig.theme.colors["red-main"]} />
    );
  }

  return (
    <NavigationContainer theme={theme} linking={LinkingConfiguration}>
      {user ? <RootNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

const Stack = createStackNavigator<RootStackParamList>();
const RootNavigator = () => {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{
          header: () => <Header />,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          header: () => <Header />,
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          header: () => <Header />,
        }}
      />
    </Stack.Navigator>
  );
};

const AuthStack = createStackNavigator<AuthStackParamList>();
const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      mode="modal"
      screenOptions={{
        header: () => <Header noMenu></Header>,
      }}
    >
      <AuthStack.Screen name="SignIn" component={AuthScreen} />
      <AuthStack.Screen name="Onboarding" component={OnboardingScreen} />
    </AuthStack.Navigator>
  );
};
