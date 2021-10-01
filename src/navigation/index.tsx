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
import Header from "../components/Header";
import AuthScreen from "../screens/AuthScreen";
import useAuth from "../hooks/useAuth";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...tailwindConfig.theme.colors,
  },
};

export default () => {
  const { user } = useAuth();

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
          header: () => <Header></Header>,
        }}
      />
    </Stack.Navigator>
  );
};

const AuthStack = createStackNavigator<AuthStackParamList>();
const AuthNavigator = () => {
  return (
    <AuthStack.Navigator mode="modal">
      <AuthStack.Screen
        name="SignIn"
        component={AuthScreen}
        options={{
          header: () => <Header noMenu></Header>,
        }}
      />
    </AuthStack.Navigator>
  );
};
